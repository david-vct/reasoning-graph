/**
 * PropositionDisplay Component
 *
 * Renders individual propositions with proper formatting:
 * - Displays proposition content or placeholder if empty
 * - Styles placeholders in gray with formal notation
 * - Handles long text with ellipsis
 * - Supports inline editing on double-click
 */

import React, { useState } from 'react';
import { PropositionEditor } from './PropositionEditor';

export interface PropositionDisplayProps {
  /** Unique identifier for the proposition */
  id: string;
  /** Content of the proposition */
  content: string;
  /** Placeholder text to show when empty (formal notation) */
  placeholder: string;
  /** Whether the proposition is empty */
  isEmpty: boolean;
  /** Type of proposition (premise or conclusion) */
  type: 'premise' | 'conclusion';
  /** Maximum text length before truncation */
  maxLength?: number;
  /** Callback when content is saved */
  onSave?: (newContent: string) => void;
  /** Whether editing is disabled */
  disabled?: boolean;
}

/**
 * PropositionDisplay renders a single proposition with appropriate styling
 * Supports inline editing via double-click
 */
export const PropositionDisplay: React.FC<PropositionDisplayProps> = ({
  content,
  placeholder,
  isEmpty,
  maxLength = 200,
  onSave,
  disabled = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  // Truncate text if needed
  const displayText = isEmpty
    ? placeholder
    : content.length > maxLength
      ? `${content.substring(0, maxLength)}...`
      : content;

  const handleDoubleClick = () => {
    if (!disabled && onSave) {
      setIsEditing(true);
    }
  };

  const handleSave = (newContent: string) => {
    setIsEditing(false);
    if (onSave && newContent !== content) {
      onSave(newContent);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <PropositionEditor
        content={content}
        placeholder={placeholder}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <div
      className="w-full cursor-text hover:bg-slate-50 rounded px-1 transition-colors"
      onDoubleClick={handleDoubleClick}
      title={!isEmpty && content.length > maxLength ? content : undefined}
    >
      {isEmpty ? (
        <span className="text-sm text-slate-400 italic font-mono">{displayText}</span>
      ) : (
        <span className="text-sm text-slate-800 break-words font-mono">{displayText}</span>
      )}
    </div>
  );
};

export default PropositionDisplay;
