/**
 * Tests for ConjunctionProposition class
 */
import { ConjunctionProposition } from '../ConjunctionProposition';
import { SimpleProposition } from '../SimpleProposition';
import { PropositionType } from '../types';

describe('ConjunctionProposition', () => {
  let leftProp: SimpleProposition;
  let rightProp: SimpleProposition;

  beforeEach(() => {
    leftProp = new SimpleProposition('p1', 'It is raining');
    rightProp = new SimpleProposition('p2', 'It is cold');
  });

  describe('constructor', () => {
    it('should create a conjunction proposition with left and right propositions', () => {
      const id = 'conj-1';
      const content = 'It is raining and it is cold';
      const conj = new ConjunctionProposition(id, content, leftProp, rightProp);

      expect(conj.id).toBe(id);
      expect(conj.content).toBe(content);
      expect(conj.propType).toBe(PropositionType.Conjunction);
      expect(conj.left).toBe(leftProp);
      expect(conj.right).toBe(rightProp);
    });

    it('should set propType to conjunction', () => {
      const conj = new ConjunctionProposition('id', 'content', leftProp, rightProp);
      expect(conj.propType).toBe('conjunction');
    });
  });

  describe('validate', () => {
    it('should return true when all parts are valid', () => {
      const conj = new ConjunctionProposition('id', 'P and Q', leftProp, rightProp);
      expect(conj.validate()).toBe(true);
    });

    it('should return false when content is empty', () => {
      const conj = new ConjunctionProposition('id', '', leftProp, rightProp);
      expect(conj.validate()).toBe(false);
    });

    it('should return false when left proposition is invalid', () => {
      const invalidLeft = new SimpleProposition('p1', '');
      const conj = new ConjunctionProposition('id', 'content', invalidLeft, rightProp);
      expect(conj.validate()).toBe(false);
    });

    it('should return false when right proposition is invalid', () => {
      const invalidRight = new SimpleProposition('p2', '');
      const conj = new ConjunctionProposition('id', 'content', leftProp, invalidRight);
      expect(conj.validate()).toBe(false);
    });

    it('should validate recursively with nested conjunctions', () => {
      const innerConj = new ConjunctionProposition(
        'inner',
        'A and B',
        new SimpleProposition('a', 'A'),
        new SimpleProposition('b', 'B')
      );
      const outerConj = new ConjunctionProposition(
        'outer',
        '(A∧B) and C',
        innerConj,
        new SimpleProposition('c', 'C')
      );
      expect(outerConj.validate()).toBe(true);
    });
  });
});
