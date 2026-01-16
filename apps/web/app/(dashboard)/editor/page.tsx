'use client';

import GraphCanvas from '@/components/editor/GraphCanvas';

export default function EditorPage() {
  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 overflow-hidden">
        <GraphCanvas />
      </main>
    </div>
  );
}
