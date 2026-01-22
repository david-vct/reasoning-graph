/**
 * Zod Schemas for Logic Nodes
 *
 * Provides runtime validation for node data structures
 */

import { z } from 'zod';
import { NodeType } from './types';

/**
 * Schema for node position
 */
export const positionSchema = z.object({
  x: z.number(),
  y: z.number(),
});

/**
 * Schema for validation state
 */
export const validationStateSchema = z.object({
  isValid: z.boolean(),
  errors: z.array(z.string()),
  affectedDescendants: z.array(z.string().uuid()),
});

/**
 * Base schema for all logic nodes
 */
export const logicNodeBaseSchema = z.object({
  id: z.string().uuid(),
  type: z.nativeEnum(NodeType),
  position: positionSchema,
  premises: z.array(z.string().uuid()),
  conclusions: z.array(z.string().uuid()),
  annotation: z.string().optional(),
  validationState: validationStateSchema,
});

/**
 * Schema for Axiom nodes
 */
export const axiomNodeSchema = logicNodeBaseSchema.extend({
  type: z.literal(NodeType.Axiom),
});

/**
 * Schema for Modus Ponens nodes
 */
export const modusPonensNodeSchema = logicNodeBaseSchema.extend({
  type: z.literal(NodeType.ModusPonens),
});

/**
 * Schema for Modus Tollens nodes
 */
export const modusTollensNodeSchema = logicNodeBaseSchema.extend({
  type: z.literal(NodeType.ModusTollens),
});

/**
 * Schema for Syllogism nodes
 */
export const syllogismNodeSchema = logicNodeBaseSchema.extend({
  type: z.literal(NodeType.Syllogism),
});

/**
 * Schema for Disjunction nodes
 */
export const disjunctionNodeSchema = logicNodeBaseSchema.extend({
  type: z.literal(NodeType.Disjunction),
});

/**
 * Schema for Reductio Ad Absurdum nodes
 */
export const reductioAdAbsurdumNodeSchema = logicNodeBaseSchema.extend({
  type: z.literal(NodeType.ReductioAdAbsurdum),
});

/**
 * Schema for Induction nodes
 */
export const inductionNodeSchema = logicNodeBaseSchema.extend({
  type: z.literal(NodeType.Induction),
});

/**
 * Schema for Simple Affirmation nodes
 */
export const simpleAffirmationNodeSchema = logicNodeBaseSchema.extend({
  type: z.literal(NodeType.SimpleAffirmation),
});

/**
 * Schema for Free Form nodes
 */
export const freeFormNodeSchema = logicNodeBaseSchema.extend({
  type: z.literal(NodeType.FreeForm),
});

/**
 * Discriminated union schema for all logic node types
 */
export const logicNodeSchema = z.discriminatedUnion('type', [
  axiomNodeSchema,
  modusPonensNodeSchema,
  modusTollensNodeSchema,
  syllogismNodeSchema,
  disjunctionNodeSchema,
  reductioAdAbsurdumNodeSchema,
  inductionNodeSchema,
  simpleAffirmationNodeSchema,
  freeFormNodeSchema,
]);

/**
 * Type inference from base schema
 */
export type LogicNodeInput = z.infer<typeof logicNodeBaseSchema>;

/**
 * Type inference from discriminated union
 */
export type ValidatedLogicNode = z.infer<typeof logicNodeSchema>;
