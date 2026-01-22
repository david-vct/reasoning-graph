/**
 * Conjunction Proposition (P ∧ Q)
 * Represents logical AND "P and Q"
 */
import { Proposition } from './Proposition';
import { PropositionType } from './types';

export class ConjunctionProposition extends Proposition {
  constructor(
    id: string,
    content: string,
    public left: Proposition,
    public right: Proposition
  ) {
    super(id, content, PropositionType.Conjunction);
  }

  validate(): boolean {
    return this.content.length > 0 && this.left.validate() && this.right.validate();
  }
}
