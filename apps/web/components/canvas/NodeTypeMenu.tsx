'use client';

import { useEffect, useRef, useMemo } from 'react';
import { NodeType, nodeTypeRegistry, NodeCategory } from '@reasoning-graph/graph-engine';
import NodeTypeMenuItem from './NodeTypeMenuItem';

export interface NodeTypeMenuProps {
  x: number;
  y: number;
  onSelectType: (type: NodeType) => void;
  onClose: () => void;
}

interface CategoryConfig {
  key: NodeCategory;
  label: string;
  emoji: string;
}

const CATEGORIES: CategoryConfig[] = [
  { key: 'foundational', label: 'Foundational', emoji: '📋' },
  { key: 'inference', label: 'Inference', emoji: '🧠' },
  { key: 'advanced', label: 'Advanced', emoji: '🎓' },
  { key: 'special', label: 'Special', emoji: '🆓' },
];

/**
 * Categorized node type selection menu
 * Displays all available logic node types organized by category
 */
export default function NodeTypeMenu({ x, y, onSelectType, onClose }: NodeTypeMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // Get all node types organized by category
  const categorizedTypes = useMemo(() => {
    return CATEGORIES.map((category) => ({
      ...category,
      types: nodeTypeRegistry.getByCategory(category.key),
    })).filter((category) => category.types.length > 0);
  }, []);

  // Adjust position if near screen edges
  const adjustedPosition = useMemo(() => {
    const menuWidth = 320;
    const menuHeight = 500;
    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;

    let adjustedX = x;
    let adjustedY = y;

    // Flip horizontally if too close to right edge
    if (x + menuWidth > windowWidth - 20) {
      adjustedX = x - menuWidth;
    }

    // Flip vertically if too close to bottom edge
    if (y + menuHeight > windowHeight - 20) {
      adjustedY = y - menuHeight;
    }

    return { x: Math.max(10, adjustedX), y: Math.max(10, adjustedY) };
  }, [x, y]);

  // Handle click outside and ESC key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleSelectType = (type: NodeType) => {
    onSelectType(type);
    onClose();
  };

  return (
    <div
      ref={menuRef}
      style={{
        position: 'fixed',
        left: `${adjustedPosition.x}px`,
        top: `${adjustedPosition.y}px`,
        zIndex: 1000,
      }}
      className="bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 min-w-[320px] max-h-[500px] overflow-y-auto"
      data-testid="node-type-menu"
    >
      <div className="py-2">
        <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Create Logic Node
          </h3>
        </div>

        {categorizedTypes.map((category) => (
          <div key={category.key} className="py-2">
            <div className="px-4 py-1">
              <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {category.emoji} {category.label}
              </h4>
            </div>
            <div className="space-y-0.5">
              {category.types.map((nodeType) => (
                <NodeTypeMenuItem
                  key={nodeType.type}
                  type={nodeType.type}
                  label={nodeType.label}
                  icon={nodeType.icon}
                  notation={nodeType.notation}
                  onClick={handleSelectType}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
