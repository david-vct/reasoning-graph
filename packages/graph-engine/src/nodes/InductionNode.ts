/**
 * InductionNode Implementation
 *
 * Represents mathematical induction: Prove base case and inductive step to prove for all n.
 */

import { LogicNode } from './LogicNode';
import { NodeType } from './types';

/**
 * InductionNode Class
 *
 * Implements mathematical induction:
 * - Premise 1: P(0) (base case - property holds for n=0)
 * - Premise 2: ∀n P(n)→P(n+1) (inductive step - if true for n, true for n+1)
 * - Conclusion: ∀n P(n) (property holds for all natural numbers)
 *
 * Validation ensures:
 * - Exactly 2 premises
 * - Exactly 1 conclusion
 *
 * Note: Logical validation (checking that the induction is properly formed)
 * will be implemented in later stories (Epic 3: Connection validation).
 *
 * @example
 * const induction = new InductionNode({
 *   id: 'node-1',
 *   position: { x: 100, y: 200 },
 *   premises: ['prop-base', 'prop-inductive'], // P(0), ∀n P(n)→P(n+1)
 *   conclusions: ['prop-forall'], // ∀n P(n)
 * });
 */
export class InductionNode extends LogicNode {
  constructor(data: {
    id: string;
    position: { x: number; y: number };
    premises?: string[];
    conclusions?: string[];
    annotation?: string;
  }) {
    super({
      ...data,
      type: NodeType.Induction,
    });
  }

  /**
   * Induction requires exactly 2 premises (base case and inductive step)
   */
  getInputCount(): number {
    return 2;
  }

  /**
   * Induction produces exactly 1 conclusion (∀n P(n))
   */
  getOutputCount(): number {
    return 1;
  }

  /**
   * Validates structural correctness (2 premises, 1 conclusion)
   * Logical validation will be added in Epic 3
   */
  validate(): boolean {
    return super.validate();
  }
}
