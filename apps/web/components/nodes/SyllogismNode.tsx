/**
 * SyllogismNode Component
 *
 * Syllogism: Classical deductive reasoning with major and minor premises
 * - 2 input handles: major premise, minor premise
 * - 1 output handle: conclusion
 */

import React from 'react';
import { NodeProps } from 'reactflow';
import { GitMerge } from 'lucide-react';
import { LogicNodeWrapper } from './LogicNodeWrapper';
import { PropositionDisplay } from './PropositionDisplay';
import { useGraphStore } from '@/lib/store/graphStore';

export interface SyllogismNodeData {
  label?: string;
  premises: {
    major: { id: string; content: string };
    minor: { id: string; content: string };
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
 * SyllogismNode - classical syllogistic reasoning
 */
export const SyllogismNode: React.FC<NodeProps<SyllogismNodeData>> = ({ id, data, selected }) => {
  const updateProposition = useGraphStore((state) => state.updateProposition);

  const validationState = data.validationState || {
    isValid: true,
    status: 'neutral',
    errors: [],
  };

  const premises = [
    <PropositionDisplay
      key={data.premises.major.id}
      id={data.premises.major.id}
      content={data.premises.major.content}
      placeholder="Major Premise"
      isEmpty={!data.premises.major.content}
      type="premise"
      onSave={(newContent) => updateProposition(id, data.premises.major.id, newContent)}
    />,
    <PropositionDisplay
      key={data.premises.minor.id}
      id={data.premises.minor.id}
      content={data.premises.minor.content}
      placeholder="Minor Premise"
      isEmpty={!data.premises.minor.content}
      type="premise"
      onSave={(newContent) => updateProposition(id, data.premises.minor.id, newContent)}
    />,
  ];

  const conclusions = [
    <PropositionDisplay
      key={data.conclusion.id}
      id={data.conclusion.id}
      content={data.conclusion.content}
      placeholder="Conclusion"
      isEmpty={!data.conclusion.content}
      type="conclusion"
      onSave={(newContent) => updateProposition(id, data.conclusion.id, newContent)}
    />,
  ];

  return (
    <LogicNodeWrapper
      label={data.label || 'Syllogism'}
      notation="Syllogism"
      icon={<GitMerge size={16} />}
      premises={premises}
      conclusions={conclusions}
      validationState={validationState}
      selected={selected}
    />
  );
};

export default SyllogismNode;
