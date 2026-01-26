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

// Register all node types
nodeTypeRegistry.register({
  type: NodeType.Axiom,
  label: 'Axiom',
  description: 'Foundational truth requiring no premises',
  inputCount: 0,
  outputCount: 1,
  category: 'foundational',
  icon: '🔸',
  notation: 'Hypothesis',
});

nodeTypeRegistry.register({
  type: NodeType.ModusPonens,
  label: 'Modus Ponens',
  description: 'Given P→Q and P, conclude Q',
  inputCount: 2,
  outputCount: 1,
  category: 'inference',
  icon: '🔹',
  notation: 'P→Q, P ⊢ Q',
});

nodeTypeRegistry.register({
  type: NodeType.ModusTollens,
  label: 'Modus Tollens',
  description: 'Given P→Q and ¬Q, conclude ¬P',
  inputCount: 2,
  outputCount: 1,
  category: 'inference',
  icon: '🔹',
  notation: 'P→Q, ¬Q ⊢ ¬P',
});

nodeTypeRegistry.register({
  type: NodeType.SimpleAffirmation,
  label: 'Simple Affirmation',
  description: 'Direct pass-through of a premise to a conclusion',
  inputCount: 1,
  outputCount: 1,
  category: 'foundational',
  icon: '⊢',
  notation: 'P ⊢ P',
});

nodeTypeRegistry.register({
  type: NodeType.Syllogism,
  label: 'Syllogism',
  description: 'Classic syllogistic reasoning with major and minor premises',
  inputCount: 2,
  outputCount: 1,
  category: 'inference',
  icon: '🔹',
  notation: 'A→B, B→C ⊢ A→C',
});

nodeTypeRegistry.register({
  type: NodeType.Disjunction,
  label: 'Disjunctive Syllogism',
  description: 'Given P∨Q and ¬P, conclude Q',
  inputCount: 2,
  outputCount: 1,
  category: 'inference',
  icon: '🔹',
  notation: 'P∨Q, ¬P ⊢ Q',
});

nodeTypeRegistry.register({
  type: NodeType.ReductioAdAbsurdum,
  label: 'Reductio Ad Absurdum',
  description: 'Proof by contradiction: If P leads to absurdity, then ¬P',
  inputCount: 1,
  outputCount: 1,
  category: 'advanced',
  icon: '🔺',
  notation: 'P→⊥ ⊢ ¬P',
});

nodeTypeRegistry.register({
  type: NodeType.Induction,
  label: 'Mathematical Induction',
  description: 'Prove base case and inductive step for all natural numbers',
  inputCount: 2,
  outputCount: 1,
  category: 'advanced',
  icon: '♾️',
  notation: 'P(0), P(n)→P(n+1) ⊢ ∀n P(n)',
});

nodeTypeRegistry.register({
  type: NodeType.FreeForm,
  label: 'Free Form',
  description: 'Flexible node with dynamic premises (0-5) and conclusions (1-3)',
  inputCount: -1, // Dynamic
  outputCount: -1, // Dynamic
  category: 'special',
  icon: '📝',
  notation: 'Custom Logic',
});
