/**
 * DisjunctionNode Component
 *
 * Disjunctive Syllogism: If P∨Q and ¬P, then Q
 * - 2 input handles: P∨Q (disjunction), ¬P (negation)
 * - 1 output handle: Q (remaining option)
 */

import React from 'react';
import { NodeProps } from 'reactflow';
import { GitBranch } from 'lucide-react';
import { LogicNodeWrapper } from './LogicNodeWrapper';
import { PropositionDisplay } from './PropositionDisplay';

export interface DisjunctionNodeData {
  label?: string;
  premises: {
    disjunction: { id: string; content: string };
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
 * DisjunctionNode - disjunctive syllogism reasoning
 */
export const DisjunctionNode: React.FC<NodeProps<DisjunctionNodeData>> = ({ data, selected }) => {
  const validationState = data.validationState || {
    isValid: true,
    status: 'neutral',
    errors: [],
  };

  const premises = [
    <PropositionDisplay
      key={data.premises.disjunction.id}
      id={data.premises.disjunction.id}
      content={data.premises.disjunction.content}
      placeholder="P∨Q"
      isEmpty={!data.premises.disjunction.content}
      type="premise"
    />,
    <PropositionDisplay
      key={data.premises.negation.id}
      id={data.premises.negation.id}
      content={data.premises.negation.content}
      placeholder="¬P"
      isEmpty={!data.premises.negation.content}
      type="premise"
    />,
  ];

  const conclusions = [
    <PropositionDisplay
      key={data.conclusion.id}
      id={data.conclusion.id}
      content={data.conclusion.content}
      placeholder="Q"
      isEmpty={!data.conclusion.content}
      type="conclusion"
    />,
  ];

  return (
    <LogicNodeWrapper
      label={data.label || 'Disjunction'}
      notation="P∨Q, ¬P ⊢ Q"
      icon={<GitBranch size={16} />}
      premises={premises}
      conclusions={conclusions}
      validationState={validationState}
      selected={selected}
    />
  );
};

export default DisjunctionNode;
