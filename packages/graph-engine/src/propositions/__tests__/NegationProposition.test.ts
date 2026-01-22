/**
 * Tests for NegationProposition class
 */
import { NegationProposition } from '../NegationProposition';
import { SimpleProposition } from '../SimpleProposition';
import { PropositionType } from '../types';

describe('NegationProposition', () => {
  let negatedProp: SimpleProposition;

  beforeEach(() => {
    negatedProp = new SimpleProposition('p1', 'It is raining');
  });

  describe('constructor', () => {
    it('should create a negation proposition with negated proposition', () => {
      const id = 'neg-1';
      const content = 'It is not raining';
      const neg = new NegationProposition(id, content, negatedProp);

      expect(neg.id).toBe(id);
      expect(neg.content).toBe(content);
      expect(neg.propType).toBe(PropositionType.Negation);
      expect(neg.negated).toBe(negatedProp);
    });

    it('should set propType to negation', () => {
      const neg = new NegationProposition('id', 'content', negatedProp);
      expect(neg.propType).toBe('negation');
    });
  });

  describe('validate', () => {
    it('should return true when negated proposition is valid', () => {
      const neg = new NegationProposition('id', 'Not P', negatedProp);
      expect(neg.validate()).toBe(true);
    });

    it('should return false when content is empty', () => {
      const neg = new NegationProposition('id', '', negatedProp);
      expect(neg.validate()).toBe(false);
    });

    it('should return false when negated proposition is invalid', () => {
      const invalidProp = new SimpleProposition('p1', '');
      const neg = new NegationProposition('id', 'content', invalidProp);
      expect(neg.validate()).toBe(false);
    });

    it('should validate recursively with nested negations', () => {
      const innerNeg = new NegationProposition('inner', 'Not A', new SimpleProposition('a', 'A'));
      const outerNeg = new NegationProposition('outer', 'Not (Not A)', innerNeg);
      expect(outerNeg.validate()).toBe(true);
    });
  });
});
