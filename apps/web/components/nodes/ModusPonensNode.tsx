/**
 * ModusPonensNode Component
 *
 * Modus Ponens: If P→Q and P, then Q
 * - 2 input handles: P→Q (implication), P (affirmation)
 * - 1 output handle: Q (conclusion)
 */

import React from 'react';
import { NodeProps } from 'reactflow';
import { ArrowRight } from 'lucide-react';
import { LogicNodeWrapper } from './LogicNodeWrapper';
import { PropositionDisplay } from './PropositionDisplay';
import { useGraphStore } from '@/lib/store/graphStore';

export interface ModusPonensNodeData {
  label?: string;
  premises: {
    implication: { id: string; content: string };
    affirmation: { id: string; content: string };
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
 * ModusPonensNode - deductive inference rule
 */
export const ModusPonensNode: React.FC<NodeProps<ModusPonensNodeData>> = ({
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
      key={data.premises.implication.id}
      id={data.premises.implication.id}
      content={data.premises.implication.content}
      placeholder="P→Q"
      isEmpty={!data.premises.implication.content}
      type="premise"
      onSave={(newContent) => updateProposition(id, data.premises.implication.id, newContent)}
    />,
    <PropositionDisplay
      key={data.premises.affirmation.id}
      id={data.premises.affirmation.id}
      content={data.premises.affirmation.content}
      placeholder="P"
      isEmpty={!data.premises.affirmation.content}
      type="premise"
      onSave={(newContent) => updateProposition(id, data.premises.affirmation.id, newContent)}
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
      onSave={(newContent) => updateProposition(id, data.conclusion.id, newContent)}
    />,
  ];

  return (
    <LogicNodeWrapper
      label={data.label || 'Modus Ponens'}
      notation="P→Q, P ⊢ Q"
      icon={<ArrowRight size={16} />}
      premises={premises}
      conclusions={conclusions}
      validationState={validationState}
      selected={selected}
    />
  );
};

export default ModusPonensNode;
