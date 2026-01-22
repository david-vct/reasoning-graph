/**
 * Node Factory
 *
 * Factory function for creating logic nodes with validation and
 * automatic UUID generation.
 */

import { v4 as uuidv4 } from 'uuid';
import { LogicNode } from './LogicNode';
import { NodeType, LogicNodeBase } from './types';
import { nodeTypeRegistry } from './nodeTypeRegistry';
import { logicNodeBaseSchema } from './schemas';
import { AxiomNode } from './AxiomNode';
import { ModusPonensNode } from './ModusPonensNode';
import { ModusTollensNode } from './ModusTollensNode';
import { SimpleAffirmationNode } from './SimpleAffirmationNode';

/**
 * Mock implementation classes for node types not yet implemented
 * These will be replaced with real implementations in Story 2.4
 */

/**
 * Mock implementation classes for node types not yet implemented
 * These will be replaced with real implementations in Story 2.4
 */

class SyllogismNodeImpl extends LogicNode {
  getInputCount(): number {
    return 2; // A→B and B→C
  }
  getOutputCount(): number {
    return 1; // A→C
  }
}

class DisjunctionNodeImpl extends LogicNode {
  getInputCount(): number {
    return 1; // A
  }
  getOutputCount(): number {
    return 1; // A∨B
  }
}

class ReductioAdAbsurdumNodeImpl extends LogicNode {
  getInputCount(): number {
    return 2; // Assumption and contradiction
  }
  getOutputCount(): number {
    return 1; // Negation of assumption
  }
}

class InductionNodeImpl extends LogicNode {
  getInputCount(): number {
    return 2; // Base case and inductive step
  }
  getOutputCount(): number {
    return 1; // General conclusion
  }
}

class FreeFormNodeImpl extends LogicNode {
  getInputCount(): number {
    return -1; // Variable number of inputs
  }
  getOutputCount(): number {
    return -1; // Variable number of outputs
  }

  // Override validate for free-form nodes (no structural requirements)
  validate(): boolean {
    this.validationState.errors = [];
    this.validationState.isValid = true;
    return true;
  }
}

/**
 * Creates a new logic node of the specified type
 *
 * @param type - The type of node to create
 * @param data - Partial node data (id will be auto-generated if not provided)
 * @returns A new logic node instance
 * @throws Error if the node type is not registered or validation fails
 */
export function createNode(
  type: NodeType,
  data: Partial<Omit<LogicNodeBase, 'id' | 'type' | 'validationState'>>
): LogicNode {
  // 1. Check if type is registered
  if (!nodeTypeRegistry.has(type)) {
    throw new Error(`Node type "${type}" is not registered`);
  }

  // 2. Generate UUID if not provided
  const id = (data as any).id || uuidv4();

  // 3. Get node definition for defaults
  const definition = nodeTypeRegistry.get(type)!;

  // 4. Prepare the full data object
  const fullData = {
    id,
    type,
    position: data.position || { x: 0, y: 0 },
    premises: data.premises || [],
    conclusions: data.conclusions || [],
    annotation: data.annotation,
  };

  // 5. Create validation state
  const validationState = {
    isValid: false,
    errors: [],
    affectedDescendants: [],
  };

  // 6. Validate with Zod schema
  const validationResult = logicNodeBaseSchema.safeParse({
    ...fullData,
    validationState,
  });

  if (!validationResult.success) {
    const errorMessages = validationResult.error.issues
      .map((err: any) => `${err.path.join('.')}: ${err.message}`)
      .join(', ');
    throw new Error(`Node validation failed: ${errorMessages}`);
  }

  // 7. Create appropriate node instance based on type
  let node: LogicNode;

  switch (type) {
    case NodeType.Axiom:
      node = new AxiomNode(fullData);
      break;
    case NodeType.ModusPonens:
      node = new ModusPonensNode(fullData);
      break;
    case NodeType.ModusTollens:
      node = new ModusTollensNode(fullData);
      break;
    case NodeType.Syllogism:
      node = new SyllogismNodeImpl(fullData);
      break;
    case NodeType.Disjunction:
      node = new DisjunctionNodeImpl(fullData);
      break;
    case NodeType.ReductioAdAbsurdum:
      node = new ReductioAdAbsurdumNodeImpl(fullData);
      break;
    case NodeType.Induction:
      node = new InductionNodeImpl(fullData);
      break;
    case NodeType.SimpleAffirmation:
      node = new SimpleAffirmationNode(fullData);
      break;
    case NodeType.FreeForm:
      node = new FreeFormNodeImpl(fullData);
      break;
    default:
      // This should never happen due to the registry check
      throw new Error(`Unhandled node type: ${type}`);
  }

  return node;
}
