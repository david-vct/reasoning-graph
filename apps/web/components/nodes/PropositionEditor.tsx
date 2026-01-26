/**
 * PropositionEditor Component
 *
 * Inline editor for proposition content
 * - Auto-focuses input on mount
 * - Saves on Enter or blur
 * - Cancels on ESC
 */

import React, { useEffect, useRef, KeyboardEvent } from 'react';

export interface PropositionEditorProps {
  /** Current content of the proposition */
  content: string;
  /** Placeholder text */
  placeholder: string;
  /** Callback when save is triggered */
  onSave: (newContent: string) => void;
  /** Callback when cancel is triggered */
  onCancel: () => void;
  /** Whether this is a complex proposition part */
  isComplex?: boolean;
  /** Label for complex proposition parts (e.g., "P", "Q") */
  label?: string;
}

/**
 * PropositionEditor - Inline text editor for propositions
 */
export const PropositionEditor: React.FC<PropositionEditorProps> = ({
  content,
  placeholder,
  onSave,
  onCancel,
  label,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = React.useState(content);

  // Auto-focus on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      // Position cursor at end
      inputRef.current.setSelectionRange(value.length, value.length);
    }
  }, [value.length]);

  const handleSave = () => {
    onSave(value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onCancel();
    }
  };

  const handleBlur = () => {
    handleSave();
  };

  return (
    <div className="flex items-center gap-2 w-full">
      {label && <span className="text-sm text-slate-500 font-semibold">{label}:</span>}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder={placeholder}
        className="flex-1 px-2 py-1 text-sm text-slate-900 border-2 border-blue-400 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
      />
    </div>
  );
};

export default PropositionEditor;
