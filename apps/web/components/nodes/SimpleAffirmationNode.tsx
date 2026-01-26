/**
 * SimpleAffirmationNode Component
 *
 * Represents a simple affirmation - a proposition stated without logical derivation.
 * - 1 input handle (optional connection to justify)
 * - 1 output handle
 */

import React from 'react';
import { NodeProps } from 'reactflow';
import { MessageSquare } from 'lucide-react';
import { LogicNodeWrapper } from './LogicNodeWrapper';
import { PropositionDisplay } from './PropositionDisplay';
import { useGraphStore } from '@/lib/store/graphStore';

export interface SimpleAffirmationNodeData {
  label?: string;
  premise?: {
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
 * SimpleAffirmationNode - simple statement with optional justification
 */
export const SimpleAffirmationNode: React.FC<NodeProps<SimpleAffirmationNodeData>> = ({
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

  const premises = data.premise
    ? [
        <PropositionDisplay
          key={data.premise.id}
          id={data.premise.id}
          content={data.premise.content}
          placeholder="Justification"
          isEmpty={!data.premise.content}
          type="premise"
          onSave={(newContent) => updateProposition(id, data.premise!.id, newContent)}
        />,
      ]
    : [];

  const conclusions = [
    <PropositionDisplay
      key={data.conclusion.id}
      id={data.conclusion.id}
      content={data.conclusion.content}
      placeholder="⊢"
      isEmpty={!data.conclusion.content}
      type="conclusion"
      onSave={(newContent) => updateProposition(id, data.conclusion.id, newContent)}
    />,
  ];

  return (
    <LogicNodeWrapper
      label={data.label || 'Simple Affirmation'}
      notation="⊢"
      icon={<MessageSquare size={16} />}
      premises={premises}
      conclusions={conclusions}
      validationState={validationState}
      selected={selected}
    />
  );
};

export default SimpleAffirmationNode;
