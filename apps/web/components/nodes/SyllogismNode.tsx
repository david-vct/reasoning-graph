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
export const SyllogismNode: React.FC<NodeProps<SyllogismNodeData>> = ({ data, selected }) => {
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
    />,
    <PropositionDisplay
      key={data.premises.minor.id}
      id={data.premises.minor.id}
      content={data.premises.minor.content}
      placeholder="Minor Premise"
      isEmpty={!data.premises.minor.content}
      type="premise"
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
