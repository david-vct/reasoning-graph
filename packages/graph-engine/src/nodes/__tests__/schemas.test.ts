/**
 * Zod Schema Tests for Concrete Node Types
 *
 * Tests Zod validation for AxiomNode, ModusPonensNode, ModusTollensNode, and SimpleAffirmationNode
 */

import { z } from 'zod';
import {
  axiomNodeSchema,
  modusPonensNodeSchema,
  modusTollensNodeSchema,
  simpleAffirmationNodeSchema,
  logicNodeSchema,
} from '../schemas';
import { NodeType } from '../types';
import { AxiomNode } from '../AxiomNode';
import { ModusPonensNode } from '../ModusPonensNode';
import { ModusTollensNode } from '../ModusTollensNode';
import { SimpleAffirmationNode } from '../SimpleAffirmationNode';

describe('Node Zod Schemas', () => {
  describe('axiomNodeSchema', () => {
    it('should validate a valid AxiomNode instance', () => {
      const node = new AxiomNode({
        id: '550e8400-e29b-41d4-a716-446655440000',
        position: { x: 100, y: 200 },
        conclusions: ['650e8400-e29b-41d4-a716-446655440001'],
      });
      node.validate();

      const result = axiomNodeSchema.safeParse(node);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.type).toBe(NodeType.Axiom);
        expect(result.data.premises).toEqual([]);
        expect(result.data.conclusions).toHaveLength(1);
      }
    });

    it('should reject node with wrong type', () => {
      const invalidNode = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        type: NodeType.ModusPonens, // Wrong type
        position: { x: 100, y: 200 },
        premises: [],
        conclusions: ['650e8400-e29b-41d4-a716-446655440001'],
        validationState: {
          isValid: true,
          errors: [],
          affectedDescendants: [],
        },
      };

      const result = axiomNodeSchema.safeParse(invalidNode);

      expect(result.success).toBe(false);
    });

    it('should reject node with invalid UUID', () => {
      const invalidNode = {
        id: 'not-a-uuid',
        type: NodeType.Axiom,
        position: { x: 100, y: 200 },
        premises: [],
        conclusions: ['650e8400-e29b-41d4-a716-446655440001'],
        validationState: {
          isValid: true,
          errors: [],
          affectedDescendants: [],
        },
      };

      const result = axiomNodeSchema.safeParse(invalidNode);

      expect(result.success).toBe(false);
    });
  });

  describe('modusPonensNodeSchema', () => {
    it('should validate a valid ModusPonensNode instance', () => {
      const node = new ModusPonensNode({
        id: '550e8400-e29b-41d4-a716-446655440000',
        position: { x: 150, y: 250 },
        premises: ['650e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440002'],
        conclusions: ['650e8400-e29b-41d4-a716-446655440003'],
      });
      node.validate();

      const result = modusPonensNodeSchema.safeParse(node);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.type).toBe(NodeType.ModusPonens);
        expect(result.data.premises).toHaveLength(2);
        expect(result.data.conclusions).toHaveLength(1);
      }
    });

    it('should reject node with wrong type', () => {
      const invalidNode = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        type: NodeType.Axiom, // Wrong type
        position: { x: 150, y: 250 },
        premises: ['650e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440002'],
        conclusions: ['650e8400-e29b-41d4-a716-446655440003'],
        validationState: {
          isValid: true,
          errors: [],
          affectedDescendants: [],
        },
      };

      const result = modusPonensNodeSchema.safeParse(invalidNode);

      expect(result.success).toBe(false);
    });
  });

  describe('modusTollensNodeSchema', () => {
    it('should validate a valid ModusTollensNode instance', () => {
      const node = new ModusTollensNode({
        id: '550e8400-e29b-41d4-a716-446655440000',
        position: { x: 200, y: 300 },
        premises: ['650e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440002'],
        conclusions: ['650e8400-e29b-41d4-a716-446655440003'],
      });
      node.validate();

      const result = modusTollensNodeSchema.safeParse(node);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.type).toBe(NodeType.ModusTollens);
        expect(result.data.premises).toHaveLength(2);
        expect(result.data.conclusions).toHaveLength(1);
      }
    });

    it('should reject node with wrong type', () => {
      const invalidNode = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        type: NodeType.SimpleAffirmation, // Wrong type
        position: { x: 200, y: 300 },
        premises: ['650e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440002'],
        conclusions: ['650e8400-e29b-41d4-a716-446655440003'],
        validationState: {
          isValid: true,
          errors: [],
          affectedDescendants: [],
        },
      };

      const result = modusTollensNodeSchema.safeParse(invalidNode);

      expect(result.success).toBe(false);
    });
  });

  describe('simpleAffirmationNodeSchema', () => {
    it('should validate a valid SimpleAffirmationNode instance', () => {
      const node = new SimpleAffirmationNode({
        id: '550e8400-e29b-41d4-a716-446655440000',
        position: { x: 50, y: 100 },
        premises: ['650e8400-e29b-41d4-a716-446655440001'],
        conclusions: ['650e8400-e29b-41d4-a716-446655440002'],
      });
      node.validate();

      const result = simpleAffirmationNodeSchema.safeParse(node);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.type).toBe(NodeType.SimpleAffirmation);
        expect(result.data.premises).toHaveLength(1);
        expect(result.data.conclusions).toHaveLength(1);
      }
    });

    it('should accept optional annotation', () => {
      const node = new SimpleAffirmationNode({
        id: '550e8400-e29b-41d4-a716-446655440000',
        position: { x: 50, y: 100 },
        premises: ['650e8400-e29b-41d4-a716-446655440001'],
        conclusions: ['650e8400-e29b-41d4-a716-446655440002'],
        annotation: 'This is accepted',
      });
      node.validate();

      const result = simpleAffirmationNodeSchema.safeParse(node);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.annotation).toBe('This is accepted');
      }
    });
  });

  describe('logicNodeSchema (discriminated union)', () => {
    it('should validate AxiomNode through discriminated union', () => {
      const node = new AxiomNode({
        id: '550e8400-e29b-41d4-a716-446655440000',
        position: { x: 100, y: 200 },
        conclusions: ['650e8400-e29b-41d4-a716-446655440001'],
      });
      node.validate();

      const result = logicNodeSchema.safeParse(node);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.type).toBe(NodeType.Axiom);
      }
    });

    it('should validate ModusPonensNode through discriminated union', () => {
      const node = new ModusPonensNode({
        id: '550e8400-e29b-41d4-a716-446655440000',
        position: { x: 150, y: 250 },
        premises: ['650e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440002'],
        conclusions: ['650e8400-e29b-41d4-a716-446655440003'],
      });
      node.validate();

      const result = logicNodeSchema.safeParse(node);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.type).toBe(NodeType.ModusPonens);
      }
    });

    it('should validate ModusTollensNode through discriminated union', () => {
      const node = new ModusTollensNode({
        id: '550e8400-e29b-41d4-a716-446655440000',
        position: { x: 200, y: 300 },
        premises: ['650e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440002'],
        conclusions: ['650e8400-e29b-41d4-a716-446655440003'],
      });
      node.validate();

      const result = logicNodeSchema.safeParse(node);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.type).toBe(NodeType.ModusTollens);
      }
    });

    it('should validate SimpleAffirmationNode through discriminated union', () => {
      const node = new SimpleAffirmationNode({
        id: '550e8400-e29b-41d4-a716-446655440000',
        position: { x: 50, y: 100 },
        premises: ['650e8400-e29b-41d4-a716-446655440001'],
        conclusions: ['650e8400-e29b-41d4-a716-446655440002'],
      });
      node.validate();

      const result = logicNodeSchema.safeParse(node);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.type).toBe(NodeType.SimpleAffirmation);
      }
    });

    it('should provide type narrowing through discriminated union', () => {
      const axiomNode = new AxiomNode({
        id: '550e8400-e29b-41d4-a716-446655440000',
        position: { x: 100, y: 200 },
        conclusions: ['650e8400-e29b-41d4-a716-446655440001'],
      });
      axiomNode.validate();

      const result = logicNodeSchema.safeParse(axiomNode);

      expect(result.success).toBe(true);
      if (result.success) {
        // TypeScript should narrow the type based on discriminator
        if (result.data.type === NodeType.Axiom) {
          expect(result.data.premises).toEqual([]);
        }
      }
    });
  });
});
