/**
 * Tests for ReductioAdAbsurdumNode
 */

import { ReductioAdAbsurdumNode } from '../ReductioAdAbsurdumNode';
import { NodeType } from '../types';

describe('ReductioAdAbsurdumNode', () => {
  describe('instantiation', () => {
    it('should create a reductio ad absurdum node with valid data', () => {
      const node = new ReductioAdAbsurdumNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 100, y: 200 },
        premises: ['prop-contradiction'],
        conclusions: ['prop-negation'],
        annotation: 'Proof by contradiction',
      });

      expect(node.id).toBe('123e4567-e89b-12d3-a456-426614174000');
      expect(node.type).toBe(NodeType.ReductioAdAbsurdum);
      expect(node.position).toEqual({ x: 100, y: 200 });
      expect(node.premises).toEqual(['prop-contradiction']);
      expect(node.conclusions).toEqual(['prop-negation']);
      expect(node.annotation).toBe('Proof by contradiction');
    });

    it('should create with default empty premises/conclusions', () => {
      const node = new ReductioAdAbsurdumNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
      });

      expect(node.premises).toEqual([]);
      expect(node.conclusions).toEqual([]);
    });
  });

  describe('getInputCount', () => {
    it('should return 1 for reductio (P→⊥)', () => {
      const node = new ReductioAdAbsurdumNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
      });

      expect(node.getInputCount()).toBe(1);
    });
  });

  describe('getOutputCount', () => {
    it('should return 1 for conclusion (¬P)', () => {
      const node = new ReductioAdAbsurdumNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
      });

      expect(node.getOutputCount()).toBe(1);
    });
  });

  describe('validate', () => {
    it('should validate with exactly 1 premise and 1 conclusion', () => {
      const node = new ReductioAdAbsurdumNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
        premises: ['prop-1'],
        conclusions: ['prop-2'],
      });

      expect(node.validate()).toBe(true);
      expect(node.validationState.isValid).toBe(true);
      expect(node.validationState.errors).toEqual([]);
    });

    it('should fail validation with no premises', () => {
      const node = new ReductioAdAbsurdumNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
        premises: [],
        conclusions: ['prop-1'],
      });

      expect(node.validate()).toBe(false);
      expect(node.validationState.isValid).toBe(false);
      expect(node.validationState.errors).toContain('Expected 1 premise(s), got 0');
    });

    it('should fail validation with too many premises', () => {
      const node = new ReductioAdAbsurdumNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
        premises: ['prop-1', 'prop-2'],
        conclusions: ['prop-3'],
      });

      expect(node.validate()).toBe(false);
      expect(node.validationState.isValid).toBe(false);
      expect(node.validationState.errors).toContain('Expected 1 premise(s), got 2');
    });

    it('should fail validation with no conclusions', () => {
      const node = new ReductioAdAbsurdumNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
        premises: ['prop-1'],
        conclusions: [],
      });

      expect(node.validate()).toBe(false);
      expect(node.validationState.isValid).toBe(false);
      expect(node.validationState.errors).toContain('Expected 1 conclusion(s), got 0');
    });
  });

  describe('TypeScript type inference', () => {
    it('should properly infer type', () => {
      const node = new ReductioAdAbsurdumNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
      });

      expect(node.type).toBe(NodeType.ReductioAdAbsurdum);
    });
  });
});
