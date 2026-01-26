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
import { Edit3, Plus, Trash2 } from 'lucide-react';
import { LogicNodeWrapper } from './LogicNodeWrapper';
import { PropositionDisplay } from './PropositionDisplay';
import { useGraphStore } from '@/lib/store/graphStore';

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
export const FreeFormNode: React.FC<NodeProps<FreeFormNodeData>> = ({ id, data, selected }) => {
  const updateProposition = useGraphStore((state) => state.updateProposition);
  const addPremise = useGraphStore((state) => state.addPremiseToFreeForm);
  const removePremise = useGraphStore((state) => state.removePremiseFromFreeForm);
  const addConclusion = useGraphStore((state) => state.addConclusionToFreeForm);
  const removeConclusion = useGraphStore((state) => state.removeConclusionFromFreeForm);

  // Free form nodes always show warning state (no strict validation)
  const validationState = {
    isValid: true,
    status: 'warning' as const,
    errors: [],
  };

  // Render premises with delete buttons inline
  const premises = data.premises.map((premise, index) => (
    <div key={premise.id} className="flex items-center gap-1 w-full">
      <PropositionDisplay
        id={premise.id}
        content={premise.content}
        placeholder={`Input ${index + 1}`}
        isEmpty={!premise.content}
        type="premise"
        onSave={(newContent) => updateProposition(id, premise.id, newContent)}
      />
      <button
        onClick={() => removePremise(id, premise.id)}
        className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors flex-shrink-0"
        title="Remove premise"
      >
        <Trash2 size={14} />
      </button>
    </div>
  ));

  // Render conclusions with delete buttons inline
  const conclusions = data.conclusions.map((conclusion, index) => (
    <div key={conclusion.id} className="flex items-center gap-1 w-full">
      <PropositionDisplay
        id={conclusion.id}
        content={conclusion.content}
        placeholder={`Output ${index + 1}`}
        isEmpty={!conclusion.content}
        type="conclusion"
        onSave={(newContent) => updateProposition(id, conclusion.id, newContent)}
      />
      {data.conclusions.length > 1 && (
        <button
          onClick={() => removeConclusion(id, conclusion.id)}
          className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors flex-shrink-0"
          title="Remove conclusion"
        >
          <Trash2 size={14} />
        </button>
      )}
    </div>
  ));

  return (
    <div className="relative">
      <LogicNodeWrapper
        label={data.label || 'Free Form'}
        notation="Free Form"
        icon={<Edit3 size={16} />}
        premises={premises}
        conclusions={conclusions}
        validationState={validationState}
        selected={selected}
      />
      {/* Action buttons at bottom */}
      <div className="flex justify-center gap-2 px-3 pb-2 bg-white rounded-b-lg">
        {data.premises.length < 5 && (
          <button
            onClick={() => addPremise(id)}
            className="flex items-center gap-1 px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded border border-blue-300 transition-colors"
          >
            <Plus size={12} />
            Premise
          </button>
        )}
        {data.conclusions.length < 3 && (
          <button
            onClick={() => addConclusion(id)}
            className="flex items-center gap-1 px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded border border-blue-300 transition-colors"
          >
            <Plus size={12} />
            Conclusion
          </button>
        )}
      </div>
    </div>
  );
};

export default FreeFormNode;
