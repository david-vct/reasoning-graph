/**
 * ModusTollensNode Component
 *
 * Modus Tollens: If P→Q and ¬Q, then ¬P
 * - 2 input handles: P→Q (implication), ¬Q (negation of consequent)
 * - 1 output handle: ¬P (negation of antecedent)
 */

import React from 'react';
import { NodeProps } from 'reactflow';
import { ArrowLeftRight } from 'lucide-react';
import { LogicNodeWrapper } from './LogicNodeWrapper';
import { PropositionDisplay } from './PropositionDisplay';

export interface ModusTollensNodeData {
  label?: string;
  premises: {
    implication: { id: string; content: string };
    negation: { id: string; content: string };
  };
  conclusion: {
    id: string;
    content: string;
  };
  validationState?: {
    isValid: boolean;
    status: 'valid' | 'invalid' | 'warning' | 'neutral';
    errors: string[];
  };
}

/**
 * ModusTollensNode - deductive inference by contrapositive
 */
export const ModusTollensNode: React.FC<NodeProps<ModusTollensNodeData>> = ({ data, selected }) => {
  const validationState = data.validationState || {
    isValid: true,
    status: 'neutral',
    errors: [],
  };

  const premises = [
    <PropositionDisplay
      key={data.premises.implication.id}
      id={data.premises.implication.id}
      content={data.premises.implication.content}
      placeholder="P→Q"
      isEmpty={!data.premises.implication.content}
      type="premise"
    />,
    <PropositionDisplay
      key={data.premises.negation.id}
      id={data.premises.negation.id}
      content={data.premises.negation.content}
      placeholder="¬Q"
      isEmpty={!data.premises.negation.content}
      type="premise"
    />,
  ];

  const conclusions = [
    <PropositionDisplay
      key={data.conclusion.id}
      id={data.conclusion.id}
      content={data.conclusion.content}
      placeholder="¬P"
      isEmpty={!data.conclusion.content}
      type="conclusion"
    />,
  ];

  return (
    <LogicNodeWrapper
      label={data.label || 'Modus Tollens'}
      notation="P→Q, ¬Q ⊢ ¬P"
      icon={<ArrowLeftRight size={16} />}
      premises={premises}
      conclusions={conclusions}
      validationState={validationState}
      selected={selected}
    />
  );
};

export default ModusTollensNode;
