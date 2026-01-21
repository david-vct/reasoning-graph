import { Graph, GraphNode } from '../../src/validation';

export interface MockGraphOptions {
  hasCycle?: boolean;
  invalidConnection?: boolean;
}

/**
 * Creates a mock graph for testing purposes
 */
export function createMockGraph(options: MockGraphOptions = {}): Graph {
  if (options.hasCycle) {
    // Create a graph with a cycle: A -> B -> C -> A
    return {
      nodes: [
        { id: 'A', type: 'axiom', connections: ['B'] },
        { id: 'B', type: 'proposition', connections: ['C'] },
        { id: 'C', type: 'proposition', connections: ['A'] },
      ],
    };
  }

  if (options.invalidConnection) {
    // Create a graph with an invalid connection
    return {
      nodes: [
        { id: 'A', type: 'axiom', connections: ['B', 'INVALID'] },
        { id: 'B', type: 'proposition', connections: [] },
      ],
    };
  }

  // Default: valid DAG
  return {
    nodes: [
      { id: 'A', type: 'axiom', connections: ['B', 'C'] },
      { id: 'B', type: 'proposition', connections: ['D'] },
      { id: 'C', type: 'proposition', connections: ['D'] },
      { id: 'D', type: 'conclusion', connections: [] },
    ],
  };
}
