/**
 * LogicNodeWrapper Component
 *
 * Base wrapper component for all logic nodes. Provides:
 * - Header with node type label and formal notation
 * - Input handles container (left side)
 * - Output handles container (right side)
 * - Dynamic sizing with min/max constraints
 * - Tailwind styling per design system
 * - Zoom-responsive scaling
 */

import React from 'react';
import { Handle, Position } from 'reactflow';
import { useGraphStore } from '@/lib/store/graphStore';

interface HandleItem {
  handleId: string;
  content: React.ReactNode;
}

export interface LogicNodeWrapperProps {
  /** React Flow node identifier */
  nodeId: string;
  /** Node type label (e.g., "Modus Ponens") */
  label: string;
  /** Formal logic notation (e.g., "P→Q") */
  notation: string;
  /** Icon component for the node type */
  icon?: React.ReactNode;
  /** Input propositions to render on the left side */
  premises: HandleItem[];
  /** Output propositions to render on the right side */
  conclusions: HandleItem[];
  /** Validation state for visual feedback */
  validationState: {
    isValid: boolean;
    status: 'valid' | 'invalid' | 'warning' | 'neutral';
    errors: string[];
  };
  /** Whether the node is selected */
  selected?: boolean;
}

/**
 * LogicNodeWrapper provides the consistent structure for all logic node types
 */
export const LogicNodeWrapper: React.FC<LogicNodeWrapperProps> = ({
  nodeId,
  label,
  notation,
  icon,
  premises,
  conclusions,
  validationState,
  selected = false,
}) => {
  const isConnecting = useGraphStore((state) => state.isConnecting);
  const sourceNodeId = useGraphStore((state) => state.sourceNodeId);
  const sourceHandleId = useGraphStore((state) => state.sourceHandleId);
  const edges = useGraphStore((state) => state.edges);

  // Determine border color based on validation state
  const getBorderColor = () => {
    switch (validationState.status) {
      case 'valid':
        return 'border-green-500';
      case 'invalid':
        return 'border-red-500';
      case 'warning':
        return 'border-amber-500';
      default:
        return 'border-slate-300';
    }
  };

  const canConnectToTarget = (targetNodeId: string, targetHandleId: string) => {
    if (!sourceNodeId || !sourceHandleId) {
      return false;
    }

    if (!sourceHandleId.startsWith('conclusion-') || !targetHandleId.startsWith('premise-')) {
      return false;
    }

    if (sourceNodeId === targetNodeId) {
      return false;
    }

    const targetAlreadyConnected = edges.some(
      (edge) => edge.target === targetNodeId && edge.targetHandle === targetHandleId
    );

    return !targetAlreadyConnected;
  };

  const getTargetHandleClassName = (handleId: string) => {
    if (!isConnecting) {
      return '!w-3 !h-3 !bg-blue-600 !border-2 !border-white !-left-[8px]';
    }

    const isValidTarget = canConnectToTarget(nodeId, handleId);
    if (isValidTarget) {
      return '!w-3 !h-3 !bg-green-500 !border-2 !border-white !-left-[8px]';
    }

    return '!w-3 !h-3 !bg-slate-300 !border-2 !border-white !-left-[8px] !opacity-60 !pointer-events-none';
  };

  const getSourceHandleClassName = (handleId: string) => {
    const isActiveSource = isConnecting && sourceNodeId === nodeId && sourceHandleId === handleId;

    if (isActiveSource) {
      return '!w-3 !h-3 !bg-amber-500 !border-2 !border-white !-right-[8px] animate-pulse';
    }

    return '!w-3 !h-3 !bg-blue-600 !border-2 !border-white !-right-[8px]';
  };

  return (
    <div
      className={`
        bg-white rounded-lg shadow-md
        min-w-[200px] max-w-[400px]
        border-2 ${getBorderColor()}
        ${selected ? 'border-[3px] border-blue-600 shadow-lg' : ''}
        transition-shadow duration-200
        hover:shadow-lg
      `}
      style={{ width: '280px' }}
    >
      {/* Header Zone */}
      <div className="h-10 px-3 flex items-center gap-2 border-b border-slate-300 bg-slate-50">
        {icon && <span className="text-slate-600">{icon}</span>}
        <span className="text-sm font-semibold text-slate-800">{label}</span>
        <span className="ml-auto text-xs font-medium text-slate-500 font-mono">{notation}</span>
      </div>

      {/* Premises Zone (Input Handles) */}
      {premises.length > 0 && (
        <div className="px-3 py-2 border-b border-slate-300">
          {premises.map((premise) => (
            <div key={premise.handleId} className="relative flex items-center min-h-[32px] py-1">
              {/* Input Handle (Left) */}
              <Handle
                type="target"
                position={Position.Left}
                id={premise.handleId}
                className={getTargetHandleClassName(premise.handleId)}
                style={{ top: '50%', transform: 'translateY(-50%)' }}
                data-handle-id={premise.handleId}
              />
              <div className="flex-1 ml-2">{premise.content}</div>
            </div>
          ))}
        </div>
      )}

      {/* Conclusions Zone (Output Handles) */}
      {conclusions.length > 0 && (
        <div className="px-3 py-2">
          {conclusions.map((conclusion) => (
            <div key={conclusion.handleId} className="relative flex items-center min-h-[32px] py-1">
              <div className="flex-1 mr-2">{conclusion.content}</div>
              {/* Output Handle (Right) */}
              <Handle
                type="source"
                position={Position.Right}
                id={conclusion.handleId}
                className={getSourceHandleClassName(conclusion.handleId)}
                style={{ top: '50%', transform: 'translateY(-50%)' }}
                data-handle-id={conclusion.handleId}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LogicNodeWrapper;
