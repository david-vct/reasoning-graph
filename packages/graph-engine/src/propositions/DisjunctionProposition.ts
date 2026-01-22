/**
 * Disjunction Proposition (P ∨ Q)
 * Represents logical OR "P or Q"
 */
import { Proposition } from './Proposition';
import { PropositionType } from './types';

export class DisjunctionProposition extends Proposition {
  constructor(
    id: string,
    content: string,
    public left: Proposition,
    public right: Proposition
  ) {
    super(id, content, PropositionType.Disjunction);
  }

  validate(): boolean {
    return this.content.length > 0 && this.left.validate() && this.right.validate();
  }
}
