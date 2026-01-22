/**
 * ModusPonensNode Implementation
 *
 * Represents the Modus Ponens inference rule: Given P→Q and P, conclude Q.
 * This is one of the most fundamental rules in propositional logic.
 */

import { LogicNode } from './LogicNode';
import { NodeType } from './types';

/**
 * ModusPonensNode Class
 *
 * Implements the Modus Ponens inference rule:
 * - Premise 1: P→Q (implication)
 * - Premise 2: P (antecedent)
 * - Conclusion: Q (consequent)
 *
 * Validation ensures:
 * - Exactly 2 premises
 * - Exactly 1 conclusion
 *
 * Note: Logical validation (checking that P and Q actually match the implication)
 * will be implemented in later stories (Epic 3: Connection validation).
 *
 * @example
 * const modusPonens = new ModusPonensNode({
 *   id: 'node-1',
 *   position: { x: 100, y: 200 },
 *   premises: ['prop-impl', 'prop-p'], // P→Q, P
 *   conclusions: ['prop-q'], // Q
 * });
 */
export class ModusPonensNode extends LogicNode {
  constructor(data: {
    id: string;
    position: { x: number; y: number };
    premises?: string[];
    conclusions?: string[];
    annotation?: string;
  }) {
    super({
      ...data,
      type: NodeType.ModusPonens,
    });
  }

  /**
   * Modus Ponens requires exactly 2 premises (P→Q and P)
   */
  getInputCount(): number {
    return 2;
  }

  /**
   * Modus Ponens produces exactly 1 conclusion (Q)
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
