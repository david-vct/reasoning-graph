/**
 * Tests for NodeTypeRegistry
 */

import { NodeTypeRegistry, nodeTypeRegistry } from '../nodeTypeRegistry';
import { NodeType, NodeTypeDefinition } from '../types';

describe('NodeTypeRegistry', () => {
  let registry: NodeTypeRegistry;

  const mockDefinition: NodeTypeDefinition = {
    type: NodeType.ModusPonens,
    label: 'Modus Ponens',
    description: 'If P→Q and P, then Q',
    inputCount: 2,
    outputCount: 1,
    category: 'inference',
  };

  const anotherDefinition: NodeTypeDefinition = {
    type: NodeType.Axiom,
    label: 'Axiom',
    description: 'A foundational truth',
    inputCount: 0,
    outputCount: 1,
    category: 'foundational',
  };

  beforeEach(() => {
    registry = new NodeTypeRegistry();
  });

  describe('register()', () => {
    it('should register a new node type definition', () => {
      registry.register(mockDefinition);
      expect(registry.has(NodeType.ModusPonens)).toBe(true);
    });

    it('should throw error when registering duplicate type', () => {
      registry.register(mockDefinition);

      expect(() => registry.register(mockDefinition)).toThrow(
        'Node type "modus-ponens" is already registered'
      );
    });

    it('should allow registering multiple different types', () => {
      registry.register(mockDefinition);
      registry.register(anotherDefinition);

      expect(registry.has(NodeType.ModusPonens)).toBe(true);
      expect(registry.has(NodeType.Axiom)).toBe(true);
    });
  });

  describe('get()', () => {
    it('should retrieve a registered node type definition', () => {
      registry.register(mockDefinition);
      const retrieved = registry.get(NodeType.ModusPonens);

      expect(retrieved).toEqual(mockDefinition);
    });

    it('should return undefined for unregistered type', () => {
      const retrieved = registry.get(NodeType.ModusPonens);
      expect(retrieved).toBeUndefined();
    });
  });

  describe('has()', () => {
    it('should return true for registered type', () => {
      registry.register(mockDefinition);
      expect(registry.has(NodeType.ModusPonens)).toBe(true);
    });

    it('should return false for unregistered type', () => {
      expect(registry.has(NodeType.ModusPonens)).toBe(false);
    });
  });

  describe('getAll()', () => {
    it('should return empty array when no types registered', () => {
      const all = registry.getAll();
      expect(all).toEqual([]);
    });

    it('should return all registered definitions', () => {
      registry.register(mockDefinition);
      registry.register(anotherDefinition);

      const all = registry.getAll();
      expect(all).toHaveLength(2);
      expect(all).toContainEqual(mockDefinition);
      expect(all).toContainEqual(anotherDefinition);
    });
  });

  describe('getByCategory()', () => {
    const inferenceDefinition: NodeTypeDefinition = {
      type: NodeType.Syllogism,
      label: 'Syllogism',
      description: 'A→B, B→C, therefore A→C',
      inputCount: 2,
      outputCount: 1,
      category: 'inference',
    };

    it('should return empty array when no types in category', () => {
      registry.register(mockDefinition);
      const foundational = registry.getByCategory('foundational');
      expect(foundational).toEqual([]);
    });

    it('should return all types in specified category', () => {
      registry.register(mockDefinition);
      registry.register(inferenceDefinition);
      registry.register(anotherDefinition);

      const inference = registry.getByCategory('inference');
      expect(inference).toHaveLength(2);
      expect(inference).toContainEqual(mockDefinition);
      expect(inference).toContainEqual(inferenceDefinition);
    });

    it('should not return types from other categories', () => {
      registry.register(mockDefinition);
      registry.register(anotherDefinition);

      const foundational = registry.getByCategory('foundational');
      expect(foundational).toHaveLength(1);
      expect(foundational[0]).toEqual(anotherDefinition);
    });
  });

  describe('clear()', () => {
    it('should remove all registered types', () => {
      registry.register(mockDefinition);
      registry.register(anotherDefinition);

      expect(registry.getAll()).toHaveLength(2);

      registry.clear();

      expect(registry.getAll()).toHaveLength(0);
      expect(registry.has(NodeType.ModusPonens)).toBe(false);
      expect(registry.has(NodeType.Axiom)).toBe(false);
    });

    it('should allow re-registering after clear', () => {
      registry.register(mockDefinition);
      registry.clear();

      expect(() => registry.register(mockDefinition)).not.toThrow();
      expect(registry.has(NodeType.ModusPonens)).toBe(true);
    });
  });

  describe('Singleton instance', () => {
    beforeEach(() => {
      // Clear singleton between tests
      nodeTypeRegistry.clear();
    });

    it('should export a singleton instance', () => {
      expect(nodeTypeRegistry).toBeInstanceOf(NodeTypeRegistry);
    });

    it('should maintain state across imports', () => {
      nodeTypeRegistry.register(mockDefinition);

      // In a real scenario, this would be imported elsewhere
      expect(nodeTypeRegistry.has(NodeType.ModusPonens)).toBe(true);
    });
  });
});
