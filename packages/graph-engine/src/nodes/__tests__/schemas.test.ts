/**
 * Tests for Zod schemas
 */

import {
  positionSchema,
  validationStateSchema,
  logicNodeBaseSchema,
  logicNodeSchema,
  axiomNodeSchema,
  modusPonensNodeSchema,
} from '../schemas';
import { NodeType } from '../types';

describe('Zod Schemas', () => {
  const validUuid = '550e8400-e29b-41d4-a716-446655440000';

  describe('positionSchema', () => {
    it('should validate valid position', () => {
      const result = positionSchema.safeParse({ x: 100, y: 200 });
      expect(result.success).toBe(true);
    });

    it('should reject position with missing x', () => {
      const result = positionSchema.safeParse({ y: 200 });
      expect(result.success).toBe(false);
    });

    it('should reject position with missing y', () => {
      const result = positionSchema.safeParse({ x: 100 });
      expect(result.success).toBe(false);
    });

    it('should reject position with non-numeric x', () => {
      const result = positionSchema.safeParse({ x: 'invalid', y: 200 });
      expect(result.success).toBe(false);
    });

    it('should reject position with non-numeric y', () => {
      const result = positionSchema.safeParse({ x: 100, y: 'invalid' });
      expect(result.success).toBe(false);
    });
  });

  describe('validationStateSchema', () => {
    it('should validate valid validation state', () => {
      const result = validationStateSchema.safeParse({
        isValid: true,
        errors: [],
        affectedDescendants: [],
      });
      expect(result.success).toBe(true);
    });

    it('should validate validation state with errors', () => {
      const result = validationStateSchema.safeParse({
        isValid: false,
        errors: ['Error 1', 'Error 2'],
        affectedDescendants: [validUuid],
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid UUID in affectedDescendants', () => {
      const result = validationStateSchema.safeParse({
        isValid: false,
        errors: [],
        affectedDescendants: ['not-a-uuid'],
      });
      expect(result.success).toBe(false);
    });

    it('should reject missing isValid', () => {
      const result = validationStateSchema.safeParse({
        errors: [],
        affectedDescendants: [],
      });
      expect(result.success).toBe(false);
    });
  });

  describe('logicNodeBaseSchema', () => {
    const validNode = {
      id: validUuid,
      type: NodeType.Axiom,
      position: { x: 100, y: 200 },
      premises: [],
      conclusions: [validUuid],
      validationState: {
        isValid: true,
        errors: [],
        affectedDescendants: [],
      },
    };

    it('should validate complete valid node', () => {
      const result = logicNodeBaseSchema.safeParse(validNode);
      expect(result.success).toBe(true);
    });

    it('should validate node with annotation', () => {
      const result = logicNodeBaseSchema.safeParse({
        ...validNode,
        annotation: 'Test annotation',
      });
      expect(result.success).toBe(true);
    });

    it('should reject node with invalid UUID', () => {
      const result = logicNodeBaseSchema.safeParse({
        ...validNode,
        id: 'not-a-uuid',
      });
      expect(result.success).toBe(false);
    });

    it('should reject node with invalid type', () => {
      const result = logicNodeBaseSchema.safeParse({
        ...validNode,
        type: 'invalid-type',
      });
      expect(result.success).toBe(false);
    });

    it('should reject node with missing position', () => {
      const { position, ...rest } = validNode;
      const result = logicNodeBaseSchema.safeParse(rest);
      expect(result.success).toBe(false);
    });

    it('should reject node with invalid premises UUID', () => {
      const result = logicNodeBaseSchema.safeParse({
        ...validNode,
        premises: ['invalid-uuid'],
      });
      expect(result.success).toBe(false);
    });

    it('should reject node with invalid conclusions UUID', () => {
      const result = logicNodeBaseSchema.safeParse({
        ...validNode,
        conclusions: ['not-a-uuid'],
      });
      expect(result.success).toBe(false);
    });

    it('should accept empty premises and conclusions arrays', () => {
      const result = logicNodeBaseSchema.safeParse({
        ...validNode,
        premises: [],
        conclusions: [],
      });
      expect(result.success).toBe(true);
    });

    it('should accept multiple valid UUIDs in premises', () => {
      const result = logicNodeBaseSchema.safeParse({
        ...validNode,
        premises: ['550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002'],
      });
      expect(result.success).toBe(true);
    });
  });

  describe('axiomNodeSchema', () => {
    it('should validate axiom node', () => {
      const result = axiomNodeSchema.safeParse({
        id: validUuid,
        type: NodeType.Axiom,
        position: { x: 0, y: 0 },
        premises: [],
        conclusions: [validUuid],
        validationState: {
          isValid: true,
          errors: [],
          affectedDescendants: [],
        },
      });
      expect(result.success).toBe(true);
    });

    it('should reject axiom node with wrong type', () => {
      const result = axiomNodeSchema.safeParse({
        id: validUuid,
        type: NodeType.ModusPonens,
        position: { x: 0, y: 0 },
        premises: [],
        conclusions: [validUuid],
        validationState: {
          isValid: true,
          errors: [],
          affectedDescendants: [],
        },
      });
      expect(result.success).toBe(false);
    });
  });

  describe('modusPonensNodeSchema', () => {
    it('should validate modus ponens node', () => {
      const result = modusPonensNodeSchema.safeParse({
        id: validUuid,
        type: NodeType.ModusPonens,
        position: { x: 0, y: 0 },
        premises: ['550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002'],
        conclusions: [validUuid],
        validationState: {
          isValid: true,
          errors: [],
          affectedDescendants: [],
        },
      });
      expect(result.success).toBe(true);
    });

    it('should reject modus ponens node with wrong type', () => {
      const result = modusPonensNodeSchema.safeParse({
        id: validUuid,
        type: NodeType.Axiom,
        position: { x: 0, y: 0 },
        premises: [validUuid],
        conclusions: [validUuid],
        validationState: {
          isValid: true,
          errors: [],
          affectedDescendants: [],
        },
      });
      expect(result.success).toBe(false);
    });
  });

  describe('logicNodeSchema (discriminated union)', () => {
    it('should validate axiom node through discriminated union', () => {
      const result = logicNodeSchema.safeParse({
        id: validUuid,
        type: NodeType.Axiom,
        position: { x: 0, y: 0 },
        premises: [],
        conclusions: [validUuid],
        validationState: {
          isValid: true,
          errors: [],
          affectedDescendants: [],
        },
      });
      expect(result.success).toBe(true);
    });

    it('should validate modus ponens node through discriminated union', () => {
      const result = logicNodeSchema.safeParse({
        id: validUuid,
        type: NodeType.ModusPonens,
        position: { x: 0, y: 0 },
        premises: [validUuid, validUuid],
        conclusions: [validUuid],
        validationState: {
          isValid: true,
          errors: [],
          affectedDescendants: [],
        },
      });
      expect(result.success).toBe(true);
    });

    it('should validate all node types through discriminated union', () => {
      const nodeTypes = [
        NodeType.Axiom,
        NodeType.ModusPonens,
        NodeType.ModusTollens,
        NodeType.Syllogism,
        NodeType.Disjunction,
        NodeType.ReductioAdAbsurdum,
        NodeType.Induction,
        NodeType.SimpleAffirmation,
        NodeType.FreeForm,
      ];

      nodeTypes.forEach((type) => {
        const result = logicNodeSchema.safeParse({
          id: validUuid,
          type,
          position: { x: 0, y: 0 },
          premises: [],
          conclusions: [],
          validationState: {
            isValid: false,
            errors: [],
            affectedDescendants: [],
          },
        });
        expect(result.success).toBe(true);
      });
    });

    it('should reject node with invalid type', () => {
      const result = logicNodeSchema.safeParse({
        id: validUuid,
        type: 'invalid-type',
        position: { x: 0, y: 0 },
        premises: [],
        conclusions: [],
        validationState: {
          isValid: false,
          errors: [],
          affectedDescendants: [],
        },
      });
      expect(result.success).toBe(false);
    });
  });
});
