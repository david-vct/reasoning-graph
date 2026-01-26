/**
 * NodeValidationIndicator Component
 *
 * Placeholder implementation for validation state visual feedback.
 * Will be enhanced in Story 3.6 with full styling and animations.
 */

import React from 'react';

export interface NodeValidationIndicatorProps {
  /** Validation state: valid, invalid, or neutral */
  validationState: 'valid' | 'invalid' | 'neutral';
  /** Error messages to display (if any) */
  errors?: string[];
}

/**
 * NodeValidationIndicator shows validation state (placeholder for Story 3.6)
 */
export const NodeValidationIndicator: React.FC<NodeValidationIndicatorProps> = ({
  validationState,
}) => {
  // Placeholder implementation - will be styled in Story 3.6
  return <div className="hidden" data-validation-state={validationState} />;
};

export default NodeValidationIndicator;
