/**
 * Tests for DisjunctionProposition class
 */
import { DisjunctionProposition } from '../DisjunctionProposition';
import { SimpleProposition } from '../SimpleProposition';
import { PropositionType } from '../types';

describe('DisjunctionProposition', () => {
  let leftProp: SimpleProposition;
  let rightProp: SimpleProposition;

  beforeEach(() => {
    leftProp = new SimpleProposition('p1', 'It is raining');
    rightProp = new SimpleProposition('p2', 'It is snowing');
  });

  describe('constructor', () => {
    it('should create a disjunction proposition with left and right propositions', () => {
      const id = 'disj-1';
      const content = 'It is raining or it is snowing';
      const disj = new DisjunctionProposition(id, content, leftProp, rightProp);

      expect(disj.id).toBe(id);
      expect(disj.content).toBe(content);
      expect(disj.propType).toBe(PropositionType.Disjunction);
      expect(disj.left).toBe(leftProp);
      expect(disj.right).toBe(rightProp);
    });

    it('should set propType to disjunction', () => {
      const disj = new DisjunctionProposition('id', 'content', leftProp, rightProp);
      expect(disj.propType).toBe('disjunction');
    });
  });

  describe('validate', () => {
    it('should return true when all parts are valid', () => {
      const disj = new DisjunctionProposition('id', 'P or Q', leftProp, rightProp);
      expect(disj.validate()).toBe(true);
    });

    it('should return false when content is empty', () => {
      const disj = new DisjunctionProposition('id', '', leftProp, rightProp);
      expect(disj.validate()).toBe(false);
    });

    it('should return false when left proposition is invalid', () => {
      const invalidLeft = new SimpleProposition('p1', '');
      const disj = new DisjunctionProposition('id', 'content', invalidLeft, rightProp);
      expect(disj.validate()).toBe(false);
    });

    it('should return false when right proposition is invalid', () => {
      const invalidRight = new SimpleProposition('p2', '');
      const disj = new DisjunctionProposition('id', 'content', leftProp, invalidRight);
      expect(disj.validate()).toBe(false);
    });

    it('should validate recursively with nested disjunctions', () => {
      const innerDisj = new DisjunctionProposition(
        'inner',
        'A or B',
        new SimpleProposition('a', 'A'),
        new SimpleProposition('b', 'B')
      );
      const outerDisj = new DisjunctionProposition(
        'outer',
        '(A∨B) or C',
        innerDisj,
        new SimpleProposition('c', 'C')
      );
      expect(outerDisj.validate()).toBe(true);
    });
  });
});
