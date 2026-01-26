/**
 * AxiomNode Component
 *
 * Represents an axiom - a self-evident truth that requires no justification.
 * - No input handles (it's a starting point)
 * - 1 output handle
 */

import React from 'react';
import { NodeProps } from 'reactflow';
import { CircleDot } from 'lucide-react';
import { LogicNodeWrapper } from './LogicNodeWrapper';
import { PropositionDisplay } from './PropositionDisplay';
import { useGraphStore } from '@/lib/store/graphStore';

export interface AxiomNodeData {
  label?: string;
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
 * AxiomNode - foundational truth with no premises
 */
export const AxiomNode: React.FC<NodeProps<AxiomNodeData>> = ({ id, data, selected }) => {
  const updateProposition = useGraphStore((state) => state.updateProposition);

  const validationState = data.validationState || {
    isValid: true,
    status: 'neutral',
    errors: [],
  };

  const conclusions = [
    <PropositionDisplay
      key={data.conclusion.id}
      id={data.conclusion.id}
      content={data.conclusion.content}
      placeholder="Axiom"
      isEmpty={!data.conclusion.content}
      type="conclusion"
      onSave={(newContent) => updateProposition(id, data.conclusion.id, newContent)}
    />,
  ];

  return (
    <LogicNodeWrapper
      label={data.label || 'Axiom'}
      notation="Axiom"
      icon={<CircleDot size={16} />}
      premises={[]}
      conclusions={conclusions}
      validationState={validationState}
      selected={selected}
    />
  );
};

export default AxiomNode;
