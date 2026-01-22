/**
 * ModusPonensNode Tests
 *
 * Tests for the ModusPonensNode implementation covering:
 * - Instantiation
 * - Validation (valid and invalid cases)
 * - Type inference
 */

import { ModusPonensNode } from '../ModusPonensNode';
import { NodeType } from '../types';

describe('ModusPonensNode', () => {
  describe('instantiation', () => {
    it('should create a ModusPonensNode with correct type', () => {
      const node = new ModusPonensNode({
        id: 'mp-1',
        position: { x: 150, y: 250 },
        premises: ['prop-impl', 'prop-p'],
        conclusions: ['prop-q'],
      });

      expect(node.id).toBe('mp-1');
      expect(node.type).toBe(NodeType.ModusPonens);
      expect(node.position).toEqual({ x: 150, y: 250 });
      expect(node.premises).toEqual(['prop-impl', 'prop-p']);
      expect(node.conclusions).toEqual(['prop-q']);
    });

    it('should accept optional annotation', () => {
      const node = new ModusPonensNode({
        id: 'mp-1',
        position: { x: 0, y: 0 },
        premises: ['prop-1', 'prop-2'],
        conclusions: ['prop-3'],
        annotation: 'Standard inference',
      });

      expect(node.annotation).toBe('Standard inference');
    });

    it('should initialize with invalid validation state', () => {
      const node = new ModusPonensNode({
        id: 'mp-1',
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
    it('should return 2 (Modus Ponens requires 2 premises)', () => {
      const node = new ModusPonensNode({
        id: 'mp-1',
        position: { x: 0, y: 0 },
        premises: ['prop-1', 'prop-2'],
        conclusions: ['prop-3'],
      });

      expect(node.getInputCount()).toBe(2);
    });
  });

  describe('getOutputCount', () => {
    it('should return 1 (Modus Ponens produces 1 conclusion)', () => {
      const node = new ModusPonensNode({
        id: 'mp-1',
        position: { x: 0, y: 0 },
        premises: ['prop-1', 'prop-2'],
        conclusions: ['prop-3'],
      });

      expect(node.getOutputCount()).toBe(1);
    });
  });

  describe('validate', () => {
    it('should validate successfully with 2 premises and 1 conclusion', () => {
      const node = new ModusPonensNode({
        id: 'mp-1',
        position: { x: 0, y: 0 },
        premises: ['prop-impl', 'prop-p'],
        conclusions: ['prop-q'],
      });

      const isValid = node.validate();

      expect(isValid).toBe(true);
      expect(node.validationState.isValid).toBe(true);
      expect(node.validationState.errors).toEqual([]);
    });

    it('should fail validation with incorrect number of premises (0)', () => {
      const node = new ModusPonensNode({
        id: 'mp-1',
        position: { x: 0, y: 0 },
        premises: [],
        conclusions: ['prop-q'],
      });

      const isValid = node.validate();

      expect(isValid).toBe(false);
      expect(node.validationState.isValid).toBe(false);
      expect(node.validationState.errors).toContain('Expected 2 premise(s), got 0');
    });

    it('should fail validation with incorrect number of premises (1)', () => {
      const node = new ModusPonensNode({
        id: 'mp-1',
        position: { x: 0, y: 0 },
        premises: ['prop-impl'],
        conclusions: ['prop-q'],
      });

      const isValid = node.validate();

      expect(isValid).toBe(false);
      expect(node.validationState.isValid).toBe(false);
      expect(node.validationState.errors).toContain('Expected 2 premise(s), got 1');
    });

    it('should fail validation with incorrect number of premises (3)', () => {
      const node = new ModusPonensNode({
        id: 'mp-1',
        position: { x: 0, y: 0 },
        premises: ['prop-1', 'prop-2', 'prop-3'],
        conclusions: ['prop-q'],
      });

      const isValid = node.validate();

      expect(isValid).toBe(false);
      expect(node.validationState.isValid).toBe(false);
      expect(node.validationState.errors).toContain('Expected 2 premise(s), got 3');
    });

    it('should fail validation with no conclusions', () => {
      const node = new ModusPonensNode({
        id: 'mp-1',
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
      const node = new ModusPonensNode({
        id: 'mp-1',
        position: { x: 0, y: 0 },
        premises: ['prop-1', 'prop-2'],
        conclusions: ['prop-q', 'prop-r'],
      });

      const isValid = node.validate();

      expect(isValid).toBe(false);
      expect(node.validationState.isValid).toBe(false);
      expect(node.validationState.errors).toContain('Expected 1 conclusion(s), got 2');
    });

    it('should accumulate multiple validation errors', () => {
      const node = new ModusPonensNode({
        id: 'mp-1',
        position: { x: 0, y: 0 },
        premises: ['prop-1'],
        conclusions: [],
      });

      const isValid = node.validate();

      expect(isValid).toBe(false);
      expect(node.validationState.errors).toHaveLength(2);
      expect(node.validationState.errors).toContain('Expected 2 premise(s), got 1');
      expect(node.validationState.errors).toContain('Expected 1 conclusion(s), got 0');
    });
  });

  describe('TypeScript type inference', () => {
    it('should infer correct types', () => {
      const node = new ModusPonensNode({
        id: 'mp-1',
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
      expect(type).toBe(NodeType.ModusPonens);
      expect(position).toBeDefined();
      expect(premises).toBeDefined();
      expect(conclusions).toBeDefined();
    });
  });
});
