import { create } from 'zustand';
import { Node, Edge, NodeChange, EdgeChange, applyNodeChanges, applyEdgeChanges } from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import { NodeType } from '@reasoning-graph/graph-engine';
import { toast } from 'sonner';

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
  updateProposition: (nodeId: string, propositionId: string, newContent: string) => void;
  addPremiseToFreeForm: (nodeId: string) => void;
  removePremiseFromFreeForm: (nodeId: string, propositionId: string) => void;
  addConclusionToFreeForm: (nodeId: string) => void;
  removeConclusionFromFreeForm: (nodeId: string, propositionId: string) => void;
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

  /**
   * Update a proposition's content within a node
   * Breaks connections when content changes
   */
  updateProposition: (nodeId, propositionId, newContent) => {
    const { nodes, edges } = get();
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return;

    // Find affected edges connected to this proposition
    const affectedEdges = edges.filter(
      (edge) =>
        (edge.source === nodeId && edge.sourceHandle?.includes(propositionId)) ||
        (edge.target === nodeId && edge.targetHandle?.includes(propositionId))
    );

    // Update node data based on its structure
    const updatedData = { ...node.data };

    // Helper function to update proposition in nested structure
    const updateInObject = (obj: Record<string, unknown>): boolean => {
      for (const key in obj) {
        if (
          obj[key] &&
          typeof obj[key] === 'object' &&
          'id' in obj[key] &&
          (obj[key] as { id: string }).id === propositionId
        ) {
          obj[key] = { ...(obj[key] as object), content: newContent };
          return true;
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          if (updateInObject(obj[key] as Record<string, unknown>)) return true;
        }
      }
      return false;
    };

    updateInObject(updatedData);

    // Update node
    set({
      nodes: nodes.map((n) => (n.id === nodeId ? { ...n, data: updatedData } : n)),
      edges: affectedEdges.length > 0 ? edges.filter((e) => !affectedEdges.includes(e)) : edges,
    });

    // Show notification if connections were removed
    if (affectedEdges.length > 0) {
      toast.info(`${affectedEdges.length} connection(s) removed due to proposition change`, {
        duration: 3000,
      });
    }
  },

  /**
   * Add a premise to a FreeForm node
   */
  addPremiseToFreeForm: (nodeId) => {
    const { nodes } = get();
    const node = nodes.find((n) => n.id === nodeId);
    if (!node || node.type !== NodeType.FreeForm) return;

    const premises = node.data.premises || [];
    if (premises.length >= 5) {
      toast.error('Maximum 5 premises allowed for FreeForm nodes');
      return;
    }

    const newPremise = {
      id: uuidv4(),
      content: '',
    };

    set({
      nodes: nodes.map((n) =>
        n.id === nodeId ? { ...n, data: { ...n.data, premises: [...premises, newPremise] } } : n
      ),
    });
  },

  /**
   * Remove a premise from a FreeForm node
   */
  removePremiseFromFreeForm: (nodeId, propositionId) => {
    const { nodes, edges } = get();
    const node = nodes.find((n) => n.id === nodeId);
    if (!node || node.type !== NodeType.FreeForm) return;

    const premises = node.data.premises || [];
    const updatedPremises = premises.filter((p: { id: string }) => p.id !== propositionId);

    // Find affected edges
    const affectedEdges = edges.filter(
      (edge) =>
        (edge.source === nodeId && edge.sourceHandle?.includes(propositionId)) ||
        (edge.target === nodeId && edge.targetHandle?.includes(propositionId))
    );

    set({
      nodes: nodes.map((n) =>
        n.id === nodeId ? { ...n, data: { ...n.data, premises: updatedPremises } } : n
      ),
      edges: affectedEdges.length > 0 ? edges.filter((e) => !affectedEdges.includes(e)) : edges,
    });

    if (affectedEdges.length > 0) {
      toast.info('Connections removed from deleted premise');
    }
  },

  /**
   * Add a conclusion to a FreeForm node
   */
  addConclusionToFreeForm: (nodeId) => {
    const { nodes } = get();
    const node = nodes.find((n) => n.id === nodeId);
    if (!node || node.type !== NodeType.FreeForm) return;

    const conclusions = node.data.conclusions || [];
    if (conclusions.length >= 3) {
      toast.error('Maximum 3 conclusions allowed for FreeForm nodes');
      return;
    }

    const newConclusion = {
      id: uuidv4(),
      content: '',
    };

    set({
      nodes: nodes.map((n) =>
        n.id === nodeId
          ? { ...n, data: { ...n.data, conclusions: [...conclusions, newConclusion] } }
          : n
      ),
    });
  },

  /**
   * Remove a conclusion from a FreeForm node
   */
  removeConclusionFromFreeForm: (nodeId, propositionId) => {
    const { nodes, edges } = get();
    const node = nodes.find((n) => n.id === nodeId);
    if (!node || node.type !== NodeType.FreeForm) return;

    const conclusions = node.data.conclusions || [];
    if (conclusions.length <= 1) {
      toast.error('FreeForm nodes must have at least 1 conclusion');
      return;
    }

    const updatedConclusions = conclusions.filter((c: { id: string }) => c.id !== propositionId);

    // Find affected edges
    const affectedEdges = edges.filter(
      (edge) =>
        (edge.source === nodeId && edge.sourceHandle?.includes(propositionId)) ||
        (edge.target === nodeId && edge.targetHandle?.includes(propositionId))
    );

    set({
      nodes: nodes.map((n) =>
        n.id === nodeId ? { ...n, data: { ...n.data, conclusions: updatedConclusions } } : n
      ),
      edges: affectedEdges.length > 0 ? edges.filter((e) => !affectedEdges.includes(e)) : edges,
    });

    if (affectedEdges.length > 0) {
      toast.info('Connections removed from deleted conclusion');
    }
  },
}));
