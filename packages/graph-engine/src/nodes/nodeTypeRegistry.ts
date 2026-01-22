/**
 * Node Type Registry
 *
 * Central registry for node type metadata. Provides O(1) lookups
 * and prevents duplicate registrations.
 */

import { NodeType, NodeTypeDefinition, NodeCategory } from './types';

/**
 * Registry class for managing node type definitions
 *
 * Provides methods to register, retrieve, and query node types.
 * Used by the factory to validate node creation and by the UI
 * to display node palettes.
 */
export class NodeTypeRegistry {
  private registry: Map<NodeType, NodeTypeDefinition>;

  constructor() {
    this.registry = new Map();
  }

  /**
   * Registers a new node type definition
   *
   * @param definition - The node type definition to register
   * @throws Error if the type is already registered
   */
  register(definition: NodeTypeDefinition): void {
    if (this.registry.has(definition.type)) {
      throw new Error(`Node type "${definition.type}" is already registered`);
    }
    this.registry.set(definition.type, definition);
  }

  /**
   * Retrieves a node type definition by type
   *
   * @param type - The node type to retrieve
   * @returns The node type definition, or undefined if not found
   */
  get(type: NodeType): NodeTypeDefinition | undefined {
    return this.registry.get(type);
  }

  /**
   * Checks if a node type is registered
   *
   * @param type - The node type to check
   * @returns true if the type is registered, false otherwise
   */
  has(type: NodeType): boolean {
    return this.registry.has(type);
  }

  /**
   * Returns all registered node type definitions
   *
   * @returns Array of all registered node type definitions
   */
  getAll(): NodeTypeDefinition[] {
    return Array.from(this.registry.values());
  }

  /**
   * Returns all node type definitions in a specific category
   *
   * @param category - The category to filter by
   * @returns Array of node type definitions in the specified category
   */
  getByCategory(category: NodeCategory): NodeTypeDefinition[] {
    return this.getAll().filter((def) => def.category === category);
  }

  /**
   * Clears all registered node types
   * Useful for testing
   */
  clear(): void {
    this.registry.clear();
  }
}

/**
 * Singleton instance of the node type registry
 * Used throughout the application
 */
export const nodeTypeRegistry = new NodeTypeRegistry();
