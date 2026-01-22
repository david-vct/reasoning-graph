/**
 * ModusTollensNode Implementation
 *
 * Represents the Modus Tollens inference rule: Given P→Q and ¬Q, conclude ¬P.
 * This is the contrapositive form of Modus Ponens.
 */

import { LogicNode } from './LogicNode';
import { NodeType } from './types';

/**
 * ModusTollensNode Class
 *
 * Implements the Modus Tollens inference rule:
 * - Premise 1: P→Q (implication)
 * - Premise 2: ¬Q (negation of consequent)
 * - Conclusion: ¬P (negation of antecedent)
 *
 * Validation ensures:
 * - Exactly 2 premises
 * - Exactly 1 conclusion
 *
 * Note: Logical validation (checking that ¬Q and ¬P match the implication)
 * will be implemented in later stories (Epic 3: Connection validation).
 *
 * @example
 * const modusTollens = new ModusTollensNode({
 *   id: 'node-1',
 *   position: { x: 100, y: 200 },
 *   premises: ['prop-impl', 'prop-not-q'], // P→Q, ¬Q
 *   conclusions: ['prop-not-p'], // ¬P
 * });
 */
export class ModusTollensNode extends LogicNode {
  constructor(data: {
    id: string;
    position: { x: number; y: number };
    premises?: string[];
    conclusions?: string[];
    annotation?: string;
  }) {
    super({
      ...data,
      type: NodeType.ModusTollens,
    });
  }

  /**
   * Modus Tollens requires exactly 2 premises (P→Q and ¬Q)
   */
  getInputCount(): number {
    return 2;
  }

  /**
   * Modus Tollens produces exactly 1 conclusion (¬P)
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
