/**
 * InductionNode Component
 *
 * Mathematical Induction: Proves a statement for all natural numbers
 * - 2 input handles: base case, inductive step
 * - 1 output handle: general conclusion
 */

import React from 'react';
import { NodeProps } from 'reactflow';
import { Repeat } from 'lucide-react';
import { LogicNodeWrapper } from './LogicNodeWrapper';
import { PropositionDisplay } from './PropositionDisplay';
import { useGraphStore } from '@/lib/store/graphStore';

export interface InductionNodeData {
  label?: string;
  premises: {
    baseCase: { id: string; content: string };
    inductiveStep: { id: string; content: string };
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
 * InductionNode - mathematical induction reasoning
 */
export const InductionNode: React.FC<NodeProps<InductionNodeData>> = ({ id, data, selected }) => {
  const updateProposition = useGraphStore((state) => state.updateProposition);

  const validationState = data.validationState || {
    isValid: true,
    status: 'neutral',
    errors: [],
  };

  const premises = [
    <PropositionDisplay
      key={data.premises.baseCase.id}
      id={data.premises.baseCase.id}
      content={data.premises.baseCase.content}
      placeholder="Base Case: P(0)"
      isEmpty={!data.premises.baseCase.content}
      type="premise"
      onSave={(newContent) => updateProposition(id, data.premises.baseCase.id, newContent)}
    />,
    <PropositionDisplay
      key={data.premises.inductiveStep.id}
      id={data.premises.inductiveStep.id}
      content={data.premises.inductiveStep.content}
      placeholder="Inductive: P(n)→P(n+1)"
      isEmpty={!data.premises.inductiveStep.content}
      type="premise"
      onSave={(newContent) => updateProposition(id, data.premises.inductiveStep.id, newContent)}
    />,
  ];

  const conclusions = [
    <PropositionDisplay
      key={data.conclusion.id}
      id={data.conclusion.id}
      content={data.conclusion.content}
      placeholder="∀n: P(n)"
      isEmpty={!data.conclusion.content}
      type="conclusion"
      onSave={(newContent) => updateProposition(id, data.conclusion.id, newContent)}
    />,
  ];

  return (
    <LogicNodeWrapper
      label={data.label || 'Induction'}
      notation="Induction"
      icon={<Repeat size={16} />}
      premises={premises}
      conclusions={conclusions}
      validationState={validationState}
      selected={selected}
    />
  );
};

export default InductionNode;
