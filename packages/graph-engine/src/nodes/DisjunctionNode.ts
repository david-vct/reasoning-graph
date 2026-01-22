/**
 * DisjunctionNode Implementation
 *
 * Represents disjunctive syllogism: Given P∨Q and ¬P, conclude Q.
 * If one option is false, the other must be true.
 */

import { LogicNode } from './LogicNode';
import { NodeType } from './types';

/**
 * DisjunctionNode Class
 *
 * Implements disjunctive syllogism:
 * - Premise 1: P∨Q (disjunction - "P or Q is true")
 * - Premise 2: ¬P (negation - "P is false")
 * - Conclusion: Q (must be true)
 *
 * Validation ensures:
 * - Exactly 2 premises
 * - Exactly 1 conclusion
 *
 * Note: Logical validation (checking that Q follows from P∨Q and ¬P)
 * will be implemented in later stories (Epic 3: Connection validation).
 *
 * @example
 * const disjunction = new DisjunctionNode({
 *   id: 'node-1',
 *   position: { x: 100, y: 200 },
 *   premises: ['prop-disjunction', 'prop-negation'], // P∨Q, ¬P
 *   conclusions: ['prop-q'], // Q
 * });
 */
export class DisjunctionNode extends LogicNode {
  constructor(data: {
    id: string;
    position: { x: number; y: number };
    premises?: string[];
    conclusions?: string[];
    annotation?: string;
  }) {
    super({
      ...data,
      type: NodeType.Disjunction,
    });
  }

  /**
   * Disjunctive syllogism requires exactly 2 premises (P∨Q and ¬P)
   */
  getInputCount(): number {
    return 2;
  }

  /**
   * Disjunctive syllogism produces exactly 1 conclusion (Q)
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
