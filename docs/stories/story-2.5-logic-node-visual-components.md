# Story 2.5: Logic Node Visual Components

**Epic:** [Epic 2: Node Types & Logic System](../epics/epic-2-node-types.md)  
**Status:** Ready for Development

## User Story

**As a** user,  
**I want** to see visual representations of each logic node type with their input/output ports clearly displayed,  
**So that** I can understand each node's logical function and connect them to build reasoning graphs.

## Context

Epic 2 Stories 2.1-2.4 implemented the backend TypeScript classes for all 9 logic node types. This story bridges the backend to the frontend by creating React components that render these nodes visually on the canvas with proper styling, ports, and proposition displays.

The front-end-spec.md defines the complete UX requirements for these components including notation, layout, colors, and interactions.

## Acceptance Criteria

1. React components created for all 9 logic node types: `AxiomNode`, `ModusPonensNode`, `ModusTollensNode`, `SyllogismNode`, `DisjunctionNode`, `ReductioAdAbsurdumNode`, `InductionNode`, `SimpleAffirmationNode`, `FreeFormNode`
2. Each component displays formal logic notation in header (P→Q, ¬P, P∨Q, etc.) per front-end-spec
3. Input handles (ports) are aligned on the left side of the node
4. Output handles (ports) are aligned on the right side of the node
5. Handles are visually aligned with their corresponding propositions
6. Empty propositions show placeholder text in gray (e.g., "P→Q", "P", "Conclusion")
7. Node size is dynamic based on content with constraints: min-width 200px, max-width 400px
8. `PropositionDisplay` component renders individual propositions with proper formatting
9. `NodeValidationIndicator` component shows validation state (will be styled in Story 3.6)
10. All components integrate with React Flow custom node types
11. Styling uses Tailwind CSS with design system colors from front-end-spec
12. Nodes are responsive to canvas zoom levels (scale appropriately)
13. Each component has proper TypeScript types
14. Unit tests verify: component rendering, handle positioning, proposition display, empty state placeholders

## Tasks / Subtasks

- [ ] Task 1: Create Base LogicNodeWrapper Component (AC: 3, 4, 7, 11, 12)
  - [ ] Create `apps/web/components/nodes/LogicNodeWrapper.tsx`
  - [ ] Implement header with node type label and formal notation
  - [ ] Implement input handles container (left side)
  - [ ] Implement output handles container (right side)
  - [ ] Apply Tailwind styling per design system (borders, shadows, rounded corners)
  - [ ] Implement dynamic sizing with min/max constraints
  - [ ] Add zoom-responsive scaling

- [ ] Task 2: Create PropositionDisplay Component (AC: 6, 8)
  - [ ] Create `apps/web/components/nodes/PropositionDisplay.tsx`
  - [ ] Display proposition content or placeholder if empty
  - [ ] Style placeholders in gray with formal notation
  - [ ] Add proper spacing and typography (JetBrains Mono for logic content)
  - [ ] Handle long text with ellipsis or text wrapping

- [ ] Task 3: Create NodeValidationIndicator Component (AC: 9)
  - [ ] Create `apps/web/components/nodes/NodeValidationIndicator.tsx`
  - [ ] Placeholder implementation (will be enhanced in Story 3.6)
  - [ ] Accept validation state prop: valid, invalid, neutral
  - [ ] Render empty div for now (styling comes later)

- [ ] Task 4: Implement Foundational Node Components (AC: 1, 2, 3, 4, 5)
  - [ ] Create `AxiomNode.tsx`: No input handles, 1 output handle
  - [ ] Create `SimpleAffirmationNode.tsx`: 1 input handle, 1 output handle
  - [ ] Use LogicNodeWrapper with appropriate configuration
  - [ ] Display formal notation: "Axiom", "⊢" for SimpleAffirmation

- [ ] Task 5: Implement Inference Node Components (AC: 1, 2, 3, 4, 5)
  - [ ] Create `ModusPonensNode.tsx`: 2 input handles (P→Q, P), 1 output (Q)
  - [ ] Create `ModusTollensNode.tsx`: 2 input handles (P→Q, ¬Q), 1 output (¬P)
  - [ ] Create `SyllogismNode.tsx`: 2 input handles (major, minor), 1 output
  - [ ] Create `DisjunctionNode.tsx`: 2 input handles (P∨Q, ¬P), 1 output (Q)
  - [ ] Display formal notation per front-end-spec

- [ ] Task 6: Implement Advanced Node Components (AC: 1, 2, 3, 4, 5)
  - [ ] Create `ReductioAdAbsurdumNode.tsx`: 1 input (P→⊥), 1 output (¬P)
  - [ ] Create `InductionNode.tsx`: 2 inputs (base case, inductive step), 1 output
  - [ ] Display formal notation per front-end-spec

- [ ] Task 7: Implement FreeFormNode Component (AC: 1, 2, 3, 4, 5)
  - [ ] Create `FreeFormNode.tsx`: Dynamic 0-5 input handles, 1-3 output handles
  - [ ] Implement dynamic handle rendering based on node data
  - [ ] Display "Free Form" label
  - [ ] Always show in neutral/warning validation state (no strict validation)

- [ ] Task 8: Integrate with React Flow (AC: 10)
  - [ ] Create node type registry in `apps/web/lib/nodeTypes.ts`
  - [ ] Map each component to React Flow node type
  - [ ] Export nodeTypes object for React Flow ReactFlowProvider
  - [ ] Update canvas to use custom node types

- [ ] Task 9: Handle Positioning and Alignment (AC: 3, 4, 5)
  - [ ] Position input handles on left edge at appropriate Y offsets
  - [ ] Position output handles on right edge at appropriate Y offsets
  - [ ] Align handles vertically with their corresponding proposition text
  - [ ] Use React Flow Handle component with proper positioning

- [ ] Task 10: Unit Tests (AC: 14)
  - [ ] Test each node component renders correctly
  - [ ] Test handle positioning (left/right, count)
  - [ ] Test proposition display with content and empty placeholders
  - [ ] Test formal notation appears in headers
  - [ ] Test dynamic sizing constraints
  - [ ] Mock React Flow context for isolated testing

## Dev Notes

### Front-End Spec References

[Source: docs/front-end-spec.md]

**Component Hierarchy:**

```
LogicNodeRenderer (wrapper for React Flow)
  ├─ AxiomNode
  ├─ ModusPonensNode
  ├─ ModusTollensNode
  ├─ SyllogismNode
  ├─ DisjunctionNode
  ├─ ReductioAdAbsurdumNode
  ├─ InductionNode
  ├─ SimpleAffirmationNode
  └─ FreeFormNode
      ├─ PropositionDisplay (used by all)
      └─ NodeValidationIndicator (used by all)
```

**Design System Colors:**

- Primary Blue: #2563EB
- Secondary Slate: #475569
- Valid Green: #10B981
- Invalid Red: #EF4444
- Background Light: #F8FAFC
- Background Dark: #0F172A
- Border Neutral: #E2E8F0

**Typography:**

- UI Text: Inter (sans-serif)
- Logic Content: JetBrains Mono (monospace)

**Node Structure:**

```
┌─────────────────────────┐
│ [Icon] Node Type Label  │ ← Header with formal notation
├─────────────────────────┤
│ ○ Premise 1: P→Q       │ ← Input handle + proposition
│ ○ Premise 2: P         │
│                         │
│         Conclusion: Q ○ │ ← Output handle + proposition
└─────────────────────────┘
```

### React Flow Integration

**Custom Node Type Registration:**

```typescript
import { NodeTypes } from 'reactflow';

export const nodeTypes: NodeTypes = {
  axiom: AxiomNode,
  modusPonens: ModusPonensNode,
  modusTollens: ModusTollensNode,
  syllogism: SyllogismNode,
  disjunction: DisjunctionNode,
  reductioAdAbsurdum: ReductioAdAbsurdumNode,
  induction: InductionNode,
  simpleAffirmation: SimpleAffirmationNode,
  freeForm: FreeFormNode,
};
```

**Handle Positioning:**

```typescript
import { Handle, Position } from 'reactflow';

// Input handle (left side)
<Handle
  type="target"
  position={Position.Left}
  id={`input-${index}`}
  style={{ top: `${yOffset}px` }}
/>

// Output handle (right side)
<Handle
  type="source"
  position={Position.Right}
  id={`output-${index}`}
  style={{ top: `${yOffset}px` }}
/>
```

### Node Data Structure

Each node receives data from React Flow:

```typescript
interface LogicNodeData {
  nodeType: string;
  label: string;
  premises: Proposition[];
  conclusions: Proposition[];
  validationState: 'valid' | 'invalid' | 'neutral';
  annotation?: string;
}
```

### Testing Strategy

**Component Tests:**

```typescript
import { render, screen } from '@testing-library/react';
import { ReactFlowProvider } from 'reactflow';
import ModusPonensNode from './ModusPonensNode';

describe('ModusPonensNode', () => {
  it('renders with formal notation P→Q', () => {
    const mockData = {
      nodeType: 'modusPonens',
      label: 'Modus Ponens',
      premises: [{ content: '', type: 'implication' }, { content: '', type: 'simple' }],
      conclusions: [{ content: '', type: 'simple' }],
      validationState: 'neutral',
    };

    render(
      <ReactFlowProvider>
        <ModusPonensNode data={mockData} />
      </ReactFlowProvider>
    );

    expect(screen.getByText(/P→Q/)).toBeInTheDocument();
    expect(screen.getByText(/P/)).toBeInTheDocument();
  });
});
```

## Definition of Done

- [ ] All 9 node type components created and functional
- [ ] Components integrate with React Flow custom nodes
- [ ] Formal notation displays correctly per front-end-spec
- [ ] Input handles positioned left, output handles right
- [ ] Handles aligned with propositions
- [ ] Empty propositions show placeholders
- [ ] Dynamic sizing with constraints working
- [ ] PropositionDisplay component created
- [ ] NodeValidationIndicator placeholder created
- [ ] Tailwind styling matches design system
- [ ] Zoom-responsive scaling works
- [ ] TypeScript types properly defined
- [ ] Unit tests passing with >80% coverage
- [ ] Code reviewed and approved
- [ ] Merged to main branch

## Estimated Effort

**8 points** (4-5 jours)

## Dependencies

- Story 2.4 (Concrete Node Type Implementations - backend classes)
- Story 1.4 (Canvas & React Flow Integration)
- Story 1.1 (Tailwind CSS setup)

## Blocks

- Story 2.6 (Node Type Creation Menu - needs these components)
- Story 2.7 (Proposition Inline Editing - needs PropositionDisplay)
- Story 3.1 (Connection Modes - needs visual handles)
- Story 3.6 (Node Validation Visual Feedback - needs NodeValidationIndicator)
