/**
 * ModusTollensNode Tests
 *
 * Tests for the ModusTollensNode implementation covering:
 * - Instantiation
 * - Validation (valid and invalid cases)
 * - Type inference
 */

import { ModusTollensNode } from '../ModusTollensNode';
import { NodeType } from '../types';

describe('ModusTollensNode', () => {
  describe('instantiation', () => {
    it('should create a ModusTollensNode with correct type', () => {
      const node = new ModusTollensNode({
        id: 'mt-1',
        position: { x: 200, y: 300 },
        premises: ['prop-impl', 'prop-not-q'],
        conclusions: ['prop-not-p'],
      });

      expect(node.id).toBe('mt-1');
      expect(node.type).toBe(NodeType.ModusTollens);
      expect(node.position).toEqual({ x: 200, y: 300 });
      expect(node.premises).toEqual(['prop-impl', 'prop-not-q']);
      expect(node.conclusions).toEqual(['prop-not-p']);
    });

    it('should accept optional annotation', () => {
      const node = new ModusTollensNode({
        id: 'mt-1',
        position: { x: 0, y: 0 },
        premises: ['prop-1', 'prop-2'],
        conclusions: ['prop-3'],
        annotation: 'Contrapositive inference',
      });

      expect(node.annotation).toBe('Contrapositive inference');
    });

    it('should initialize with invalid validation state', () => {
      const node = new ModusTollensNode({
        id: 'mt-1',
        position: { x: 0, y: 0 },
        premises: ['prop-1', 'prop-2'],
        conclusions: ['prop-3'],
      });

      expect(node.validationState.isValid).toBe(false);
      expect(node.validationState.errors).toEqual([]);
      expect(node.validationState.affectedDescendants).toEqual([]);
    });
  });

  describe('getInputCount', () => {
    it('should return 2 (Modus Tollens requires 2 premises)', () => {
      const node = new ModusTollensNode({
        id: 'mt-1',
        position: { x: 0, y: 0 },
        premises: ['prop-1', 'prop-2'],
        conclusions: ['prop-3'],
      });

      expect(node.getInputCount()).toBe(2);
    });
  });

  describe('getOutputCount', () => {
    it('should return 1 (Modus Tollens produces 1 conclusion)', () => {
      const node = new ModusTollensNode({
        id: 'mt-1',
        position: { x: 0, y: 0 },
        premises: ['prop-1', 'prop-2'],
        conclusions: ['prop-3'],
      });

      expect(node.getOutputCount()).toBe(1);
    });
  });

  describe('validate', () => {
    it('should validate successfully with 2 premises and 1 conclusion', () => {
      const node = new ModusTollensNode({
        id: 'mt-1',
        position: { x: 0, y: 0 },
        premises: ['prop-impl', 'prop-not-q'],
        conclusions: ['prop-not-p'],
      });

      const isValid = node.validate();

      expect(isValid).toBe(true);
      expect(node.validationState.isValid).toBe(true);
      expect(node.validationState.errors).toEqual([]);
    });

    it('should fail validation with incorrect number of premises (0)', () => {
      const node = new ModusTollensNode({
        id: 'mt-1',
        position: { x: 0, y: 0 },
        premises: [],
        conclusions: ['prop-not-p'],
      });

      const isValid = node.validate();

      expect(isValid).toBe(false);
      expect(node.validationState.isValid).toBe(false);
      expect(node.validationState.errors).toContain('Expected 2 premise(s), got 0');
    });

    it('should fail validation with incorrect number of premises (1)', () => {
      const node = new ModusTollensNode({
        id: 'mt-1',
        position: { x: 0, y: 0 },
        premises: ['prop-impl'],
        conclusions: ['prop-not-p'],
      });

      const isValid = node.validate();

      expect(isValid).toBe(false);
      expect(node.validationState.isValid).toBe(false);
      expect(node.validationState.errors).toContain('Expected 2 premise(s), got 1');
    });

    it('should fail validation with incorrect number of premises (3)', () => {
      const node = new ModusTollensNode({
        id: 'mt-1',
        position: { x: 0, y: 0 },
        premises: ['prop-1', 'prop-2', 'prop-3'],
        conclusions: ['prop-not-p'],
      });

      const isValid = node.validate();

      expect(isValid).toBe(false);
      expect(node.validationState.isValid).toBe(false);
      expect(node.validationState.errors).toContain('Expected 2 premise(s), got 3');
    });

    it('should fail validation with no conclusions', () => {
      const node = new ModusTollensNode({
        id: 'mt-1',
        position: { x: 0, y: 0 },
        premises: ['prop-1', 'prop-2'],
        conclusions: [],
      });

      const isValid = node.validate();

      expect(isValid).toBe(false);
      expect(node.validationState.isValid).toBe(false);
      expect(node.validationState.errors).toContain('Expected 1 conclusion(s), got 0');
    });

    it('should fail validation with multiple conclusions', () => {
      const node = new ModusTollensNode({
        id: 'mt-1',
        position: { x: 0, y: 0 },
        premises: ['prop-1', 'prop-2'],
        conclusions: ['prop-not-p', 'prop-extra'],
      });

      const isValid = node.validate();

      expect(isValid).toBe(false);
      expect(node.validationState.isValid).toBe(false);
      expect(node.validationState.errors).toContain('Expected 1 conclusion(s), got 2');
    });

    it('should accumulate multiple validation errors', () => {
      const node = new ModusTollensNode({
        id: 'mt-1',
        position: { x: 0, y: 0 },
        premises: ['prop-1'],
        conclusions: ['prop-not-p', 'prop-extra'],
      });

      const isValid = node.validate();

      expect(isValid).toBe(false);
      expect(node.validationState.errors).toHaveLength(2);
      expect(node.validationState.errors).toContain('Expected 2 premise(s), got 1');
      expect(node.validationState.errors).toContain('Expected 1 conclusion(s), got 2');
    });
  });

  describe('TypeScript type inference', () => {
    it('should infer correct types', () => {
      const node = new ModusTollensNode({
        id: 'mt-1',
        position: { x: 0, y: 0 },
        premises: ['prop-1', 'prop-2'],
        conclusions: ['prop-3'],
      });

      // Type assertions to verify TypeScript inference
      const id: string = node.id;
      const type: NodeType = node.type;
      const position: { x: number; y: number } = node.position;
      const premises: string[] = node.premises;
      const conclusions: string[] = node.conclusions;

      expect(id).toBeDefined();
      expect(type).toBe(NodeType.ModusTollens);
      expect(position).toBeDefined();
      expect(premises).toBeDefined();
      expect(conclusions).toBeDefined();
    });
  });
});
