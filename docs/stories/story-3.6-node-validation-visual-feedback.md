# Story 3.6: Node Validation Visual Feedback

**Epic:** [Epic 3: Connections & Real-Time Validation](../epics/epic-3-connections.md)  
**Status:** Ready for Development

## User Story

**As a** user,  
**I want** to see immediate visual feedback on nodes and connections when they are logically valid or invalid,  
**So that** I can identify and correct logical errors in my reasoning graph quickly.

## Context

Stories 3.2-3.5 implemented the backend validation engine that detects invalid connections, cycles, and logical errors. Story 2.5 created the NodeValidationIndicator placeholder component. This story completes the validation feedback loop by implementing the visual styling and user-facing error messages.

The front-end-spec.md defines validation as a core UX principle: "Validation Non-Bloquante - Guider visuellement sans empêcher l'exploration créative".

## Acceptance Criteria

1. **Invalid nodes** display with red border (`border-red-500`)
2. **Valid nodes** display with green border (`border-green-500`)
3. **Neutral nodes** (not yet validated or no connections) display with default gray border (`border-slate-300`)
4. **Invalid connections (edges)** display in red with animated pulse
5. **Valid connections** display in green
6. **FreeForm nodes** always display in warning/neutral state (yellow-orange border `border-amber-500`) with info icon
7. Warning icon (⚠️) appears in top-right corner of invalid nodes
8. Hovering over warning icon shows tooltip with validation error messages
9. Tooltip displays specific error: "Modus Ponens requires an implication (P→Q) as first premise" or "Cycle detected: cannot connect A → B → A"
10. Error messages are helpful and suggest solutions (per coding-standards.md)
11. Validation state updates in real-time as user edits propositions or adds connections
12. Validation state persists when zooming/panning canvas
13. Animation: Border color transitions smoothly (CSS transition)
14. Accessibility: Color alone is not the only indicator (icons + text in tooltips)

## Tasks / Subtasks

- [ ] Task 1: Update NodeValidationIndicator Component (AC: 1, 2, 3, 6, 7, 8)
  - [ ] Enhance `apps/web/components/nodes/NodeValidationIndicator.tsx` from Story 2.5
  - [ ] Accept props: `validationState`, `validationErrors`
  - [ ] Render border color based on state:
    ```typescript
    const borderColors = {
      valid: 'border-green-500',
      invalid: 'border-red-500',
      neutral: 'border-slate-300',
      warning: 'border-amber-500', // For FreeForm
    };
    ```
  - [ ] Display warning icon (⚠️) in top-right if invalid
  - [ ] Position icon absolutely within node container

- [ ] Task 2: Implement Error Tooltip (AC: 8, 9, 10, 14)
  - [ ] Create `NodeErrorTooltip.tsx` component
  - [ ] Trigger tooltip on hover over warning icon
  - [ ] Display validation error messages from `validationErrors` array
  - [ ] Format errors per coding-standards.md: "Problem + Cause + Solution"
  - [ ] Example: "Cannot connect: Modus Ponens requires an implication (P→Q) as first premise. Try connecting an implication node instead."
  - [ ] Support multiple errors (display as list)
  - [ ] Accessible: aria-label and role="tooltip"

- [ ] Task 3: Apply Border Styling to Node Wrappers (AC: 1, 2, 3, 6, 13)
  - [ ] Update LogicNodeWrapper.tsx from Story 2.5
  - [ ] Apply dynamic border class based on validationState
  - [ ] Add CSS transition: `transition-colors duration-300 ease-in-out`
  - [ ] Ensure border visible at all zoom levels
  - [ ] Test with all 9 node types

- [ ] Task 4: Edge (Connection) Visual Feedback (AC: 4, 5)
  - [ ] Create custom edge component `ValidatedEdge.tsx`
  - [ ] Accept validation state from edge data
  - [ ] Invalid edges: `stroke="red"` with animated pulse (CSS animation)
  - [ ] Valid edges: `stroke="green"`
  - [ ] Neutral edges: `stroke="gray"` (default)
  - [ ] Register custom edge type in React Flow:
    ```typescript
    const edgeTypes = {
      validated: ValidatedEdge,
    };
    ```

- [ ] Task 5: FreeForm Node Special Handling (AC: 6)
  - [ ] FreeForm nodes always set to `validationState: 'warning'`
  - [ ] Display amber/yellow border
  - [ ] Info icon (ℹ️) instead of warning icon
  - [ ] Tooltip: "FreeForm nodes allow flexible reasoning without strict validation"

- [ ] Task 6: Real-Time Validation Updates (AC: 11)
  - [ ] Hook into validation engine results from Story 3.2
  - [ ] When validation runs, update node `validationState` and `validationErrors` in Zustand store
  - [ ] React components re-render automatically via state subscription
  - [ ] Debounce validation for performance (<100ms per NFR2)

- [ ] Task 7: Error Message Library (AC: 9, 10)
  - [ ] Create `apps/web/lib/validationMessages.ts`
  - [ ] Map validation error codes to user-friendly messages:
    ```typescript
    const messages = {
      INVALID_PREMISE_TYPE: (nodeType, expectedType) =>
        `Cannot connect: ${nodeType} requires ${expectedType}. Try connecting a different node type.`,
      CYCLE_DETECTED: (path) =>
        `Cycle detected: ${path}. Remove one connection to break the cycle.`,
      MISSING_PREMISE: (nodeType, premiseIndex) =>
        `${nodeType} is incomplete: premise ${premiseIndex} not connected. Connect a node to this input.`,
    };
    ```
  - [ ] Follow coding-standards.md: helpful, non-blaming tone

- [ ] Task 8: Styling and Animation Polish (AC: 13, 14)
  - [ ] Smooth border color transitions (CSS)
  - [ ] Pulse animation for invalid edges:
    ```css
    @keyframes pulse-red {
      0%,
      100% {
        stroke-opacity: 1;
      }
      50% {
        stroke-opacity: 0.5;
      }
    }
    ```
  - [ ] Icon fade-in animation when validation changes
  - [ ] Ensure high contrast for accessibility (WCAG AA)

- [ ] Task 9: Integration with Validation Engine (AC: 11)
  - [ ] Story 3.2 validation engine returns `ValidationResult`
  - [ ] Extract node-level validation results
  - [ ] Update each node's state in store:
    ```typescript
    validationResults.nodes.forEach((nodeResult) => {
      updateNode(nodeResult.nodeId, {
        validationState: nodeResult.isValid ? 'valid' : 'invalid',
        validationErrors: nodeResult.errors,
      });
    });
    ```

- [ ] Task 10: Unit and Integration Tests
  - [ ] Test border colors render correctly per state
  - [ ] Test warning icon appears for invalid nodes
  - [ ] Test tooltip displays on hover with correct messages
  - [ ] Test FreeForm nodes show amber border
  - [ ] Test edge colors (red, green, gray)
  - [ ] Test real-time updates when validation state changes
  - [ ] Test accessibility (aria labels, keyboard navigation)
  - [ ] Test animation performance (no jank)

## Dev Notes

### Front-End Spec Reference

[Source: docs/front-end-spec.md - Design Principles]

**Validation Non-Bloquante:**

- Feedback visuel immédiat
- Ne pas empêcher l'utilisateur de continuer
- Guider vers corrections sans bloquer créativité

**Color System:**

- Valid Green: #10B981 (`border-green-500`)
- Invalid Red: #EF4444 (`border-red-500`)
- Neutral Gray: #E2E8F0 (`border-slate-300`)
- Warning Amber: #F59E0B (`border-amber-500`)

### Validation State Flow

```
User creates connection
  ↓
Connection added to edges
  ↓
Validation engine runs (Story 3.2)
  ↓
ValidationResult returned
  ↓
Node states updated in store
  ↓
React components re-render
  ↓
Visual feedback displayed (THIS STORY)
```

### Error Message Examples

**Good Error Messages (Coding Standards):**

```
❌ Bad: "Invalid connection"
✅ Good: "Cannot connect: Modus Ponens requires an implication (P→Q) as first premise. Try connecting an implication node instead."

❌ Bad: "Cycle"
✅ Good: "Cycle detected: A → B → C → A. Remove one connection to break the cycle."

❌ Bad: "Missing input"
✅ Good: "Modus Ponens is incomplete: second premise (P) not connected. Connect a node to this input."
```

### NodeValidationIndicator Enhanced

```tsx
interface NodeValidationIndicatorProps {
  validationState: 'valid' | 'invalid' | 'neutral' | 'warning';
  validationErrors?: string[];
}

export function NodeValidationIndicator({
  validationState,
  validationErrors,
}: NodeValidationIndicatorProps) {
  const borderColor = {
    valid: 'border-green-500',
    invalid: 'border-red-500',
    neutral: 'border-slate-300',
    warning: 'border-amber-500',
  }[validationState];

  return (
    <>
      {/* Border applied to parent wrapper */}
      {validationState === 'invalid' && validationErrors && (
        <div className="absolute top-2 right-2 group">
          <span className="text-red-500 text-xl cursor-help" aria-label="Validation errors">
            ⚠️
          </span>
          <NodeErrorTooltip errors={validationErrors} />
        </div>
      )}
      {validationState === 'warning' && (
        <div className="absolute top-2 right-2">
          <span
            className="text-amber-500 text-xl cursor-help"
            title="FreeForm node - flexible validation"
          >
            ℹ️
          </span>
        </div>
      )}
    </>
  );
}
```

### Custom Edge Component

```tsx
import { EdgeProps, getBezierPath } from 'reactflow';

export function ValidatedEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const strokeColor = {
    valid: '#10B981',
    invalid: '#EF4444',
    neutral: '#94A3B8',
  }[data?.validationState || 'neutral'];

  const animate = data?.validationState === 'invalid';

  return (
    <path
      d={edgePath}
      stroke={strokeColor}
      strokeWidth={2}
      fill="none"
      className={animate ? 'animate-pulse' : ''}
    />
  );
}
```

## Definition of Done

- [ ] NodeValidationIndicator component fully implemented
- [ ] Invalid nodes show red border
- [ ] Valid nodes show green border
- [ ] Neutral nodes show gray border
- [ ] FreeForm nodes show amber border with info icon
- [ ] Warning icon appears on invalid nodes
- [ ] Tooltip displays validation errors on hover
- [ ] Error messages are helpful and solution-oriented
- [ ] Invalid connections display in red with pulse
- [ ] Valid connections display in green
- [ ] Real-time validation updates working
- [ ] Smooth color transitions (CSS)
- [ ] Accessibility features implemented (WCAG AA)
- [ ] Unit tests passing
- [ ] Visual regression tests passing
- [ ] Code reviewed and approved
- [ ] Merged to main branch

## Estimated Effort

**3 points** (1-2 jours)

## Dependencies

- Story 2.5 (Logic Node Visual Components - needs NodeValidationIndicator placeholder)
- Story 3.2 (Logic Validation Engine - needs validation results)
- Story 2.7 (Proposition Inline Editing - validation triggers on edit)

## Blocks

- Story 3.4 (Validation Cascade Propagation - needs visual feedback)
- Story 5.3 (Container Validation Cascade - needs visual feedback for containers)
