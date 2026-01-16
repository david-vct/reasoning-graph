'use client';

import { useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useSession } from 'next-auth/react';

export default function GraphCanvas() {
  const [nodes, , onNodesChange] = useNodesState([]);
  const [edges, , onEdgesChange] = useEdgesState([]);
  const [showMiniMap] = useState(true);
  const { data: session } = useSession();

  // Get theme from user preferences (default to 'light' if not set)
  const theme = session?.user?.preferences?.theme || 'light';

  // Theme-aware grid colors
  const gridColor = theme === 'dark' ? '#1E293B' : '#E2E8F0';

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
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
    </div>
  );
}
