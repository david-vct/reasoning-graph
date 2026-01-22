/**
 * Tests for ImplicationProposition class
 */
import { ImplicationProposition } from '../ImplicationProposition';
import { SimpleProposition } from '../SimpleProposition';
import { PropositionType } from '../types';

describe('ImplicationProposition', () => {
  let antecedent: SimpleProposition;
  let consequent: SimpleProposition;

  beforeEach(() => {
    antecedent = new SimpleProposition('p1', 'It is raining');
    consequent = new SimpleProposition('p2', 'The ground is wet');
  });

  describe('constructor', () => {
    it('should create an implication proposition with antecedent and consequent', () => {
      const id = 'impl-1';
      const content = 'If it is raining, then the ground is wet';
      const impl = new ImplicationProposition(id, content, antecedent, consequent);

      expect(impl.id).toBe(id);
      expect(impl.content).toBe(content);
      expect(impl.propType).toBe(PropositionType.Implication);
      expect(impl.antecedent).toBe(antecedent);
      expect(impl.consequent).toBe(consequent);
    });

    it('should set propType to implication', () => {
      const impl = new ImplicationProposition('id', 'content', antecedent, consequent);
      expect(impl.propType).toBe('implication');
    });
  });

  describe('validate', () => {
    it('should return true when all parts are valid', () => {
      const impl = new ImplicationProposition('id', 'If P then Q', antecedent, consequent);
      expect(impl.validate()).toBe(true);
    });

    it('should return false when content is empty', () => {
      const impl = new ImplicationProposition('id', '', antecedent, consequent);
      expect(impl.validate()).toBe(false);
    });

    it('should return false when antecedent is invalid', () => {
      const invalidAntecedent = new SimpleProposition('p1', '');
      const impl = new ImplicationProposition('id', 'content', invalidAntecedent, consequent);
      expect(impl.validate()).toBe(false);
    });

    it('should return false when consequent is invalid', () => {
      const invalidConsequent = new SimpleProposition('p2', '');
      const impl = new ImplicationProposition('id', 'content', antecedent, invalidConsequent);
      expect(impl.validate()).toBe(false);
    });

    it('should validate recursively with nested implications', () => {
      const innerImpl = new ImplicationProposition(
        'inner',
        'If A then B',
        new SimpleProposition('a', 'A'),
        new SimpleProposition('b', 'B')
      );
      const outerImpl = new ImplicationProposition(
        'outer',
        'If (A→B) then C',
        innerImpl,
        new SimpleProposition('c', 'C')
      );
      expect(outerImpl.validate()).toBe(true);
    });
  });
});
