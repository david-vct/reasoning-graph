/**
 * Tests for InductionNode
 */

import { InductionNode } from '../InductionNode';
import { NodeType } from '../types';

describe('InductionNode', () => {
  describe('instantiation', () => {
    it('should create an induction node with valid data', () => {
      const node = new InductionNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 100, y: 200 },
        premises: ['prop-base', 'prop-inductive'],
        conclusions: ['prop-forall'],
        annotation: 'Mathematical induction',
      });

      expect(node.id).toBe('123e4567-e89b-12d3-a456-426614174000');
      expect(node.type).toBe(NodeType.Induction);
      expect(node.position).toEqual({ x: 100, y: 200 });
      expect(node.premises).toEqual(['prop-base', 'prop-inductive']);
      expect(node.conclusions).toEqual(['prop-forall']);
      expect(node.annotation).toBe('Mathematical induction');
    });

    it('should create with default empty premises/conclusions', () => {
      const node = new InductionNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
      });

      expect(node.premises).toEqual([]);
      expect(node.conclusions).toEqual([]);
    });
  });

  describe('getInputCount', () => {
    it('should return 2 for induction (base case and inductive step)', () => {
      const node = new InductionNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
      });

      expect(node.getInputCount()).toBe(2);
    });
  });

  describe('getOutputCount', () => {
    it('should return 1 for conclusion (∀n P(n))', () => {
      const node = new InductionNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
      });

      expect(node.getOutputCount()).toBe(1);
    });
  });

  describe('validate', () => {
    it('should validate with exactly 2 premises and 1 conclusion', () => {
      const node = new InductionNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
        premises: ['prop-1', 'prop-2'],
        conclusions: ['prop-3'],
      });

      expect(node.validate()).toBe(true);
      expect(node.validationState.isValid).toBe(true);
      expect(node.validationState.errors).toEqual([]);
    });

    it('should fail validation with insufficient premises', () => {
      const node = new InductionNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
        premises: ['prop-1'],
        conclusions: ['prop-2'],
      });

      expect(node.validate()).toBe(false);
      expect(node.validationState.isValid).toBe(false);
      expect(node.validationState.errors).toContain('Expected 2 premise(s), got 1');
    });

    it('should fail validation with too many conclusions', () => {
      const node = new InductionNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
        premises: ['prop-1', 'prop-2'],
        conclusions: ['prop-3', 'prop-4'],
      });

      expect(node.validate()).toBe(false);
      expect(node.validationState.isValid).toBe(false);
      expect(node.validationState.errors).toContain('Expected 1 conclusion(s), got 2');
    });
  });

  describe('TypeScript type inference', () => {
    it('should properly infer type', () => {
      const node = new InductionNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
      });

      expect(node.type).toBe(NodeType.Induction);
    });
  });
});
