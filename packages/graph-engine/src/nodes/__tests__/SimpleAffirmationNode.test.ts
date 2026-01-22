/**
 * SimpleAffirmationNode Tests
 *
 * Tests for the SimpleAffirmationNode implementation covering:
 * - Instantiation
 * - Validation (valid and invalid cases)
 * - Type inference
 */

import { SimpleAffirmationNode } from '../SimpleAffirmationNode';
import { NodeType } from '../types';

describe('SimpleAffirmationNode', () => {
  describe('instantiation', () => {
    it('should create a SimpleAffirmationNode with correct type', () => {
      const node = new SimpleAffirmationNode({
        id: 'sa-1',
        position: { x: 50, y: 100 },
        premises: ['prop-p'],
        conclusions: ['prop-p-affirmed'],
      });

      expect(node.id).toBe('sa-1');
      expect(node.type).toBe(NodeType.SimpleAffirmation);
      expect(node.position).toEqual({ x: 50, y: 100 });
      expect(node.premises).toEqual(['prop-p']);
      expect(node.conclusions).toEqual(['prop-p-affirmed']);
    });

    it('should accept optional annotation', () => {
      const node = new SimpleAffirmationNode({
        id: 'sa-1',
        position: { x: 0, y: 0 },
        premises: ['prop-1'],
        conclusions: ['prop-2'],
        annotation: 'This is accepted',
      });

      expect(node.annotation).toBe('This is accepted');
    });

    it('should initialize with invalid validation state', () => {
      const node = new SimpleAffirmationNode({
        id: 'sa-1',
        position: { x: 0, y: 0 },
        premises: ['prop-1'],
        conclusions: ['prop-2'],
      });

      expect(node.validationState.isValid).toBe(false);
      expect(node.validationState.errors).toEqual([]);
      expect(node.validationState.affectedDescendants).toEqual([]);
    });
  });

  describe('getInputCount', () => {
    it('should return 1 (SimpleAffirmation requires 1 premise)', () => {
      const node = new SimpleAffirmationNode({
        id: 'sa-1',
        position: { x: 0, y: 0 },
        premises: ['prop-1'],
        conclusions: ['prop-2'],
      });

      expect(node.getInputCount()).toBe(1);
    });
  });

  describe('getOutputCount', () => {
    it('should return 1 (SimpleAffirmation produces 1 conclusion)', () => {
      const node = new SimpleAffirmationNode({
        id: 'sa-1',
        position: { x: 0, y: 0 },
        premises: ['prop-1'],
        conclusions: ['prop-2'],
      });

      expect(node.getOutputCount()).toBe(1);
    });
  });

  describe('validate', () => {
    it('should validate successfully with 1 premise and 1 conclusion', () => {
      const node = new SimpleAffirmationNode({
        id: 'sa-1',
        position: { x: 0, y: 0 },
        premises: ['prop-p'],
        conclusions: ['prop-p-affirmed'],
      });

      const isValid = node.validate();

      expect(isValid).toBe(true);
      expect(node.validationState.isValid).toBe(true);
      expect(node.validationState.errors).toEqual([]);
    });

    it('should fail validation with no premises', () => {
      const node = new SimpleAffirmationNode({
        id: 'sa-1',
        position: { x: 0, y: 0 },
        premises: [],
        conclusions: ['prop-p'],
      });

      const isValid = node.validate();

      expect(isValid).toBe(false);
      expect(node.validationState.isValid).toBe(false);
      expect(node.validationState.errors).toContain('Expected 1 premise(s), got 0');
    });

    it('should fail validation with multiple premises', () => {
      const node = new SimpleAffirmationNode({
        id: 'sa-1',
        position: { x: 0, y: 0 },
        premises: ['prop-1', 'prop-2'],
        conclusions: ['prop-3'],
      });

      const isValid = node.validate();

      expect(isValid).toBe(false);
      expect(node.validationState.isValid).toBe(false);
      expect(node.validationState.errors).toContain('Expected 1 premise(s), got 2');
    });

    it('should fail validation with no conclusions', () => {
      const node = new SimpleAffirmationNode({
        id: 'sa-1',
        position: { x: 0, y: 0 },
        premises: ['prop-p'],
        conclusions: [],
      });

      const isValid = node.validate();

      expect(isValid).toBe(false);
      expect(node.validationState.isValid).toBe(false);
      expect(node.validationState.errors).toContain('Expected 1 conclusion(s), got 0');
    });

    it('should fail validation with multiple conclusions', () => {
      const node = new SimpleAffirmationNode({
        id: 'sa-1',
        position: { x: 0, y: 0 },
        premises: ['prop-p'],
        conclusions: ['prop-1', 'prop-2'],
      });

      const isValid = node.validate();

      expect(isValid).toBe(false);
      expect(node.validationState.isValid).toBe(false);
      expect(node.validationState.errors).toContain('Expected 1 conclusion(s), got 2');
    });

    it('should accumulate multiple validation errors', () => {
      const node = new SimpleAffirmationNode({
        id: 'sa-1',
        position: { x: 0, y: 0 },
        premises: [],
        conclusions: ['prop-1', 'prop-2'],
      });

      const isValid = node.validate();

      expect(isValid).toBe(false);
      expect(node.validationState.errors).toHaveLength(2);
      expect(node.validationState.errors).toContain('Expected 1 premise(s), got 0');
      expect(node.validationState.errors).toContain('Expected 1 conclusion(s), got 2');
    });
  });

  describe('TypeScript type inference', () => {
    it('should infer correct types', () => {
      const node = new SimpleAffirmationNode({
        id: 'sa-1',
        position: { x: 0, y: 0 },
        premises: ['prop-1'],
        conclusions: ['prop-2'],
      });

      // Type assertions to verify TypeScript inference
      const id: string = node.id;
      const type: NodeType = node.type;
      const position: { x: number; y: number } = node.position;
      const premises: string[] = node.premises;
      const conclusions: string[] = node.conclusions;

      expect(id).toBeDefined();
      expect(type).toBe(NodeType.SimpleAffirmation);
      expect(position).toBeDefined();
      expect(premises).toBeDefined();
      expect(conclusions).toBeDefined();
    });
  });
});
