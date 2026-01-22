/**
 * Public API for Logic Nodes
 *
 * This module exports the core components for working with logic nodes:
 * - Base class and types
 * - Node type registry
 * - Factory function for creating nodes
 * - Validation schemas
 */

// Base class
export { LogicNode } from './LogicNode';

// Types
export {
  NodeType,
  type NodeCategory,
  type NodeTypeDefinition,
  type LogicNodeBase,
  type AxiomNode,
  type ModusPonensNode,
  type ModusTollensNode,
  type SyllogismNode,
  type DisjunctionNode,
  type ReductioAdAbsurdumNode,
  type InductionNode,
  type SimpleAffirmationNode,
  type FreeFormNode,
  type AnyLogicNode,
} from './types';

// Registry
export { NodeTypeRegistry, nodeTypeRegistry } from './nodeTypeRegistry';

// Factory
export { createNode } from './factory';

// Schemas
export {
  positionSchema,
  validationStateSchema,
  logicNodeBaseSchema,
  logicNodeSchema,
  axiomNodeSchema,
  modusPonensNodeSchema,
  modusTollensNodeSchema,
  syllogismNodeSchema,
  disjunctionNodeSchema,
  reductioAdAbsurdumNodeSchema,
  inductionNodeSchema,
  simpleAffirmationNodeSchema,
  freeFormNodeSchema,
  type LogicNodeInput,
  type ValidatedLogicNode,
} from './schemas';
