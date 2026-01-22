/**
 * Tests for createNode factory function
 */

import { createNode } from '../factory';
import { NodeType } from '../types';
import { nodeTypeRegistry } from '../nodeTypeRegistry';
import { LogicNode } from '../LogicNode';

describe('createNode', () => {
  const validUuid = '550e8400-e29b-41d4-a716-446655440000';

  beforeEach(() => {
    // Clear and register test types
    nodeTypeRegistry.clear();

    nodeTypeRegistry.register({
      type: NodeType.Axiom,
      label: 'Axiom',
      description: 'A foundational truth',
      inputCount: 0,
      outputCount: 1,
      category: 'foundational',
    });

    nodeTypeRegistry.register({
      type: NodeType.ModusPonens,
      label: 'Modus Ponens',
      description: 'If P→Q and P, then Q',
      inputCount: 2,
      outputCount: 1,
      category: 'inference',
    });
  });

  afterEach(() => {
    nodeTypeRegistry.clear();
  });

  describe('Basic node creation', () => {
    it('should create a node with auto-generated UUID', () => {
      const node = createNode(NodeType.Axiom, {
        position: { x: 100, y: 200 },
      });

      expect(node).toBeInstanceOf(LogicNode);
      expect(node.id).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      );
      expect(node.type).toBe(NodeType.Axiom);
      expect(node.position).toEqual({ x: 100, y: 200 });
    });

    it('should create a node with custom UUID', () => {
      const node = createNode(NodeType.Axiom, {
        id: validUuid,
        position: { x: 100, y: 200 },
      } as any);

      expect(node.id).toBe(validUuid);
    });

    it('should create a node with default position if not provided', () => {
      const node = createNode(NodeType.Axiom, {});

      expect(node.position).toEqual({ x: 0, y: 0 });
    });

    it('should create a node with empty arrays for premises and conclusions by default', () => {
      const node = createNode(NodeType.Axiom, {
        position: { x: 0, y: 0 },
      });

      expect(node.premises).toEqual([]);
      expect(node.conclusions).toEqual([]);
    });

    it('should create a node with provided premises and conclusions', () => {
      const premise1 = '550e8400-e29b-41d4-a716-446655440001';
      const premise2 = '550e8400-e29b-41d4-a716-446655440002';
      const conclusion = '550e8400-e29b-41d4-a716-446655440003';

      const node = createNode(NodeType.ModusPonens, {
        position: { x: 0, y: 0 },
        premises: [premise1, premise2],
        conclusions: [conclusion],
      });

      expect(node.premises).toEqual([premise1, premise2]);
      expect(node.conclusions).toEqual([conclusion]);
    });

    it('should create a node with annotation', () => {
      const node = createNode(NodeType.Axiom, {
        position: { x: 0, y: 0 },
        annotation: 'Test annotation',
      });

      expect(node.annotation).toBe('Test annotation');
    });

    it('should initialize validationState to invalid by default', () => {
      const node = createNode(NodeType.Axiom, {
        position: { x: 0, y: 0 },
      });

      expect(node.validationState).toEqual({
        isValid: false,
        errors: [],
        affectedDescendants: [],
      });
    });
  });

  describe('Error handling', () => {
    it('should throw error for unregistered node type', () => {
      expect(() =>
        createNode(NodeType.Syllogism, {
          position: { x: 0, y: 0 },
        })
      ).toThrow('Node type "syllogism" is not registered');
    });

    it('should throw error for invalid UUID format in premises', () => {
      expect(() =>
        createNode(NodeType.Axiom, {
          position: { x: 0, y: 0 },
          premises: ['invalid-uuid'],
        })
      ).toThrow('Node validation failed');
    });

    it('should throw error for invalid UUID format in conclusions', () => {
      expect(() =>
        createNode(NodeType.Axiom, {
          position: { x: 0, y: 0 },
          conclusions: ['not-a-uuid'],
        })
      ).toThrow('Node validation failed');
    });

    it('should throw error for invalid position (non-numeric)', () => {
      expect(() =>
        createNode(NodeType.Axiom, {
          position: { x: 'invalid' as any, y: 0 },
        })
      ).toThrow('Node validation failed');
    });
  });

  describe('Node type specific creation', () => {
    beforeEach(() => {
      // Register all node types for comprehensive testing
      nodeTypeRegistry.register({
        type: NodeType.ModusTollens,
        label: 'Modus Tollens',
        description: 'If P→Q and ¬Q, then ¬P',
        inputCount: 2,
        outputCount: 1,
        category: 'inference',
      });

      nodeTypeRegistry.register({
        type: NodeType.Syllogism,
        label: 'Syllogism',
        description: 'A→B, B→C, therefore A→C',
        inputCount: 2,
        outputCount: 1,
        category: 'inference',
      });

      nodeTypeRegistry.register({
        type: NodeType.Disjunction,
        label: 'Disjunction',
        description: 'A, therefore A∨B',
        inputCount: 1,
        outputCount: 1,
        category: 'inference',
      });

      nodeTypeRegistry.register({
        type: NodeType.ReductioAdAbsurdum,
        label: 'Reductio Ad Absurdum',
        description: 'Proof by contradiction',
        inputCount: 2,
        outputCount: 1,
        category: 'advanced',
      });

      nodeTypeRegistry.register({
        type: NodeType.Induction,
        label: 'Induction',
        description: 'Mathematical induction',
        inputCount: 2,
        outputCount: 1,
        category: 'advanced',
      });

      nodeTypeRegistry.register({
        type: NodeType.SimpleAffirmation,
        label: 'Simple Affirmation',
        description: 'Direct affirmation',
        inputCount: 1,
        outputCount: 1,
        category: 'foundational',
      });

      nodeTypeRegistry.register({
        type: NodeType.FreeForm,
        label: 'Free Form',
        description: 'Custom logic node',
        inputCount: -1,
        outputCount: -1,
        category: 'special',
      });
    });

    it('should create Axiom node with correct input/output counts', () => {
      const node = createNode(NodeType.Axiom, {
        position: { x: 0, y: 0 },
      });

      expect(node.getInputCount()).toBe(0);
      expect(node.getOutputCount()).toBe(1);
    });

    it('should create Modus Ponens node with correct input/output counts', () => {
      const node = createNode(NodeType.ModusPonens, {
        position: { x: 0, y: 0 },
      });

      expect(node.getInputCount()).toBe(2);
      expect(node.getOutputCount()).toBe(1);
    });

    it('should create Modus Tollens node with correct input/output counts', () => {
      const node = createNode(NodeType.ModusTollens, {
        position: { x: 0, y: 0 },
      });

      expect(node.getInputCount()).toBe(2);
      expect(node.getOutputCount()).toBe(1);
    });

    it('should create Syllogism node with correct input/output counts', () => {
      const node = createNode(NodeType.Syllogism, {
        position: { x: 0, y: 0 },
      });

      expect(node.getInputCount()).toBe(2);
      expect(node.getOutputCount()).toBe(1);
    });

    it('should create Disjunction node with correct input/output counts', () => {
      const node = createNode(NodeType.Disjunction, {
        position: { x: 0, y: 0 },
      });

      expect(node.getInputCount()).toBe(1);
      expect(node.getOutputCount()).toBe(1);
    });

    it('should create Reductio Ad Absurdum node with correct input/output counts', () => {
      const node = createNode(NodeType.ReductioAdAbsurdum, {
        position: { x: 0, y: 0 },
      });

      expect(node.getInputCount()).toBe(2);
      expect(node.getOutputCount()).toBe(1);
    });

    it('should create Induction node with correct input/output counts', () => {
      const node = createNode(NodeType.Induction, {
        position: { x: 0, y: 0 },
      });

      expect(node.getInputCount()).toBe(2);
      expect(node.getOutputCount()).toBe(1);
    });

    it('should create Simple Affirmation node with correct input/output counts', () => {
      const node = createNode(NodeType.SimpleAffirmation, {
        position: { x: 0, y: 0 },
      });

      expect(node.getInputCount()).toBe(1);
      expect(node.getOutputCount()).toBe(1);
    });

    it('should create Free Form node with variable input/output counts', () => {
      const node = createNode(NodeType.FreeForm, {
        position: { x: 0, y: 0 },
        premises: ['550e8400-e29b-41d4-a716-446655440001'],
        conclusions: [
          '550e8400-e29b-41d4-a716-446655440002',
          '550e8400-e29b-41d4-a716-446655440003',
        ],
      });

      expect(node.getInputCount()).toBe(-1);
      expect(node.getOutputCount()).toBe(-1);
      // Free form nodes should always validate successfully
      expect(node.validate()).toBe(true);
    });
  });

  describe('Validation integration', () => {
    it('should create a node that validates successfully when counts match', () => {
      const node = createNode(NodeType.Axiom, {
        position: { x: 0, y: 0 },
        conclusions: ['550e8400-e29b-41d4-a716-446655440001'],
      });

      expect(node.validate()).toBe(true);
      expect(node.validationState.isValid).toBe(true);
    });

    it('should create a node that fails validation when counts mismatch', () => {
      const node = createNode(NodeType.Axiom, {
        position: { x: 0, y: 0 },
        conclusions: [], // Should have 1
      });

      expect(node.validate()).toBe(false);
      expect(node.validationState.isValid).toBe(false);
      expect(node.validationState.errors.length).toBeGreaterThan(0);
    });
  });

  describe('Type safety', () => {
    it('should return LogicNode instance', () => {
      const node = createNode(NodeType.Axiom, {
        position: { x: 0, y: 0 },
      });

      expect(node).toBeInstanceOf(LogicNode);
      expect(typeof node.validate).toBe('function');
      expect(typeof node.getInputCount).toBe('function');
      expect(typeof node.getOutputCount).toBe('function');
    });

    it('should have correct type property', () => {
      const axiomNode = createNode(NodeType.Axiom, { position: { x: 0, y: 0 } });
      const mpNode = createNode(NodeType.ModusPonens, { position: { x: 0, y: 0 } });

      expect(axiomNode.type).toBe(NodeType.Axiom);
      expect(mpNode.type).toBe(NodeType.ModusPonens);
    });
  });
});
