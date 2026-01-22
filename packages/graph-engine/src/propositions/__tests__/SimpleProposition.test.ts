/**
 * Tests for SimpleProposition class
 */
import { SimpleProposition } from '../SimpleProposition';
import { PropositionType } from '../types';

describe('SimpleProposition', () => {
  describe('constructor', () => {
    it('should create a simple proposition with given id and content', () => {
      const id = 'test-id-123';
      const content = 'Socrates is a man';
      const prop = new SimpleProposition(id, content);

      expect(prop.id).toBe(id);
      expect(prop.content).toBe(content);
      expect(prop.propType).toBe(PropositionType.Simple);
    });

    it('should set propType to simple', () => {
      const prop = new SimpleProposition('id', 'content');
      expect(prop.propType).toBe('simple');
    });
  });

  describe('validate', () => {
    it('should return true for non-empty content', () => {
      const prop = new SimpleProposition('id', 'It is raining');
      expect(prop.validate()).toBe(true);
    });

    it('should return false for empty content', () => {
      const prop = new SimpleProposition('id', '');
      expect(prop.validate()).toBe(false);
    });

    it('should return true for content with only whitespace', () => {
      const prop = new SimpleProposition('id', '   ');
      expect(prop.validate()).toBe(true);
    });
  });
});
