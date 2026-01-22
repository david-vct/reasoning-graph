/**
 * ReductioAdAbsurdumNode Implementation
 *
 * Represents proof by contradiction: If assuming P leads to absurdity (⊥), then ¬P is true.
 */

import { LogicNode } from './LogicNode';
import { NodeType } from './types';

/**
 * ReductioAdAbsurdumNode Class
 *
 * Implements proof by contradiction (reductio ad absurdum):
 * - Premise: P→⊥ (assuming P leads to contradiction)
 * - ⊥ (bottom) represents logical contradiction/absurdity
 * - Conclusion: ¬P (P must be false)
 *
 * Validation ensures:
 * - Exactly 1 premise
 * - Exactly 1 conclusion
 *
 * Note: Logical validation (checking that the contradiction is valid)
 * will be implemented in later stories (Epic 3: Connection validation).
 *
 * @example
 * const reductio = new ReductioAdAbsurdumNode({
 *   id: 'node-1',
 *   position: { x: 100, y: 200 },
 *   premises: ['prop-contradiction'], // P→⊥
 *   conclusions: ['prop-negation'], // ¬P
 * });
 */
export class ReductioAdAbsurdumNode extends LogicNode {
  constructor(data: {
    id: string;
    position: { x: number; y: number };
    premises?: string[];
    conclusions?: string[];
    annotation?: string;
  }) {
    super({
      ...data,
      type: NodeType.ReductioAdAbsurdum,
    });
  }

  /**
   * Reductio ad absurdum requires exactly 1 premise (P→⊥)
   */
  getInputCount(): number {
    return 1;
  }

  /**
   * Reductio ad absurdum produces exactly 1 conclusion (¬P)
   */
  getOutputCount(): number {
    return 1;
  }

  /**
   * Validates structural correctness (1 premise, 1 conclusion)
   * Logical validation will be added in Epic 3
   */
  validate(): boolean {
    return super.validate();
  }
}
