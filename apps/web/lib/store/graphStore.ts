import { create } from 'zustand';
import { Node, Edge, NodeChange, EdgeChange, applyNodeChanges, applyEdgeChanges } from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import { NodeType } from '@reasoning-graph/graph-engine';

interface GraphStore {
  nodes: Node[];
  edges: Edge[];
  selectedNodeId: string | null;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  addNode: (position: { x: number; y: number }) => void;
  addTypedNode: (type: NodeType, position: { x: number; y: number }) => void;
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

  addTypedNode: (type, position) => {
    const nodeId = uuidv4();

    // Create node data based on type
    let nodeData: Record<string, unknown>;

    switch (type) {
      case NodeType.Axiom:
        nodeData = {
          conclusion: {
            id: uuidv4(),
            content: '',
          },
          validationState: {
            isValid: true,
            status: 'neutral' as const,
            errors: [],
          },
        };
        break;

      case NodeType.SimpleAffirmation:
        nodeData = {
          premise: {
            id: uuidv4(),
            content: '',
          },
          conclusion: {
            id: uuidv4(),
            content: '',
          },
          validationState: {
            isValid: true,
            status: 'neutral' as const,
            errors: [],
          },
        };
        break;

      case NodeType.ModusPonens:
        nodeData = {
          premises: {
            implication: {
              id: uuidv4(),
              content: '',
            },
            affirmation: {
              id: uuidv4(),
              content: '',
            },
          },
          conclusion: {
            id: uuidv4(),
            content: '',
          },
          validationState: {
            isValid: true,
            status: 'neutral' as const,
            errors: [],
          },
        };
        break;

      case NodeType.ModusTollens:
        nodeData = {
          premises: {
            implication: {
              id: uuidv4(),
              content: '',
            },
            negation: {
              id: uuidv4(),
              content: '',
            },
          },
          conclusion: {
            id: uuidv4(),
            content: '',
          },
          validationState: {
            isValid: true,
            status: 'neutral' as const,
            errors: [],
          },
        };
        break;

      case NodeType.Syllogism:
        nodeData = {
          premises: {
            major: {
              id: uuidv4(),
              content: '',
            },
            minor: {
              id: uuidv4(),
              content: '',
            },
          },
          conclusion: {
            id: uuidv4(),
            content: '',
          },
          validationState: {
            isValid: true,
            status: 'neutral' as const,
            errors: [],
          },
        };
        break;

      case NodeType.Disjunction:
        nodeData = {
          premises: {
            disjunction: {
              id: uuidv4(),
              content: '',
            },
            negation: {
              id: uuidv4(),
              content: '',
            },
          },
          conclusion: {
            id: uuidv4(),
            content: '',
          },
          validationState: {
            isValid: true,
            status: 'neutral' as const,
            errors: [],
          },
        };
        break;

      case NodeType.ReductioAdAbsurdum:
        nodeData = {
          premise: {
            id: uuidv4(),
            content: '',
          },
          conclusion: {
            id: uuidv4(),
            content: '',
          },
          validationState: {
            isValid: true,
            status: 'neutral' as const,
            errors: [],
          },
        };
        break;

      case NodeType.Induction:
        nodeData = {
          premises: {
            baseCase: {
              id: uuidv4(),
              content: '',
            },
            inductiveStep: {
              id: uuidv4(),
              content: '',
            },
          },
          conclusion: {
            id: uuidv4(),
            content: '',
          },
          validationState: {
            isValid: true,
            status: 'neutral' as const,
            errors: [],
          },
        };
        break;

      case NodeType.FreeForm:
        nodeData = {
          premises: [],
          conclusions: [
            {
              id: uuidv4(),
              content: '',
            },
          ],
          validationState: {
            isValid: true,
            status: 'neutral' as const,
            errors: [],
          },
        };
        break;

      default:
        // Fallback generic structure
        nodeData = {
          conclusion: {
            id: uuidv4(),
            content: '',
          },
          validationState: {
            isValid: true,
            status: 'neutral' as const,
            errors: [],
          },
        };
    }

    const reactFlowNode: Node = {
      id: nodeId,
      type: type,
      position,
      data: nodeData,
    };

    set({
      nodes: [...get().nodes, reactFlowNode],
      selectedNodeId: nodeId,
    });
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
