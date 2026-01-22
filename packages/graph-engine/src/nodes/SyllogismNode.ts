/**
 * SyllogismNode Implementation
 *
 * Represents a syllogistic argument with major premise, minor premise, and conclusion.
 * Classic example: "All humans are mortal, Socrates is human, therefore Socrates is mortal."
 */

import { LogicNode } from './LogicNode';
import { NodeType } from './types';

/**
 * SyllogismNode Class
 *
 * Implements syllogistic reasoning:
 * - Premise 1: Major premise (general rule, e.g., "All humans are mortal")
 * - Premise 2: Minor premise (specific case, e.g., "Socrates is human")
 * - Conclusion: Application (e.g., "Socrates is mortal")
 *
 * Validation ensures:
 * - Exactly 2 premises
 * - Exactly 1 conclusion
 *
 * Note: Logical validation (checking that the conclusion follows from premises)
 * will be implemented in later stories (Epic 3: Connection validation).
 *
 * @example
 * const syllogism = new SyllogismNode({
 *   id: 'node-1',
 *   position: { x: 100, y: 200 },
 *   premises: ['prop-major', 'prop-minor'], // Major and minor premises
 *   conclusions: ['prop-conclusion'], // Derived conclusion
 * });
 */
export class SyllogismNode extends LogicNode {
  constructor(data: {
    id: string;
    position: { x: number; y: number };
    premises?: string[];
    conclusions?: string[];
    annotation?: string;
  }) {
    super({
      ...data,
      type: NodeType.Syllogism,
    });
  }

  /**
   * Syllogism requires exactly 2 premises (major and minor)
   */
  getInputCount(): number {
    return 2;
  }

  /**
   * Syllogism produces exactly 1 conclusion
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
