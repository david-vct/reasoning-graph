'use client';

import { memo, useState, useCallback, useEffect, useRef } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { useGraphStore } from '@/lib/store/graphStore';

interface SimpleNodeData {
  text: string;
}

const MAX_CHARACTERS = 50;

function SimpleNode({ id, data, selected }: NodeProps<SimpleNodeData>) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(data.text || '');
  const updateNodeData = useGraphStore((state) => state.updateNodeData);
  const setSelectedNode = useGraphStore((state) => state.setSelectedNode);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize text from data on mount only
  useEffect(() => {
    setText(data.text || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleDoubleClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
    updateNodeData(id, { text });
  }, [id, text, updateNodeData]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARACTERS) {
      setText(value);
    }
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        setIsEditing(false);
        updateNodeData(id, { text });
      }
      if (e.key === 'Escape') {
        setIsEditing(false);
        setText(data.text || '');
      }
    },
    [id, text, data.text, updateNodeData]
  );

  const handleClick = useCallback(() => {
    setSelectedNode(id);
  }, [id, setSelectedNode]);

  return (
    <div
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      className={`px-4 py-3 rounded-lg border-2 bg-white shadow-md transition-all cursor-pointer min-w-[200px] ${
        selected ? 'border-blue-500 shadow-lg' : 'border-gray-300'
      }`}
    >
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder="Enter your statement..."
          maxLength={MAX_CHARACTERS}
          className="w-full outline-none text-sm text-gray-900 border-b border-blue-400 focus:border-blue-500"
        />
      ) : (
        <div className="text-sm text-gray-900">
          {text || <span className="text-gray-400 italic">Enter your statement...</span>}
        </div>
      )}
      <div className="text-xs text-gray-400 mt-1 text-right">
        {text.length}/{MAX_CHARACTERS}
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  );
}

export default memo(SimpleNode);
