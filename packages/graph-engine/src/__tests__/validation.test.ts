import { validateDAG } from '../validation';
import { createMockGraph } from '../../__tests__/utils/mockFactory';

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
