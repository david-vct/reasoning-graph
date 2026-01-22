/**
 * Abstract Base Class for all Propositions
 * Defines common properties and validation contract
 */
import { PropositionType } from './types';

export abstract class Proposition {
  constructor(
    public id: string,
    public content: string,
    public propType: PropositionType
  ) {}

  /**
   * Validates the proposition and its sub-propositions recursively
   * @returns true if the proposition is valid, false otherwise
   */
  abstract validate(): boolean;
}
