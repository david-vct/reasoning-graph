/**
 * Types for the Proposition System
 * Defines the fundamental types for logical propositions
 */

export enum PropositionType {
  Simple = 'simple',
  Implication = 'implication',
  Negation = 'negation',
  Disjunction = 'disjunction',
  Conjunction = 'conjunction',
}

export type AnyProposition =
  | import('./SimpleProposition').SimpleProposition
  | import('./ImplicationProposition').ImplicationProposition
  | import('./NegationProposition').NegationProposition
  | import('./DisjunctionProposition').DisjunctionProposition
  | import('./ConjunctionProposition').ConjunctionProposition;
