/**
 * Simple (Atomic) Proposition
 * Represents an atomic logical statement with no sub-propositions
 */
import { Proposition } from './Proposition';
import { PropositionType } from './types';

export class SimpleProposition extends Proposition {
  constructor(id: string, content: string) {
    super(id, content, PropositionType.Simple);
  }

  validate(): boolean {
    return this.content.length > 0;
  }
}
