/**
 * Tests for FreeFormNode
 */

import { FreeFormNode, FREEFORM_CONSTRAINTS } from '../FreeFormNode';
import { NodeType } from '../types';

describe('FreeFormNode', () => {
  describe('instantiation', () => {
    it('should create a free form node with valid data', () => {
      const node = new FreeFormNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 100, y: 200 },
        premises: ['prop-1', 'prop-2'],
        conclusions: ['prop-3'],
        annotation: 'Custom reasoning',
      });

      expect(node.id).toBe('123e4567-e89b-12d3-a456-426614174000');
      expect(node.type).toBe(NodeType.FreeForm);
      expect(node.position).toEqual({ x: 100, y: 200 });
      expect(node.premises).toEqual(['prop-1', 'prop-2']);
      expect(node.conclusions).toEqual(['prop-3']);
      expect(node.annotation).toBe('Custom reasoning');
    });

    it('should create with default empty premises/conclusions', () => {
      const node = new FreeFormNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
      });

      expect(node.premises).toEqual([]);
      expect(node.conclusions).toEqual([]);
    });

    it('should create with no premises and one conclusion', () => {
      const node = new FreeFormNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
        premises: [],
        conclusions: ['prop-1'],
      });

      expect(node.premises).toEqual([]);
      expect(node.conclusions).toEqual(['prop-1']);
    });

    it('should create with maximum premises and conclusions', () => {
      const node = new FreeFormNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
        premises: ['p1', 'p2', 'p3', 'p4', 'p5'],
        conclusions: ['c1', 'c2', 'c3'],
      });

      expect(node.premises).toHaveLength(5);
      expect(node.conclusions).toHaveLength(3);
    });
  });

  describe('getInputCount', () => {
    it('should return -1 for dynamic input count', () => {
      const node = new FreeFormNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
      });

      expect(node.getInputCount()).toBe(-1);
    });
  });

  describe('getOutputCount', () => {
    it('should return -1 for dynamic output count', () => {
      const node = new FreeFormNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
      });

      expect(node.getOutputCount()).toBe(-1);
    });
  });

  describe('validate', () => {
    it('should validate with 0 premises and 1 conclusion', () => {
      const node = new FreeFormNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
        premises: [],
        conclusions: ['prop-1'],
      });

      expect(node.validate()).toBe(true);
      expect(node.validationState.isValid).toBe(true);
      expect(node.validationState.errors).toEqual([]);
    });

    it('should validate with maximum premises and conclusions', () => {
      const node = new FreeFormNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
        premises: ['p1', 'p2', 'p3', 'p4', 'p5'],
        conclusions: ['c1', 'c2', 'c3'],
      });

      expect(node.validate()).toBe(true);
      expect(node.validationState.isValid).toBe(true);
      expect(node.validationState.errors).toEqual([]);
    });

    it('should fail validation with more than 5 premises', () => {
      const node = new FreeFormNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
        premises: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'],
        conclusions: ['c1'],
      });

      expect(node.validate()).toBe(false);
      expect(node.validationState.isValid).toBe(false);
      expect(node.validationState.errors).toContain('Maximum 5 premises allowed, got 6');
    });

    it('should fail validation with no conclusions', () => {
      const node = new FreeFormNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
        premises: ['p1'],
        conclusions: [],
      });

      expect(node.validate()).toBe(false);
      expect(node.validationState.isValid).toBe(false);
      expect(node.validationState.errors).toContain('Minimum 1 conclusion(s) required, got 0');
    });

    it('should fail validation with more than 3 conclusions', () => {
      const node = new FreeFormNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
        premises: ['p1'],
        conclusions: ['c1', 'c2', 'c3', 'c4'],
      });

      expect(node.validate()).toBe(false);
      expect(node.validationState.isValid).toBe(false);
      expect(node.validationState.errors).toContain('Maximum 3 conclusions allowed, got 4');
    });
  });

  describe('addPremise', () => {
    it('should add a premise successfully', () => {
      const node = new FreeFormNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
        premises: ['p1'],
        conclusions: ['c1'],
      });

      node.addPremise('p2');

      expect(node.premises).toEqual(['p1', 'p2']);
      expect(node.validate()).toBe(true);
    });

    it('should add up to 5 premises', () => {
      const node = new FreeFormNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
        premises: [],
        conclusions: ['c1'],
      });

      node.addPremise('p1');
      node.addPremise('p2');
      node.addPremise('p3');
      node.addPremise('p4');
      node.addPremise('p5');

      expect(node.premises).toHaveLength(5);
      expect(node.validate()).toBe(true);
    });

    it('should throw error when adding 6th premise', () => {
      const node = new FreeFormNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
        premises: ['p1', 'p2', 'p3', 'p4', 'p5'],
        conclusions: ['c1'],
      });

      expect(() => node.addPremise('p6')).toThrow('Cannot add premise: maximum 5 premises allowed');
    });

    it('should allow duplicate propositions', () => {
      const node = new FreeFormNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
        premises: ['p1'],
        conclusions: ['c1'],
      });

      node.addPremise('p1');

      expect(node.premises).toEqual(['p1', 'p1']);
    });
  });

  describe('removePremise', () => {
    it('should remove a premise successfully', () => {
      const node = new FreeFormNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
        premises: ['p1', 'p2', 'p3'],
        conclusions: ['c1'],
      });

      const result = node.removePremise('p2');

      expect(result).toBe(true);
      expect(node.premises).toEqual(['p1', 'p3']);
    });

    it('should return false when removing non-existent premise', () => {
      const node = new FreeFormNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
        premises: ['p1'],
        conclusions: ['c1'],
      });

      const result = node.removePremise('p2');

      expect(result).toBe(false);
      expect(node.premises).toEqual(['p1']);
    });

    it('should remove all premises', () => {
      const node = new FreeFormNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
        premises: ['p1', 'p2'],
        conclusions: ['c1'],
      });

      node.removePremise('p1');
      node.removePremise('p2');

      expect(node.premises).toEqual([]);
      expect(node.validate()).toBe(true);
    });
  });

  describe('addConclusion', () => {
    it('should add a conclusion successfully', () => {
      const node = new FreeFormNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
        premises: ['p1'],
        conclusions: ['c1'],
      });

      node.addConclusion('c2');

      expect(node.conclusions).toEqual(['c1', 'c2']);
      expect(node.validate()).toBe(true);
    });

    it('should add up to 3 conclusions', () => {
      const node = new FreeFormNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
        premises: ['p1'],
        conclusions: ['c1'],
      });

      node.addConclusion('c2');
      node.addConclusion('c3');

      expect(node.conclusions).toHaveLength(3);
      expect(node.validate()).toBe(true);
    });

    it('should throw error when adding 4th conclusion', () => {
      const node = new FreeFormNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
        premises: ['p1'],
        conclusions: ['c1', 'c2', 'c3'],
      });

      expect(() => node.addConclusion('c4')).toThrow(
        'Cannot add conclusion: maximum 3 conclusions allowed'
      );
    });
  });

  describe('removeConclusion', () => {
    it('should remove a conclusion successfully', () => {
      const node = new FreeFormNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
        premises: ['p1'],
        conclusions: ['c1', 'c2', 'c3'],
      });

      const result = node.removeConclusion('c2');

      expect(result).toBe(true);
      expect(node.conclusions).toEqual(['c1', 'c3']);
    });

    it('should throw error when removing last conclusion', () => {
      const node = new FreeFormNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
        premises: ['p1'],
        conclusions: ['c1'],
      });

      expect(() => node.removeConclusion('c1')).toThrow(
        'Cannot remove conclusion: minimum 1 conclusion(s) required'
      );
    });

    it('should return false when removing non-existent conclusion', () => {
      const node = new FreeFormNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
        premises: ['p1'],
        conclusions: ['c1', 'c2'],
      });

      const result = node.removeConclusion('c3');

      expect(result).toBe(false);
      expect(node.conclusions).toEqual(['c1', 'c2']);
    });
  });

  describe('FREEFORM_CONSTRAINTS', () => {
    it('should export correct constraint values', () => {
      expect(FREEFORM_CONSTRAINTS.MIN_PREMISES).toBe(0);
      expect(FREEFORM_CONSTRAINTS.MAX_PREMISES).toBe(5);
      expect(FREEFORM_CONSTRAINTS.MIN_CONCLUSIONS).toBe(1);
      expect(FREEFORM_CONSTRAINTS.MAX_CONCLUSIONS).toBe(3);
    });
  });

  describe('TypeScript type inference', () => {
    it('should properly infer type', () => {
      const node = new FreeFormNode({
        id: '123e4567-e89b-12d3-a456-426614174000',
        position: { x: 0, y: 0 },
      });

      expect(node.type).toBe(NodeType.FreeForm);
    });
  });
});
