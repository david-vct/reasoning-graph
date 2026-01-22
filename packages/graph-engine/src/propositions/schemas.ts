/**
 * Zod schemas for proposition validation
 * Provides runtime type validation using discriminated unions
 */
import { z } from 'zod';

/**
 * Base schema for all propositions
 */
const basePropositionSchema = z.object({
  id: z.string().uuid(),
  content: z.string().min(1),
  propType: z.enum(['simple', 'implication', 'negation', 'disjunction', 'conjunction']),
});

/**
 * Schema for simple propositions
 */
export const simplePropositionSchema = z.object({
  id: z.string().uuid(),
  content: z.string().min(1),
  propType: z.literal('simple'),
});

/**
 * Define recursive type for nested propositions
 */
export type PropositionInput = z.infer<typeof basePropositionSchema> & {
  antecedent?: PropositionInput;
  consequent?: PropositionInput;
  left?: PropositionInput;
  right?: PropositionInput;
  negated?: PropositionInput;
};

/**
 * Recursive proposition schema using discriminated union
 * Supports nested complex propositions
 */
export const propositionSchema: z.ZodType<PropositionInput> = z.lazy(() =>
  z.discriminatedUnion('propType', [
    // Simple proposition
    z.object({
      id: z.string().uuid(),
      content: z.string().min(1),
      propType: z.literal('simple'),
    }),
    // Implication proposition (P → Q)
    z.object({
      id: z.string().uuid(),
      content: z.string().min(1),
      propType: z.literal('implication'),
      antecedent: propositionSchema,
      consequent: propositionSchema,
    }),
    // Negation proposition (¬P)
    z.object({
      id: z.string().uuid(),
      content: z.string().min(1),
      propType: z.literal('negation'),
      negated: propositionSchema,
    }),
    // Disjunction proposition (P ∨ Q)
    z.object({
      id: z.string().uuid(),
      content: z.string().min(1),
      propType: z.literal('disjunction'),
      left: propositionSchema,
      right: propositionSchema,
    }),
    // Conjunction proposition (P ∧ Q)
    z.object({
      id: z.string().uuid(),
      content: z.string().min(1),
      propType: z.literal('conjunction'),
      left: propositionSchema,
      right: propositionSchema,
    }),
  ])
);

/**
 * Type alias for the inferred proposition schema type
 */
export type PropositionSchema = z.infer<typeof propositionSchema>;
