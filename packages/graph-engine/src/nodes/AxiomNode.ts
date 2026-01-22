/**
 * AxiomNode Implementation
 *
 * Represents a logical axiom - a foundational truth that requires no premises.
 * Axioms are the starting points of logical reasoning and are always valid.
 */

import { LogicNode } from './LogicNode';
import { NodeType } from './types';

/**
 * AxiomNode Class
 *
 * An axiom is a self-evident truth that serves as a starting point for reasoning.
 * It has:
 * - 0 premises (no inputs required)
 * - 1 conclusion (produces one proposition)
 * - Always valid (no logical validation needed)
 *
 * @example
 * const axiom = new AxiomNode({
 *   id: 'node-1',
 *   position: { x: 100, y: 200 },
 *   conclusions: ['prop-1'], // "All humans are mortal"
 * });
 */
export class AxiomNode extends LogicNode {
  constructor(data: {
    id: string;
    position: { x: number; y: number };
    premises?: string[];
    conclusions?: string[];
    annotation?: string;
  }) {
    super({
      ...data,
      type: NodeType.Axiom,
    });
  }

  /**
   * Axioms require no premises
   */
  getInputCount(): number {
    return 0;
  }

  /**
   * Axioms produce exactly one conclusion
   */
  getOutputCount(): number {
    return 1;
  }

  /**
   * Axioms are always logically valid
   * Only structural validation is performed (0 premises, 1 conclusion)
   */
  validate(): boolean {
    // Use parent's structural validation
    const isStructurallyValid = super.validate();

    // Axioms are always logically valid if structurally correct
    if (isStructurallyValid) {
      this.validationState.isValid = true;
      this.validationState.errors = [];
    }

    return isStructurallyValid;
  }
}
