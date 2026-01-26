/**
 * PropositionDisplay Component
 *
 * Renders individual propositions with proper formatting:
 * - Displays proposition content or placeholder if empty
 * - Styles placeholders in gray with formal notation
 * - Handles long text with ellipsis
 */

import React from 'react';

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
}

/**
 * PropositionDisplay renders a single proposition with appropriate styling
 */
export const PropositionDisplay: React.FC<PropositionDisplayProps> = ({
  content,
  placeholder,
  isEmpty,
  maxLength = 200,
}) => {
  // Truncate text if needed
  const displayText = isEmpty
    ? placeholder
    : content.length > maxLength
      ? `${content.substring(0, maxLength)}...`
      : content;

  return (
    <div className="w-full">
      {isEmpty ? (
        <span className="text-sm text-slate-400 italic font-mono">{displayText}</span>
      ) : (
        <span className="text-sm text-slate-800 break-words">{displayText}</span>
      )}
    </div>
  );
};

export default PropositionDisplay;
