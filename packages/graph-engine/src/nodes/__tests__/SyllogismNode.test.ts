/**
 * Tests for SyllogismNode
 */

import { SyllogismNode } from '../SyllogismNode';
import { NodeType } from '../types';

describe('SyllogismNode', () => {
  describe('instantiation', () => {
    it('should create a syllogism node with valid data', () => {
      const node = new SyllogismNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 100, y: 200 },
        premises: ['prop-1', 'prop-2'],
        conclusions: ['prop-3'],
        annotation: 'Classic syllogism',
      });

      expect(node.id).toBe('123e4567-e89b-12d3-a456-426614174000');
      expect(node.type).toBe(NodeType.Syllogism);
      expect(node.position).toEqual({ x: 100, y: 200 });
      expect(node.premises).toEqual(['prop-1', 'prop-2']);
      expect(node.conclusions).toEqual(['prop-3']);
      expect(node.annotation).toBe('Classic syllogism');
    });

    it('should create with default empty premises/conclusions', () => {
      const node = new SyllogismNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
      });

      expect(node.premises).toEqual([]);
      expect(node.conclusions).toEqual([]);
    });
  });

  describe('getInputCount', () => {
    it('should return 2 for syllogism (major and minor premises)', () => {
      const node = new SyllogismNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
      });

      expect(node.getInputCount()).toBe(2);
    });
  });

  describe('getOutputCount', () => {
    it('should return 1 for syllogism conclusion', () => {
      const node = new SyllogismNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
      });

      expect(node.getOutputCount()).toBe(1);
    });
  });

  describe('validate', () => {
    it('should validate with exactly 2 premises and 1 conclusion', () => {
      const node = new SyllogismNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
        premises: ['prop-major', 'prop-minor'],
        conclusions: ['prop-conclusion'],
      });

      expect(node.validate()).toBe(true);
      expect(node.validationState.isValid).toBe(true);
      expect(node.validationState.errors).toEqual([]);
    });

    it('should fail validation with insufficient premises', () => {
      const node = new SyllogismNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
        premises: ['prop-1'],
        conclusions: ['prop-2'],
      });

      expect(node.validate()).toBe(false);
      expect(node.validationState.isValid).toBe(false);
      expect(node.validationState.errors).toContain('Expected 2 premise(s), got 1');
    });

    it('should fail validation with too many premises', () => {
      const node = new SyllogismNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
        premises: ['prop-1', 'prop-2', 'prop-3'],
        conclusions: ['prop-4'],
      });

      expect(node.validate()).toBe(false);
      expect(node.validationState.isValid).toBe(false);
      expect(node.validationState.errors).toContain('Expected 2 premise(s), got 3');
    });

    it('should fail validation with no conclusions', () => {
      const node = new SyllogismNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
        premises: ['prop-1', 'prop-2'],
        conclusions: [],
      });

      expect(node.validate()).toBe(false);
      expect(node.validationState.isValid).toBe(false);
      expect(node.validationState.errors).toContain('Expected 1 conclusion(s), got 0');
    });

    it('should fail validation with too many conclusions', () => {
      const node = new SyllogismNode({
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
      const node = new SyllogismNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
      });

      // TypeScript compile-time check
      expect(node.type).toBe(NodeType.Syllogism);
    });
  });
});
