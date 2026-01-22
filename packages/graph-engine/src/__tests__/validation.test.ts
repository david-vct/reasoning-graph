import { validateDAG } from '../validation';

// Mock factory inline for this test
const createMockGraph = (options?: any) => {
  if (options?.hasCycle) {
    // Create a graph with a cycle: A -> B -> C -> A
    return {
      nodes: [
        { id: 'A', type: 'axiom', connections: ['B'] },
        { id: 'B', type: 'modus-ponens', connections: ['C'] },
        { id: 'C', type: 'modus-ponens', connections: ['A'] }, // Creates cycle back to A
      ],
    };
  }

  if (options?.invalidConnection) {
    // Create a graph with an invalid connection (points to non-existent node)
    return {
      nodes: [
        { id: 'A', type: 'axiom', connections: ['B'] },
        { id: 'B', type: 'modus-ponens', connections: ['NonExistent'] }, // Invalid connection
      ],
    };
  }

  // Default: valid empty graph
  return {
    nodes: [],
  };
};

describe('DAG Validation', () => {
  it('should validate a correct DAG without cycles', () => {
    const graph = createMockGraph();
    const result = validateDAG(graph);

    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should detect cycles in graph', () => {
    const graph = createMockGraph({ hasCycle: true });
    const result = validateDAG(graph);

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Cycle detected in graph');
  });

  it('should detect invalid connections', () => {
    const graph = createMockGraph({ invalidConnection: true });
    const result = validateDAG(graph);

    expect(result.isValid).toBe(false);
    expect(result.errors.some((e) => e.includes('invalid connection'))).toBe(true);
  });

  it('should handle empty graph', () => {
    const graph = { nodes: [] };
    const result = validateDAG(graph);

    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should validate single node graph', () => {
    const graph = {
      nodes: [{ id: 'A', type: 'axiom', connections: [] }],
    };
    const result = validateDAG(graph);

    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
});
