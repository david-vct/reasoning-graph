/**
 * FreeFormNode Implementation
 *
 * Represents a flexible node with dynamic premises and conclusions for custom reasoning patterns.
 */

import { LogicNode } from './LogicNode';
import { NodeType } from './types';

/**
 * FreeFormNode constraints
 */
export const FREEFORM_CONSTRAINTS = {
  MIN_PREMISES: 0,
  MAX_PREMISES: 5, // Limit to prevent UI clutter and performance issues
  MIN_CONCLUSIONS: 1, // At least one conclusion required for logical meaning
  MAX_CONCLUSIONS: 3, // Limit for UI display clarity
};

/**
 * FreeFormNode Class
 *
 * Implements a flexible node with dynamic premises and conclusions:
 * - Premises: 0-5 (dynamic)
 * - Conclusions: 1-3 (dynamic)
 * - Validation: Always returns true (no logical enforcement)
 *
 * This node type is for custom reasoning patterns not covered by formal logic types.
 *
 * Constraints:
 * - Max 5 premises to prevent graph complexity
 * - Min 1 conclusion required
 * - Max 3 conclusions for UI clarity
 *
 * @example
 * const freeForm = new FreeFormNode({
 *   id: 'node-1',
 *   position: { x: 100, y: 200 },
 *   premises: ['prop-1', 'prop-2'],
 *   conclusions: ['prop-conclusion'],
 * });
 * freeForm.addPremise('prop-3');
 * freeForm.removeConclusion('prop-conclusion');
 * freeForm.addConclusion('prop-new-conclusion');
 */
export class FreeFormNode extends LogicNode {
  constructor(data: {
    id: string;
    position: { x: number; y: number };
    premises?: string[];
    conclusions?: string[];
    annotation?: string;
  }) {
    super({
      ...data,
      type: NodeType.FreeForm,
    });
  }

  /**
   * FreeForm nodes have dynamic input count (0-5)
   * Returns -1 to indicate dynamic count
   */
  getInputCount(): number {
    return -1; // Dynamic
  }

  /**
   * FreeForm nodes have dynamic output count (1-3)
   * Returns -1 to indicate dynamic count
   */
  getOutputCount(): number {
    return -1; // Dynamic
  }

  /**
   * Custom validation for FreeForm nodes
   * Validates premise and conclusion constraints
   */
  validate(): boolean {
    this.validationState.errors = [];

    // Check premises count
    if (this.premises.length > FREEFORM_CONSTRAINTS.MAX_PREMISES) {
      this.validationState.errors.push(
        `Maximum ${FREEFORM_CONSTRAINTS.MAX_PREMISES} premises allowed, got ${this.premises.length}`
      );
    }

    // Check conclusions count
    if (this.conclusions.length < FREEFORM_CONSTRAINTS.MIN_CONCLUSIONS) {
      this.validationState.errors.push(
        `Minimum ${FREEFORM_CONSTRAINTS.MIN_CONCLUSIONS} conclusion(s) required, got ${this.conclusions.length}`
      );
    }

    if (this.conclusions.length > FREEFORM_CONSTRAINTS.MAX_CONCLUSIONS) {
      this.validationState.errors.push(
        `Maximum ${FREEFORM_CONSTRAINTS.MAX_CONCLUSIONS} conclusions allowed, got ${this.conclusions.length}`
      );
    }

    // Update validation state
    const isValid = this.validationState.errors.length === 0;
    this.validationState.isValid = isValid;
    return isValid;
  }

  /**
   * Add a premise to the node
   * @param propositionId - ID of the proposition to add
   * @throws Error if maximum premises count exceeded
   */
  addPremise(propositionId: string): void {
    if (this.premises.length >= FREEFORM_CONSTRAINTS.MAX_PREMISES) {
      throw new Error(
        `Cannot add premise: maximum ${FREEFORM_CONSTRAINTS.MAX_PREMISES} premises allowed`
      );
    }
    this.premises.push(propositionId);
  }

  /**
   * Remove a premise from the node
   * @param propositionId - ID of the proposition to remove
   * @returns true if premise was removed, false if not found
   */
  removePremise(propositionId: string): boolean {
    const index = this.premises.indexOf(propositionId);
    if (index === -1) {
      return false;
    }
    this.premises.splice(index, 1);
    return true;
  }

  /**
   * Add a conclusion to the node
   * @param propositionId - ID of the proposition to add
   * @throws Error if maximum conclusions count exceeded
   */
  addConclusion(propositionId: string): void {
    if (this.conclusions.length >= FREEFORM_CONSTRAINTS.MAX_CONCLUSIONS) {
      throw new Error(
        `Cannot add conclusion: maximum ${FREEFORM_CONSTRAINTS.MAX_CONCLUSIONS} conclusions allowed`
      );
    }
    this.conclusions.push(propositionId);
  }

  /**
   * Remove a conclusion from the node
   * @param propositionId - ID of the proposition to remove
   * @throws Error if removing last conclusion
   * @returns true if conclusion was removed, false if not found
   */
  removeConclusion(propositionId: string): boolean {
    if (this.conclusions.length <= FREEFORM_CONSTRAINTS.MIN_CONCLUSIONS) {
      throw new Error(
        `Cannot remove conclusion: minimum ${FREEFORM_CONSTRAINTS.MIN_CONCLUSIONS} conclusion(s) required`
      );
    }
    const index = this.conclusions.indexOf(propositionId);
    if (index === -1) {
      return false;
    }
    this.conclusions.splice(index, 1);
    return true;
  }
}
