/**
 * Tests for factory functions
 */
import {
  createSimple,
  createImplication,
  createNegation,
  createDisjunction,
  createConjunction,
} from '../factories';
import { SimpleProposition } from '../SimpleProposition';
import { ImplicationProposition } from '../ImplicationProposition';
import { NegationProposition } from '../NegationProposition';
import { DisjunctionProposition } from '../DisjunctionProposition';
import { ConjunctionProposition } from '../ConjunctionProposition';
import { PropositionType } from '../types';

describe('Factory Functions', () => {
  describe('createSimple', () => {
    it('should create a SimpleProposition with auto-generated UUID', () => {
      const prop = createSimple('Test content');

      expect(prop).toBeInstanceOf(SimpleProposition);
      expect(prop.content).toBe('Test content');
      expect(prop.propType).toBe(PropositionType.Simple);
      expect(prop.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    });

    it('should generate unique IDs for different propositions', () => {
      const prop1 = createSimple('First');
      const prop2 = createSimple('Second');

      expect(prop1.id).not.toBe(prop2.id);
    });
  });

  describe('createImplication', () => {
    it('should create an ImplicationProposition with auto-generated UUID', () => {
      const antecedent = createSimple('P');
      const consequent = createSimple('Q');
      const impl = createImplication(antecedent, consequent, 'If P then Q');

      expect(impl).toBeInstanceOf(ImplicationProposition);
      expect(impl.content).toBe('If P then Q');
      expect(impl.propType).toBe(PropositionType.Implication);
      expect(impl.antecedent).toBe(antecedent);
      expect(impl.consequent).toBe(consequent);
      expect(impl.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    });
  });

  describe('createNegation', () => {
    it('should create a NegationProposition with auto-generated UUID', () => {
      const negated = createSimple('P');
      const neg = createNegation(negated, 'Not P');

      expect(neg).toBeInstanceOf(NegationProposition);
      expect(neg.content).toBe('Not P');
      expect(neg.propType).toBe(PropositionType.Negation);
      expect(neg.negated).toBe(negated);
      expect(neg.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    });
  });

  describe('createDisjunction', () => {
    it('should create a DisjunctionProposition with auto-generated UUID', () => {
      const left = createSimple('P');
      const right = createSimple('Q');
      const disj = createDisjunction(left, right, 'P or Q');

      expect(disj).toBeInstanceOf(DisjunctionProposition);
      expect(disj.content).toBe('P or Q');
      expect(disj.propType).toBe(PropositionType.Disjunction);
      expect(disj.left).toBe(left);
      expect(disj.right).toBe(right);
      expect(disj.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    });
  });

  describe('createConjunction', () => {
    it('should create a ConjunctionProposition with auto-generated UUID', () => {
      const left = createSimple('P');
      const right = createSimple('Q');
      const conj = createConjunction(left, right, 'P and Q');

      expect(conj).toBeInstanceOf(ConjunctionProposition);
      expect(conj.content).toBe('P and Q');
      expect(conj.propType).toBe(PropositionType.Conjunction);
      expect(conj.left).toBe(left);
      expect(conj.right).toBe(right);
      expect(conj.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    });
  });

  describe('Complex compositions', () => {
    it('should create nested complex propositions', () => {
      const p = createSimple('It is raining');
      const q = createSimple('The ground is wet');
      const r = createSimple('The streets are slippery');

      // (P → Q) ∧ R
      const implication = createImplication(p, q, 'If it rains, the ground is wet');
      const conjunction = createConjunction(
        implication,
        r,
        'If it rains the ground is wet, and the streets are slippery'
      );

      expect(conjunction.validate()).toBe(true);
      expect(conjunction.left).toBe(implication);
      expect(conjunction.right).toBe(r);
    });
  });
});
