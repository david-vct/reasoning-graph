'use client';

import { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  Background,
  Connection,
  ConnectionMode,
  Controls,
  MiniMap,
  BackgroundVariant,
  OnConnectStart,
  OnConnectStartParams,
  useReactFlow,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useSession } from 'next-auth/react';
import { useGraphStore } from '@/lib/store/graphStore';
import { NodeType } from '@reasoning-graph/graph-engine';
import nodeTypes from '@/lib/nodeTypes';
import NodeTypeMenu from '@/components/canvas/NodeTypeMenu';

function GraphCanvasInner() {
  const [showMiniMap] = useState(true);
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
  const { data: session } = useSession();
  const { screenToFlowPosition } = useReactFlow();

  const nodes = useGraphStore((state) => state.nodes);
  const edges = useGraphStore((state) => state.edges);
  const onNodesChange = useGraphStore((state) => state.onNodesChange);
  const onEdgesChange = useGraphStore((state) => state.onEdgesChange);
  const addTypedNode = useGraphStore((state) => state.addTypedNode);
  const deleteSelectedNode = useGraphStore((state) => state.deleteSelectedNode);
  const selectedNodeId = useGraphStore((state) => state.selectedNodeId);
  const connectionMode = useGraphStore((state) => state.connectionMode);
  const isConnecting = useGraphStore((state) => state.isConnecting);
  const setConnectionMode = useGraphStore((state) => state.setConnectionMode);
  const startConnection = useGraphStore((state) => state.startConnection);
  const cancelConnection = useGraphStore((state) => state.cancelConnection);
  const completeConnection = useGraphStore((state) => state.completeConnection);

  // Get theme from user preferences (default to 'light' if not set)
  const theme = session?.user?.preferences?.theme || 'light';

  // Theme-aware grid colors
  const gridColor = theme === 'dark' ? '#1E293B' : '#E2E8F0';

  useEffect(() => {
    if (session?.user?.preferences?.connectionMode) {
      setConnectionMode(session.user.preferences.connectionMode);
    }
  }, [session?.user?.preferences?.connectionMode, setConnectionMode]);

  const onPaneContextMenu = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    setMenu({ x: event.clientX, y: event.clientY });
  }, []);

  const onSelectNodeType = useCallback(
    (type: NodeType) => {
      if (menu) {
        const position = screenToFlowPosition({ x: menu.x, y: menu.y });
        addTypedNode(type, position);
      }
    },
    [menu, screenToFlowPosition, addTypedNode]
  );

  const onCloseMenu = useCallback(() => {
    setMenu(null);
  }, []);

  const isValidConnection = useCallback(
    (connection: Connection) => {
      if (
        !connection.source ||
        !connection.target ||
        !connection.sourceHandle ||
        !connection.targetHandle
      ) {
        return false;
      }

      if (connection.source === connection.target) {
        return false;
      }

      if (!connection.sourceHandle.startsWith('conclusion-')) {
        return false;
      }

      if (!connection.targetHandle.startsWith('premise-')) {
        return false;
      }

      const targetAlreadyConnected = edges.some(
        (edge) => edge.target === connection.target && edge.targetHandle === connection.targetHandle
      );

      return !targetAlreadyConnected;
    },
    [edges]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      if (!isValidConnection(connection)) {
        cancelConnection();
        return;
      }

      completeConnection(connection);
    },
    [isValidConnection, completeConnection, cancelConnection]
  );

  const onConnectStart = useCallback<OnConnectStart>(
    (_event, params: OnConnectStartParams) => {
      if (params.handleType !== 'source' || !params.nodeId || !params.handleId) {
        return;
      }

      startConnection({ nodeId: params.nodeId, handleId: params.handleId });
    },
    [startConnection]
  );

  const onConnectEnd = useCallback(() => {
    if (isConnecting) {
      cancelConnection();
    }
  }, [isConnecting, cancelConnection]);

  // Handle keyboard events for delete
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't delete if user is typing in an input or textarea
      const activeElement = document.activeElement;
      const isTyping =
        activeElement instanceof HTMLInputElement || activeElement instanceof HTMLTextAreaElement;

      if ((event.key === 'Delete' || event.key === 'Backspace') && selectedNodeId && !isTyping) {
        event.preventDefault();
        deleteSelectedNode();
        return;
      }

      if (event.key === 'Escape') {
        cancelConnection();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedNodeId, deleteSelectedNode, cancelConnection]);

  return (
    <div
      className="w-full h-full relative"
      title={`Active connection mode: ${connectionMode === 'drag-drop' ? 'drag and drop' : 'click then click'}`}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        isValidConnection={isValidConnection}
        onPaneContextMenu={onPaneContextMenu}
        nodeTypes={nodeTypes}
        minZoom={0.5}
        maxZoom={2}
        panOnDrag={true}
        zoomOnScroll={true}
        connectionMode={ConnectionMode.Strict}
        connectOnClick={connectionMode === 'click-click'}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        fitView={false}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color={gridColor} />
        <Controls position="bottom-right" />
        {showMiniMap && <MiniMap position="bottom-left" nodeColor="#2563EB" />}
      </ReactFlow>
      <div className="absolute top-3 right-3 px-2 py-1 text-xs rounded-md bg-white/90 border border-slate-200 text-slate-700 pointer-events-none">
        Mode: {connectionMode === 'drag-drop' ? 'Drag & Drop' : 'Click-Click'}
      </div>
      {menu && (
        <NodeTypeMenu x={menu.x} y={menu.y} onSelectType={onSelectNodeType} onClose={onCloseMenu} />
      )}
    </div>
  );
}

export default function GraphCanvas() {
  return (
    <ReactFlowProvider>
      <GraphCanvasInner />
    </ReactFlowProvider>
  );
}
