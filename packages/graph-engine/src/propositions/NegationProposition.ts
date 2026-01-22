/**
 * Negation Proposition (¬P)
 * Represents logical negation "not P"
 */
import { Proposition } from './Proposition';
import { PropositionType } from './types';

export class NegationProposition extends Proposition {
  constructor(
    id: string,
    content: string,
    public negated: Proposition
  ) {
    super(id, content, PropositionType.Negation);
  }

  validate(): boolean {
    return this.content.length > 0 && this.negated.validate();
  }
}
