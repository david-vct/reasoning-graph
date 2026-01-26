/**
 * ReductioAdAbsurdumNode Component
 *
 * Reductio ad Absurdum: Proof by contradiction (P→⊥ implies ¬P)
 * - 1 input handle: P→⊥ (assumption leads to contradiction)
 * - 1 output handle: ¬P (negation of assumption)
 */

import React from 'react';
import { NodeProps } from 'reactflow';
import { AlertTriangle } from 'lucide-react';
import { LogicNodeWrapper } from './LogicNodeWrapper';
import { PropositionDisplay } from './PropositionDisplay';
import { useGraphStore } from '@/lib/store/graphStore';

export interface ReductioAdAbsurdumNodeData {
  label?: string;
  premise: {
    id: string;
    content: string;
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
 * ReductioAdAbsurdumNode - proof by contradiction
 */
export const ReductioAdAbsurdumNode: React.FC<NodeProps<ReductioAdAbsurdumNodeData>> = ({
  id,
  data,
  selected,
}) => {
  const updateProposition = useGraphStore((state) => state.updateProposition);

  const validationState = data.validationState || {
    isValid: true,
    status: 'neutral',
    errors: [],
  };

  const premises = [
    <PropositionDisplay
      key={data.premise.id}
      id={data.premise.id}
      content={data.premise.content}
      placeholder="P→⊥"
      isEmpty={!data.premise.content}
      type="premise"
      onSave={(newContent) => updateProposition(id, data.premise.id, newContent)}
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
      onSave={(newContent) => updateProposition(id, data.conclusion.id, newContent)}
    />,
  ];

  return (
    <LogicNodeWrapper
      label={data.label || 'Reductio ad Absurdum'}
      notation="P→⊥ ⊢ ¬P"
      icon={<AlertTriangle size={16} />}
      premises={premises}
      conclusions={conclusions}
      validationState={validationState}
      selected={selected}
    />
  );
};

export default ReductioAdAbsurdumNode;
