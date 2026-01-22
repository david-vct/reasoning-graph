/**
 * Tests for LogicNode abstract base class
 */

import { LogicNode } from '../LogicNode';
import { NodeType } from '../types';

// Mock concrete implementation for testing
class MockNode extends LogicNode {
  private inputCount: number;
  private outputCount: number;

  constructor(
    data: {
      id: string;
      type: NodeType;
      position: { x: number; y: number };
      premises?: string[];
      conclusions?: string[];
      annotation?: string;
    },
    inputCount: number,
    outputCount: number
  ) {
    super(data);
    this.inputCount = inputCount;
    this.outputCount = outputCount;
  }

  getInputCount(): number {
    return this.inputCount;
  }

  getOutputCount(): number {
    return this.outputCount;
  }
}

describe('LogicNode', () => {
  const validUuid = '550e8400-e29b-41d4-a716-446655440000';
  const mockData = {
    id: validUuid,
    type: NodeType.Axiom,
    position: { x: 100, y: 200 },
  };

  describe('Constructor', () => {
    it('should initialize all fields correctly', () => {
      const node = new MockNode(mockData, 2, 1);

      expect(node.id).toBe(validUuid);
      expect(node.type).toBe(NodeType.Axiom);
      expect(node.position).toEqual({ x: 100, y: 200 });
      expect(node.premises).toEqual([]);
      expect(node.conclusions).toEqual([]);
      expect(node.annotation).toBeUndefined();
      expect(node.validationState).toEqual({
        isValid: false,
        errors: [],
        affectedDescendants: [],
      });
    });

    it('should handle optional premises and conclusions', () => {
      const nodeData = {
        ...mockData,
        premises: [validUuid],
        conclusions: [validUuid],
      };
      const node = new MockNode(nodeData, 1, 1);

      expect(node.premises).toEqual([validUuid]);
      expect(node.conclusions).toEqual([validUuid]);
    });

    it('should handle optional annotation', () => {
      const nodeData = {
        ...mockData,
        annotation: 'Test annotation',
      };
      const node = new MockNode(nodeData, 0, 1);

      expect(node.annotation).toBe('Test annotation');
    });
  });

  describe('validate()', () => {
    it('should return true when premise and conclusion counts match', () => {
      const premise1 = '550e8400-e29b-41d4-a716-446655440001';
      const premise2 = '550e8400-e29b-41d4-a716-446655440002';
      const conclusion = '550e8400-e29b-41d4-a716-446655440003';

      const nodeData = {
        ...mockData,
        premises: [premise1, premise2],
        conclusions: [conclusion],
      };

      const node = new MockNode(nodeData, 2, 1);
      const isValid = node.validate();

      expect(isValid).toBe(true);
      expect(node.validationState.isValid).toBe(true);
      expect(node.validationState.errors).toEqual([]);
    });

    it('should return false when premise count is incorrect', () => {
      const premise1 = '550e8400-e29b-41d4-a716-446655440001';

      const nodeData = {
        ...mockData,
        premises: [premise1],
        conclusions: [],
      };

      const node = new MockNode(nodeData, 2, 0);
      const isValid = node.validate();

      expect(isValid).toBe(false);
      expect(node.validationState.isValid).toBe(false);
      expect(node.validationState.errors).toContain('Expected 2 premise(s), got 1');
    });

    it('should return false when conclusion count is incorrect', () => {
      const conclusion1 = '550e8400-e29b-41d4-a716-446655440001';
      const conclusion2 = '550e8400-e29b-41d4-a716-446655440002';

      const nodeData = {
        ...mockData,
        premises: [],
        conclusions: [conclusion1, conclusion2],
      };

      const node = new MockNode(nodeData, 0, 1);
      const isValid = node.validate();

      expect(isValid).toBe(false);
      expect(node.validationState.isValid).toBe(false);
      expect(node.validationState.errors).toContain('Expected 1 conclusion(s), got 2');
    });

    it('should return false when both counts are incorrect', () => {
      const premise = '550e8400-e29b-41d4-a716-446655440001';
      const conclusion = '550e8400-e29b-41d4-a716-446655440002';

      const nodeData = {
        ...mockData,
        premises: [premise],
        conclusions: [conclusion],
      };

      const node = new MockNode(nodeData, 2, 2);
      const isValid = node.validate();

      expect(isValid).toBe(false);
      expect(node.validationState.isValid).toBe(false);
      expect(node.validationState.errors).toHaveLength(2);
      expect(node.validationState.errors).toContain('Expected 2 premise(s), got 1');
      expect(node.validationState.errors).toContain('Expected 2 conclusion(s), got 1');
    });

    it('should clear previous errors on re-validation', () => {
      const nodeData = {
        ...mockData,
        premises: [],
        conclusions: [],
      };

      const node = new MockNode(nodeData, 1, 1);

      // First validation should fail
      node.validate();
      expect(node.validationState.errors.length).toBeGreaterThan(0);

      // Add correct data and re-validate
      node.premises.push('550e8400-e29b-41d4-a716-446655440001');
      node.conclusions.push('550e8400-e29b-41d4-a716-446655440002');
      node.validate();

      expect(node.validationState.errors).toEqual([]);
      expect(node.validationState.isValid).toBe(true);
    });
  });

  describe('resetValidation()', () => {
    it('should reset validation state to initial values', () => {
      const nodeData = {
        ...mockData,
        premises: [],
        conclusions: [],
      };

      const node = new MockNode(nodeData, 1, 1);
      node.validate(); // This will fail and populate errors

      node.resetValidation();

      expect(node.validationState).toEqual({
        isValid: false,
        errors: [],
        affectedDescendants: [],
      });
    });
  });

  describe('Abstract methods enforcement', () => {
    it('should enforce implementation of getInputCount()', () => {
      // This test verifies that TypeScript enforces the abstract method
      // In a real scenario, trying to instantiate LogicNode directly would fail at compile time
      const node = new MockNode(mockData, 2, 1);
      expect(typeof node.getInputCount).toBe('function');
      expect(node.getInputCount()).toBe(2);
    });

    it('should enforce implementation of getOutputCount()', () => {
      const node = new MockNode(mockData, 2, 1);
      expect(typeof node.getOutputCount).toBe('function');
      expect(node.getOutputCount()).toBe(1);
    });
  });
});
