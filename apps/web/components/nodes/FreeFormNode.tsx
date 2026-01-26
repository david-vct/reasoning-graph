/**
 * FreeFormNode Component
 *
 * Free Form Node: Flexible node with dynamic inputs and outputs
 * - 0-5 dynamic input handles
 * - 1-3 dynamic output handles
 * - Always shown in warning/neutral validation state (no strict validation)
 */

import React from 'react';
import { NodeProps } from 'reactflow';
import { Edit3 } from 'lucide-react';
import { LogicNodeWrapper } from './LogicNodeWrapper';
import { PropositionDisplay } from './PropositionDisplay';

export interface FreeFormNodeData {
  label?: string;
  premises: Array<{ id: string; content: string }>;
  conclusions: Array<{ id: string; content: string }>;
  validationState?: {
    isValid: boolean;
    status: 'valid' | 'invalid' | 'warning' | 'neutral';
    errors: string[];
  };
}

/**
 * FreeFormNode - flexible node with dynamic handles
 */
export const FreeFormNode: React.FC<NodeProps<FreeFormNodeData>> = ({ data, selected }) => {
  // Free form nodes always show warning state (no strict validation)
  const validationState = {
    isValid: true,
    status: 'warning' as const,
    errors: [],
  };

  const premises = data.premises.map((premise, index) => (
    <PropositionDisplay
      key={premise.id}
      id={premise.id}
      content={premise.content}
      placeholder={`Input ${index + 1}`}
      isEmpty={!premise.content}
      type="premise"
    />
  ));

  const conclusions = data.conclusions.map((conclusion, index) => (
    <PropositionDisplay
      key={conclusion.id}
      id={conclusion.id}
      content={conclusion.content}
      placeholder={`Output ${index + 1}`}
      isEmpty={!conclusion.content}
      type="conclusion"
    />
  ));

  return (
    <LogicNodeWrapper
      label={data.label || 'Free Form'}
      notation="Free Form"
      icon={<Edit3 size={16} />}
      premises={premises}
      conclusions={conclusions}
      validationState={validationState}
      selected={selected}
    />
  );
};

export default FreeFormNode;
