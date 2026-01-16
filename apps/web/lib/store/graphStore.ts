import { create } from 'zustand';
import { Node, Edge, NodeChange, EdgeChange, applyNodeChanges, applyEdgeChanges } from 'reactflow';
import { v4 as uuidv4 } from 'uuid';

interface GraphStore {
  nodes: Node[];
  edges: Edge[];
  selectedNodeId: string | null;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  addNode: (position: { x: number; y: number }) => void;
  updateNodeData: (nodeId: string, data: Record<string, unknown>) => void;
  deleteSelectedNode: () => void;
  setSelectedNode: (nodeId: string | null) => void;
}

export const useGraphStore = create<GraphStore>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  addNode: (position) => {
    const newNode: Node = {
      id: uuidv4(),
      type: 'simpleNode',
      position,
      data: { text: '' },
    };
    set({ nodes: [...get().nodes, newNode] });
  },

  updateNodeData: (nodeId, data) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
      ),
    });
  },

  deleteSelectedNode: () => {
    const { selectedNodeId, nodes, edges } = get();
    if (selectedNodeId) {
      set({
        nodes: nodes.filter((node) => node.id !== selectedNodeId),
        edges: edges.filter(
          (edge) => edge.source !== selectedNodeId && edge.target !== selectedNodeId
        ),
        selectedNodeId: null,
      });
    }
  },

  setSelectedNode: (nodeId) => {
    set({ selectedNodeId: nodeId });
  },
}));
