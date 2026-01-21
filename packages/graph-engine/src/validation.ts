/**
 * DAG Validation Module
 * Provides basic validation for Directed Acyclic Graphs
 */

export interface GraphNode {
  id: string;
  type: string;
  connections: string[];
}

export interface Graph {
  nodes: GraphNode[];
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Validates that a graph is a valid DAG (no cycles)
 */
export function validateDAG(graph: Graph): ValidationResult {
  const errors: string[] = [];

  // Check if graph has nodes
  if (!graph.nodes || graph.nodes.length === 0) {
    return { isValid: true, errors: [] };
  }

  // Build adjacency list
  const adjacencyList = new Map<string, string[]>();
  const nodeIds = new Set(graph.nodes.map((n) => n.id));

  for (const node of graph.nodes) {
    adjacencyList.set(node.id, node.connections || []);

    // Validate connections point to existing nodes
    for (const targetId of node.connections || []) {
      if (!nodeIds.has(targetId)) {
        errors.push(`Node ${node.id} has invalid connection to ${targetId}`);
      }
    }
  }

  // Detect cycles using DFS
  const visited = new Set<string>();
  const recursionStack = new Set<string>();

  function hasCycle(nodeId: string): boolean {
    visited.add(nodeId);
    recursionStack.add(nodeId);

    const neighbors = adjacencyList.get(nodeId) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        if (hasCycle(neighbor)) {
          return true;
        }
      } else if (recursionStack.has(neighbor)) {
        return true;
      }
    }

    recursionStack.delete(nodeId);
    return false;
  }

  for (const node of graph.nodes) {
    if (!visited.has(node.id)) {
      if (hasCycle(node.id)) {
        errors.push('Cycle detected in graph');
        break;
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
