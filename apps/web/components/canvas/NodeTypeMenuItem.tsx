'use client';

import { NodeType } from '@reasoning-graph/graph-engine';

export interface NodeTypeMenuItemProps {
  type: NodeType;
  label: string;
  icon?: string;
  notation?: string;
  onClick: (type: NodeType) => void;
}

/**
 * Single menu item for node type selection
 * Displays icon, label, and formal notation with hover state
 */
export default function NodeTypeMenuItem({
  type,
  label,
  icon,
  notation,
  onClick,
}: NodeTypeMenuItemProps) {
  const handleClick = () => {
    onClick(type);
  };

  return (
    <button
      onClick={handleClick}
      className="w-full text-left px-4 py-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex items-center gap-2 group"
      data-testid={`node-type-${type}`}
    >
      {icon && <span className="text-lg flex-shrink-0">{icon}</span>}
      <div className="flex-1 min-w-0">
        <span className="text-sm text-gray-700 dark:text-gray-200">{label}</span>
        {notation && (
          <span className="ml-2 text-xs font-mono text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400">
            ({notation})
          </span>
        )}
      </div>
    </button>
  );
}
