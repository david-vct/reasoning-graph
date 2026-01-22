/**
 * Implication Proposition (P → Q)
 * Represents "if P then Q" logical structure
 */
import { Proposition } from './Proposition';
import { PropositionType } from './types';

export class ImplicationProposition extends Proposition {
  constructor(
    id: string,
    content: string,
    public antecedent: Proposition,
    public consequent: Proposition
  ) {
    super(id, content, PropositionType.Implication);
  }

  validate(): boolean {
    return this.content.length > 0 && this.antecedent.validate() && this.consequent.validate();
  }
}
