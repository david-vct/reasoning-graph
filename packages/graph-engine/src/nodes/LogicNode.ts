/**
 * LogicNode Abstract Base Class
 *
 * Defines the common structure and behavior for all logic nodes
 * in the reasoning graph system using the Template Method pattern.
 */

import { NodeType } from './types';

/**
 * Abstract base class for all logic nodes
 *
 * Provides common validation logic and enforces structural
 * requirements through abstract methods that concrete subclasses
 * must implement.
 */
export abstract class LogicNode {
  id: string;
  type: NodeType;
  position: { x: number; y: number };
  premises: string[]; // Proposition IDs (inputs)
  conclusions: string[]; // Proposition IDs (outputs)
  annotation?: string;
  validationState: {
    isValid: boolean;
    errors: string[];
    affectedDescendants: string[];
  };

  constructor(data: {
    id: string;
    type: NodeType;
    position: { x: number; y: number };
    premises?: string[];
    conclusions?: string[];
    annotation?: string;
  }) {
    this.id = data.id;
    this.type = data.type;
    this.position = data.position;
    this.premises = data.premises || [];
    this.conclusions = data.conclusions || [];
    this.annotation = data.annotation;
    this.validationState = {
      isValid: false,
      errors: [],
      affectedDescendants: [],
    };
  }

  /**
   * Returns the expected number of input premises for this node type
   * Must be implemented by concrete subclasses
   */
  abstract getInputCount(): number;

  /**
   * Returns the expected number of output conclusions for this node type
   * Must be implemented by concrete subclasses
   */
  abstract getOutputCount(): number;

  /**
   * Validates the structural correctness of the node
   *
   * Template Method pattern: enforces that the node has the correct
   * number of premises and conclusions. Subclasses can override to
   * add additional validation logic.
   *
   * @returns true if validation passes, false otherwise
   */
  validate(): boolean {
    this.validationState.errors = [];

    // Check premises count
    const expectedInputs = this.getInputCount();
    if (this.premises.length !== expectedInputs) {
      this.validationState.errors.push(
        `Expected ${expectedInputs} premise(s), got ${this.premises.length}`
      );
    }

    // Check conclusions count
    const expectedOutputs = this.getOutputCount();
    if (this.conclusions.length !== expectedOutputs) {
      this.validationState.errors.push(
        `Expected ${expectedOutputs} conclusion(s), got ${this.conclusions.length}`
      );
    }

    // Update validation state
    const isValid = this.validationState.errors.length === 0;
    this.validationState.isValid = isValid;
    return isValid;
  }

  /**
   * Resets the validation state
   */
  resetValidation(): void {
    this.validationState = {
      isValid: false,
      errors: [],
      affectedDescendants: [],
    };
  }
}
