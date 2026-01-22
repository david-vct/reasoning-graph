/**
 * SimpleAffirmationNode Implementation
 *
 * Represents a simple pass-through node: Given P, conclude P.
 * This is useful for explicitly affirming a proposition or as a connector.
 */

import { LogicNode } from './LogicNode';
import { NodeType } from './types';

/**
 * SimpleAffirmationNode Class
 *
 * Implements a simple affirmation/pass-through:
 * - Premise: P (any proposition)
 * - Conclusion: P (same proposition, affirmed)
 *
 * Validation ensures:
 * - Exactly 1 premise
 * - Exactly 1 conclusion
 *
 * Use cases:
 * - Explicitly affirming a proposition
 * - Connecting different parts of a graph
 * - Adding annotations to a proposition
 *
 * @example
 * const affirmation = new SimpleAffirmationNode({
 *   id: 'node-1',
 *   position: { x: 100, y: 200 },
 *   premises: ['prop-p'], // P
 *   conclusions: ['prop-p-affirmed'], // P (affirmed)
 *   annotation: 'We accept this as true',
 * });
 */
export class SimpleAffirmationNode extends LogicNode {
  constructor(data: {
    id: string;
    position: { x: number; y: number };
    premises?: string[];
    conclusions?: string[];
    annotation?: string;
  }) {
    super({
      ...data,
      type: NodeType.SimpleAffirmation,
    });
  }

  /**
   * SimpleAffirmation requires exactly 1 premise
   */
  getInputCount(): number {
    return 1;
  }

  /**
   * SimpleAffirmation produces exactly 1 conclusion
   */
  getOutputCount(): number {
    return 1;
  }

  /**
   * Validates structural correctness (1 premise, 1 conclusion)
   */
  validate(): boolean {
    return super.validate();
  }
}
