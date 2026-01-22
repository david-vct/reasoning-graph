/**
 * Node Type Definitions
 *
 * Defines all logic node types, their metadata, and type unions
 * for the reasoning graph system.
 */

/**
 * Enum of all available logic node types
 */
export enum NodeType {
  Axiom = 'axiom',
  ModusPonens = 'modus-ponens',
  ModusTollens = 'modus-tollens',
  Syllogism = 'syllogism',
  Disjunction = 'disjunction',
  ReductioAdAbsurdum = 'reductio-ad-absurdum',
  Induction = 'induction',
  SimpleAffirmation = 'simple-affirmation',
  FreeForm = 'free-form',
  // Container will be added in Epic 5
}

/**
 * Categories for grouping node types in UI
 */
export type NodeCategory = 'foundational' | 'inference' | 'advanced' | 'special';

/**
 * Metadata definition for a node type
 * Used by the registry and UI to display node information
 */
export interface NodeTypeDefinition {
  type: NodeType;
  label: string; // Display name ("Modus Ponens")
  description: string; // Human-readable description
  inputCount: number; // Number of premises (inputs)
  outputCount: number; // Number of conclusions (outputs)
  category: NodeCategory;
}

/**
 * Base interface for all logic nodes
 * Concrete implementations will extend this
 */
export interface LogicNodeBase {
  id: string; // UUID
  type: NodeType; // Discriminator
  position: { x: number; y: number };
  premises: string[]; // Proposition IDs (inputs)
  conclusions: string[]; // Proposition IDs (outputs)
  annotation?: string; // Optional user note
  validationState: {
    isValid: boolean;
    errors: string[];
    affectedDescendants: string[];
  };
}

/**
 * Placeholder types for concrete node implementations
 * These will be properly implemented in Stories 2.3-2.4
 */
export interface AxiomNode extends LogicNodeBase {
  type: NodeType.Axiom;
}

export interface ModusPonensNode extends LogicNodeBase {
  type: NodeType.ModusPonens;
}

export interface ModusTollensNode extends LogicNodeBase {
  type: NodeType.ModusTollens;
}

export interface SyllogismNode extends LogicNodeBase {
  type: NodeType.Syllogism;
}

export interface DisjunctionNode extends LogicNodeBase {
  type: NodeType.Disjunction;
}

export interface ReductioAdAbsurdumNode extends LogicNodeBase {
  type: NodeType.ReductioAdAbsurdum;
}

export interface InductionNode extends LogicNodeBase {
  type: NodeType.Induction;
}

export interface SimpleAffirmationNode extends LogicNodeBase {
  type: NodeType.SimpleAffirmation;
}

export interface FreeFormNode extends LogicNodeBase {
  type: NodeType.FreeForm;
}

/**
 * Discriminated union of all logic node types
 * Used for type-safe operations across different node types
 */
export type AnyLogicNode =
  | AxiomNode
  | ModusPonensNode
  | ModusTollensNode
  | SyllogismNode
  | DisjunctionNode
  | ReductioAdAbsurdumNode
  | InductionNode
  | SimpleAffirmationNode
  | FreeFormNode;
