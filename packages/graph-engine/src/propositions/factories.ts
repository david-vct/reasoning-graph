/**
 * Factory functions for creating propositions
 * Provides convenient helper functions with auto-generated IDs
 */
import { randomUUID } from 'crypto';
import { SimpleProposition } from './SimpleProposition';
import { ImplicationProposition } from './ImplicationProposition';
import { NegationProposition } from './NegationProposition';
import { DisjunctionProposition } from './DisjunctionProposition';
import { ConjunctionProposition } from './ConjunctionProposition';
import { Proposition } from './Proposition';

/**
 * Create a simple proposition with auto-generated UUID
 */
export function createSimple(content: string): SimpleProposition {
  return new SimpleProposition(randomUUID(), content);
}

/**
 * Create an implication proposition (P → Q) with auto-generated UUID
 */
export function createImplication(
  antecedent: Proposition,
  consequent: Proposition,
  content: string
): ImplicationProposition {
  return new ImplicationProposition(randomUUID(), content, antecedent, consequent);
}

/**
 * Create a negation proposition (¬P) with auto-generated UUID
 */
export function createNegation(negated: Proposition, content: string): NegationProposition {
  return new NegationProposition(randomUUID(), content, negated);
}

/**
 * Create a disjunction proposition (P ∨ Q) with auto-generated UUID
 */
export function createDisjunction(
  left: Proposition,
  right: Proposition,
  content: string
): DisjunctionProposition {
  return new DisjunctionProposition(randomUUID(), content, left, right);
}

/**
 * Create a conjunction proposition (P ∧ Q) with auto-generated UUID
 */
export function createConjunction(
  left: Proposition,
  right: Proposition,
  content: string
): ConjunctionProposition {
  return new ConjunctionProposition(randomUUID(), content, left, right);
}
