/**
 * Tests for public API exports
 */
import * as PropositionAPI from '../index';

describe('Proposition API exports', () => {
  it('should export all proposition classes', () => {
    expect(PropositionAPI.Proposition).toBeDefined();
    expect(PropositionAPI.SimpleProposition).toBeDefined();
    expect(PropositionAPI.ImplicationProposition).toBeDefined();
    expect(PropositionAPI.NegationProposition).toBeDefined();
    expect(PropositionAPI.DisjunctionProposition).toBeDefined();
    expect(PropositionAPI.ConjunctionProposition).toBeDefined();
  });

  it('should export PropositionType enum', () => {
    expect(PropositionAPI.PropositionType).toBeDefined();
    expect(PropositionAPI.PropositionType.Simple).toBe('simple');
    expect(PropositionAPI.PropositionType.Implication).toBe('implication');
    expect(PropositionAPI.PropositionType.Negation).toBe('negation');
    expect(PropositionAPI.PropositionType.Disjunction).toBe('disjunction');
    expect(PropositionAPI.PropositionType.Conjunction).toBe('conjunction');
  });

  it('should export Zod schemas', () => {
    expect(PropositionAPI.propositionSchema).toBeDefined();
    expect(PropositionAPI.simplePropositionSchema).toBeDefined();
  });

  it('should export factory functions', () => {
    expect(PropositionAPI.createSimple).toBeDefined();
    expect(PropositionAPI.createImplication).toBeDefined();
    expect(PropositionAPI.createNegation).toBeDefined();
    expect(PropositionAPI.createDisjunction).toBeDefined();
    expect(PropositionAPI.createConjunction).toBeDefined();
  });
});
