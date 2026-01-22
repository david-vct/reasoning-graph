/**
 * AxiomNode Tests
 *
 * Tests for the AxiomNode implementation covering:
 * - Instantiation
 * - Validation (valid and invalid cases)
 * - Type inference
 */

import { AxiomNode } from '../AxiomNode';
import { NodeType } from '../types';

describe('AxiomNode', () => {
  describe('instantiation', () => {
    it('should create an AxiomNode with correct type', () => {
      const node = new AxiomNode({
        id: 'axiom-1',
        position: { x: 100, y: 200 },
        conclusions: ['prop-1'],
      });

      expect(node.id).toBe('axiom-1');
      expect(node.type).toBe(NodeType.Axiom);
      expect(node.position).toEqual({ x: 100, y: 200 });
      expect(node.conclusions).toEqual(['prop-1']);
      expect(node.premises).toEqual([]);
    });

    it('should accept optional annotation', () => {
      const node = new AxiomNode({
        id: 'axiom-1',
        position: { x: 0, y: 0 },
        conclusions: ['prop-1'],
        annotation: 'Fundamental truth',
      });

      expect(node.annotation).toBe('Fundamental truth');
    });

    it('should initialize with invalid validation state', () => {
      const node = new AxiomNode({
        id: 'axiom-1',
        position: { x: 0, y: 0 },
        conclusions: ['prop-1'],
      });

      expect(node.validationState.isValid).toBe(false);
      expect(node.validationState.errors).toEqual([]);
      expect(node.validationState.affectedDescendants).toEqual([]);
    });
  });

  describe('getInputCount', () => {
    it('should return 0 (axioms have no premises)', () => {
      const node = new AxiomNode({
        id: 'axiom-1',
        position: { x: 0, y: 0 },
        conclusions: ['prop-1'],
      });

      expect(node.getInputCount()).toBe(0);
    });
  });

  describe('getOutputCount', () => {
    it('should return 1 (axioms produce one conclusion)', () => {
      const node = new AxiomNode({
        id: 'axiom-1',
        position: { x: 0, y: 0 },
        conclusions: ['prop-1'],
      });

      expect(node.getOutputCount()).toBe(1);
    });
  });

  describe('validate', () => {
    it('should validate successfully with 0 premises and 1 conclusion', () => {
      const node = new AxiomNode({
        id: 'axiom-1',
        position: { x: 0, y: 0 },
        premises: [],
        conclusions: ['prop-1'],
      });

      const isValid = node.validate();

      expect(isValid).toBe(true);
      expect(node.validationState.isValid).toBe(true);
      expect(node.validationState.errors).toEqual([]);
    });

    it('should fail validation with non-empty premises', () => {
      const node = new AxiomNode({
        id: 'axiom-1',
        position: { x: 0, y: 0 },
        premises: ['prop-1'],
        conclusions: ['prop-2'],
      });

      const isValid = node.validate();

      expect(isValid).toBe(false);
      expect(node.validationState.isValid).toBe(false);
      expect(node.validationState.errors).toContain('Expected 0 premise(s), got 1');
    });

    it('should fail validation with no conclusions', () => {
      const node = new AxiomNode({
        id: 'axiom-1',
        position: { x: 0, y: 0 },
        conclusions: [],
      });

      const isValid = node.validate();

      expect(isValid).toBe(false);
      expect(node.validationState.isValid).toBe(false);
      expect(node.validationState.errors).toContain('Expected 1 conclusion(s), got 0');
    });

    it('should fail validation with multiple conclusions', () => {
      const node = new AxiomNode({
        id: 'axiom-1',
        position: { x: 0, y: 0 },
        conclusions: ['prop-1', 'prop-2'],
      });

      const isValid = node.validate();

      expect(isValid).toBe(false);
      expect(node.validationState.isValid).toBe(false);
      expect(node.validationState.errors).toContain('Expected 1 conclusion(s), got 2');
    });

    it('should accumulate multiple validation errors', () => {
      const node = new AxiomNode({
        id: 'axiom-1',
        position: { x: 0, y: 0 },
        premises: ['prop-1', 'prop-2'],
        conclusions: [],
      });

      const isValid = node.validate();

      expect(isValid).toBe(false);
      expect(node.validationState.errors).toHaveLength(2);
      expect(node.validationState.errors).toContain('Expected 0 premise(s), got 2');
      expect(node.validationState.errors).toContain('Expected 1 conclusion(s), got 0');
    });
  });

  describe('TypeScript type inference', () => {
    it('should infer correct types', () => {
      const node = new AxiomNode({
        id: 'axiom-1',
        position: { x: 0, y: 0 },
        conclusions: ['prop-1'],
      });

      // Type assertions to verify TypeScript inference
      const id: string = node.id;
      const type: NodeType = node.type;
      const position: { x: number; y: number } = node.position;
      const premises: string[] = node.premises;
      const conclusions: string[] = node.conclusions;

      expect(id).toBeDefined();
      expect(type).toBe(NodeType.Axiom);
      expect(position).toBeDefined();
      expect(premises).toBeDefined();
      expect(conclusions).toBeDefined();
    });
  });
});
