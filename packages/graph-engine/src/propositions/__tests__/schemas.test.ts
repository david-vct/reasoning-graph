/**
 * Tests for Zod schemas
 */
import { propositionSchema, simplePropositionSchema } from '../schemas';
import { z } from 'zod';

describe('Proposition Schemas', () => {
  describe('simplePropositionSchema', () => {
    it('should validate a valid simple proposition', () => {
      const validSimple = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        content: 'Socrates is a man',
        propType: 'simple' as const,
      };

      const result = simplePropositionSchema.safeParse(validSimple);
      expect(result.success).toBe(true);
    });

    it('should reject proposition with non-UUID id', () => {
      const invalid = {
        id: 'not-a-uuid',
        content: 'Content',
        propType: 'simple' as const,
      };

      const result = simplePropositionSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });

    it('should reject proposition with empty content', () => {
      const invalid = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        content: '',
        propType: 'simple' as const,
      };

      const result = simplePropositionSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });

    it('should reject proposition with wrong propType', () => {
      const invalid = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        content: 'Content',
        propType: 'implication' as const,
      };

      const result = simplePropositionSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe('propositionSchema - discriminated union', () => {
    it('should validate a simple proposition', () => {
      const simple = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        content: 'P',
        propType: 'simple' as const,
      };

      const result = propositionSchema.safeParse(simple);
      expect(result.success).toBe(true);
    });

    it('should validate an implication proposition', () => {
      const implication = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        content: 'If P then Q',
        propType: 'implication' as const,
        antecedent: {
          id: '123e4567-e89b-12d3-a456-426614174001',
          content: 'P',
          propType: 'simple' as const,
        },
        consequent: {
          id: '123e4567-e89b-12d3-a456-426614174002',
          content: 'Q',
          propType: 'simple' as const,
        },
      };

      const result = propositionSchema.safeParse(implication);
      expect(result.success).toBe(true);
    });

    it('should validate a negation proposition', () => {
      const negation = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        content: 'Not P',
        propType: 'negation' as const,
        negated: {
          id: '123e4567-e89b-12d3-a456-426614174001',
          content: 'P',
          propType: 'simple' as const,
        },
      };

      const result = propositionSchema.safeParse(negation);
      expect(result.success).toBe(true);
    });

    it('should validate a disjunction proposition', () => {
      const disjunction = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        content: 'P or Q',
        propType: 'disjunction' as const,
        left: {
          id: '123e4567-e89b-12d3-a456-426614174001',
          content: 'P',
          propType: 'simple' as const,
        },
        right: {
          id: '123e4567-e89b-12d3-a456-426614174002',
          content: 'Q',
          propType: 'simple' as const,
        },
      };

      const result = propositionSchema.safeParse(disjunction);
      expect(result.success).toBe(true);
    });

    it('should validate a conjunction proposition', () => {
      const conjunction = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        content: 'P and Q',
        propType: 'conjunction' as const,
        left: {
          id: '123e4567-e89b-12d3-a456-426614174001',
          content: 'P',
          propType: 'simple' as const,
        },
        right: {
          id: '123e4567-e89b-12d3-a456-426614174002',
          content: 'Q',
          propType: 'simple' as const,
        },
      };

      const result = propositionSchema.safeParse(conjunction);
      expect(result.success).toBe(true);
    });

    it('should validate nested complex propositions', () => {
      const nested = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        content: '(P → Q) ∧ R',
        propType: 'conjunction' as const,
        left: {
          id: '123e4567-e89b-12d3-a456-426614174001',
          content: 'P → Q',
          propType: 'implication' as const,
          antecedent: {
            id: '123e4567-e89b-12d3-a456-426614174002',
            content: 'P',
            propType: 'simple' as const,
          },
          consequent: {
            id: '123e4567-e89b-12d3-a456-426614174003',
            content: 'Q',
            propType: 'simple' as const,
          },
        },
        right: {
          id: '123e4567-e89b-12d3-a456-426614174004',
          content: 'R',
          propType: 'simple' as const,
        },
      };

      const result = propositionSchema.safeParse(nested);
      expect(result.success).toBe(true);
    });

    it('should reject implication missing antecedent', () => {
      const invalid = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        content: 'If P then Q',
        propType: 'implication' as const,
        consequent: {
          id: '123e4567-e89b-12d3-a456-426614174001',
          content: 'Q',
          propType: 'simple' as const,
        },
      };

      const result = propositionSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });

    it('should reject negation missing negated property', () => {
      const invalid = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        content: 'Not P',
        propType: 'negation' as const,
      };

      const result = propositionSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });

    it('should reject disjunction with invalid sub-proposition', () => {
      const invalid = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        content: 'P or Q',
        propType: 'disjunction' as const,
        left: {
          id: 'invalid-uuid',
          content: 'P',
          propType: 'simple' as const,
        },
        right: {
          id: '123e4567-e89b-12d3-a456-426614174002',
          content: 'Q',
          propType: 'simple' as const,
        },
      };

      const result = propositionSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe('Type inference', () => {
    it('should infer correct TypeScript types', () => {
      type SimpleProp = z.infer<typeof simplePropositionSchema>;

      const prop: SimpleProp = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        content: 'Test',
        propType: 'simple',
      };

      expect(prop.propType).toBe('simple');
    });
  });
});
