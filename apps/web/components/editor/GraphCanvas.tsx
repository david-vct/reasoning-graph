'use client';

import { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
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

  // Get theme from user preferences (default to 'light' if not set)
  const theme = session?.user?.preferences?.theme || 'light';

  // Theme-aware grid colors
  const gridColor = theme === 'dark' ? '#1E293B' : '#E2E8F0';

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
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedNodeId, deleteSelectedNode]);

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onPaneContextMenu={onPaneContextMenu}
        nodeTypes={nodeTypes}
        minZoom={0.5}
        maxZoom={2}
        panOnDrag={true}
        zoomOnScroll={true}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        fitView={false}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color={gridColor} />
        <Controls position="bottom-right" />
        {showMiniMap && <MiniMap position="bottom-left" nodeColor="#2563EB" />}
      </ReactFlow>
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
