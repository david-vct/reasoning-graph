/**
 * Node Type Registry
 *
 * Maps React Flow node types to custom node components.
 * This registry is used by React Flow to render the appropriate
 * component for each node type in the graph.
 */

import { NodeTypes } from 'reactflow';
import AxiomNode from '@/components/nodes/AxiomNode';
import SimpleAffirmationNode from '@/components/nodes/SimpleAffirmationNode';
import ModusPonensNode from '@/components/nodes/ModusPonensNode';
import ModusTollensNode from '@/components/nodes/ModusTollensNode';
import SyllogismNode from '@/components/nodes/SyllogismNode';
import DisjunctionNode from '@/components/nodes/DisjunctionNode';
import ReductioAdAbsurdumNode from '@/components/nodes/ReductioAdAbsurdumNode';
import InductionNode from '@/components/nodes/InductionNode';
import FreeFormNode from '@/components/nodes/FreeFormNode';

/**
 * Mapping of node type strings to their React components
 * Used by React Flow's ReactFlowProvider
 */
export const nodeTypes: NodeTypes = {
  axiom: AxiomNode,
  'simple-affirmation': SimpleAffirmationNode,
  'modus-ponens': ModusPonensNode,
  'modus-tollens': ModusTollensNode,
  syllogism: SyllogismNode,
  disjunction: DisjunctionNode,
  'reductio-ad-absurdum': ReductioAdAbsurdumNode,
  induction: InductionNode,
  'free-form': FreeFormNode,
};

export default nodeTypes;
