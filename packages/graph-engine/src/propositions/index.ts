/**
 * Public API for the Proposition System
 * Exports all proposition classes, types, schemas, and factory functions
 */

// Base class
export { Proposition } from './Proposition';

// Concrete proposition classes
export { SimpleProposition } from './SimpleProposition';
export { ImplicationProposition } from './ImplicationProposition';
export { NegationProposition } from './NegationProposition';
export { DisjunctionProposition } from './DisjunctionProposition';
export { ConjunctionProposition } from './ConjunctionProposition';

// Types
export { PropositionType, type AnyProposition } from './types';

// Zod schemas
export {
  propositionSchema,
  simplePropositionSchema,
  type PropositionInput,
  type PropositionSchema,
} from './schemas';

// Factory functions
export {
  createSimple,
  createImplication,
  createNegation,
  createDisjunction,
  createConjunction,
} from './factories';
