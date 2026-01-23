# Story 2.7: Proposition Inline Editing

**Epic:** [Epic 2: Node Types & Logic System](../epics/epic-2-node-types.md)  
**Status:** Ready for Development

## User Story

**As a** user,  
**I want** to edit proposition content directly within nodes by double-clicking,  
**So that** I can quickly input and modify my logical statements without complex forms or dialogs.

## Context

Logic nodes display propositions (premises and conclusions) created in Story 2.5. Users need a natural, inline editing experience to enter proposition content. The front-end-spec.md defines this as Flow 1's primary interaction.

For complex propositions (Implication, Disjunction, etc.), users should be able to edit sub-propositions individually while maintaining the logical structure.

## Acceptance Criteria

1. Double-clicking on any proposition text activates inline edit mode
2. Edit mode displays a text input field replacing the proposition display
3. Input field is pre-filled with current proposition content (or empty)
4. Pressing Enter or clicking outside saves the changes
5. Pressing ESC cancels editing and restores original content
6. For complex propositions (e.g., Implication P→Q), users can edit antecedent (P) and consequent (Q) separately
7. For simple propositions, single text input field
8. For FreeForm nodes, users can add/remove premises and conclusions dynamically
9. When a proposition changes, any existing connections to/from that proposition are automatically broken
10. Visual feedback shows connection breakage (toast notification: "Connections removed due to proposition change")
11. Empty propositions show placeholders per Story 2.5 (not in edit mode)
12. Edited propositions trigger immediate validation (though validation display comes in Story 3.6)
13. Long text wraps appropriately or shows ellipsis
14. Input field auto-focuses when edit mode activates

## Tasks / Subtasks

- [ ] Task 1: Create PropositionEditor Component (AC: 1, 2, 3, 4, 5, 14)
  - [ ] Create `apps/web/components/nodes/PropositionEditor.tsx`
  - [ ] Accept props: proposition, onSave, onCancel, type (simple/complex)
  - [ ] Render text input with current content
  - [ ] Auto-focus input on mount
  - [ ] Handle Enter key to save
  - [ ] Handle ESC key to cancel
  - [ ] Handle blur (click outside) to save
  - [ ] Emit onSave with new content or onCancel

- [ ] Task 2: Integrate with PropositionDisplay (AC: 1, 11)
  - [ ] Update PropositionDisplay to support edit mode toggle
  - [ ] Add double-click handler to activate edit mode
  - [ ] Switch between display and edit components
  - [ ] Maintain edit state (isEditing) in component
  - [ ] Pass proposition data to editor

- [ ] Task 3: Handle Complex Propositions (AC: 6, 7)
  - [ ] For ImplicationProposition (P→Q): Two input fields labeled "P" and "Q"
  - [ ] For DisjunctionProposition (P∨Q): Two input fields "P" and "Q"
  - [ ] For ConjunctionProposition (P∧Q): Two input fields "P" and "Q"
  - [ ] For NegationProposition (¬P): Single input field "P"
  - [ ] For SimpleProposition: Single input field
  - [ ] Display logical operator symbol between fields (→, ∨, ∧, ¬)

- [ ] Task 4: Connection Breakage Logic (AC: 9, 10)
  - [ ] When proposition content changes, identify affected edges
  - [ ] Remove edges connected to the modified proposition's handle
  - [ ] Update React Flow edges state
  - [ ] Show toast notification: "Connections removed due to proposition change"
  - [ ] Log action for potential undo feature (future)

- [ ] Task 5: FreeForm Node Dynamic Editing (AC: 8)
  - [ ] FreeForm nodes allow adding premises (up to 5)
  - [ ] FreeForm nodes allow adding conclusions (up to 3)
  - [ ] Display "+ Add Premise" and "+ Add Conclusion" buttons
  - [ ] Allow removing premises/conclusions (with confirmation if not empty)
  - [ ] Update node handles dynamically when premises/conclusions change
  - [ ] Revalidate node after structural changes

- [ ] Task 6: Validation Trigger (AC: 12)
  - [ ] After proposition edit, trigger node validation
  - [ ] Call validation engine with updated node data
  - [ ] Update node validationState in store
  - [ ] (Visual feedback will be implemented in Story 3.6)

- [ ] Task 7: Input Styling and UX Polish (AC: 13, 14)
  - [ ] Input field matches node styling (border, font, colors)
  - [ ] JetBrains Mono font for logic content
  - [ ] Placeholder text in gray
  - [ ] Input expands to fit content (within max width)
  - [ ] Cursor auto-positioned at end of text
  - [ ] Visual highlight indicates active edit mode (blue border)

- [ ] Task 8: Edge Cases and Validation (AC: All)
  - [ ] Empty input allowed (proposition remains empty)
  - [ ] Very long text handling (max length or truncation)
  - [ ] Special characters allowed (unicode symbols for logic)
  - [ ] Multiple simultaneous edits prevented (one at a time)
  - [ ] Edit mode disabled during drag operations

- [ ] Task 9: Unit and Integration Tests
  - [ ] Test double-click activates edit mode
  - [ ] Test Enter saves changes
  - [ ] Test ESC cancels changes
  - [ ] Test click outside saves changes
  - [ ] Test complex proposition editing (P→Q split fields)
  - [ ] Test connection breakage on edit
  - [ ] Test FreeForm add/remove premises
  - [ ] Test validation trigger after edit
  - [ ] Test auto-focus behavior

## Dev Notes

### Front-End Spec Reference

[Source: docs/front-end-spec.md - User Flows - Flow 1]

**Edit Flow:**

```
User creates Modus Ponens node
  ↓
Node shows placeholders: "P→Q", "P"
  ↓
User double-clicks "P→Q" premise
  ↓
Inline editor opens with two fields: [P:___] → [Q:___]
  ↓
User types: [Si il pleut] → [sol mouillé]
  ↓
Press Enter or click outside
  ↓
Proposition saved: "Si il pleut → sol mouillé"
  ↓
Node ready for connections
```

### Complex Proposition Editor Example

```tsx
// For Implication: P→Q
<div className="flex items-center gap-2">
  <input
    type="text"
    value={antecedent}
    onChange={(e) => setAntecedent(e.target.value)}
    placeholder="P"
    className="flex-1 px-2 py-1 border rounded"
  />
  <span className="text-slate-500">→</span>
  <input
    type="text"
    value={consequent}
    onChange={(e) => setConsequent(e.target.value)}
    placeholder="Q"
    className="flex-1 px-2 py-1 border rounded"
  />
</div>
```

### Connection Breakage Logic

```typescript
function handlePropositionChange(nodeId: string, propositionId: string) {
  // Find all edges connected to this proposition's handle
  const affectedEdges = edges.filter(
    (edge) =>
      (edge.source === nodeId && edge.sourceHandle?.includes(propositionId)) ||
      (edge.target === nodeId && edge.targetHandle?.includes(propositionId))
  );

  if (affectedEdges.length > 0) {
    // Remove edges
    setEdges(edges.filter((e) => !affectedEdges.includes(e)));

    // Show notification
    toast.info(`${affectedEdges.length} connection(s) removed due to proposition change`);
  }
}
```

### FreeForm Dynamic Structure

```typescript
// FreeForm node allows dynamic premises/conclusions
interface FreeFormNodeData {
  premises: Proposition[]; // 0-5
  conclusions: Proposition[]; // 1-3
}

function addPremise(nodeId: string) {
  const node = getNode(nodeId);
  if (node.data.premises.length >= 5) {
    toast.error('Maximum 5 premises for FreeForm nodes');
    return;
  }

  const newPremise = createSimpleProposition('');
  updateNode(nodeId, {
    premises: [...node.data.premises, newPremise],
  });
}
```

### Validation Integration

```typescript
import { validateNode } from '@reasoning-graph/graph-engine';

async function handlePropositionSave(nodeId: string, propositionId: string, newContent: string) {
  // Update proposition content
  updateProposition(nodeId, propositionId, newContent);

  // Break connections
  handlePropositionChange(nodeId, propositionId);

  // Trigger validation
  const node = getNode(nodeId);
  const edges = getEdges();
  const validationResult = validateNode(node, edges);

  updateNode(nodeId, {
    validationState: validationResult.isValid ? 'valid' : 'invalid',
    validationErrors: validationResult.errors,
  });
}
```

## Definition of Done

- [ ] PropositionEditor component created
- [ ] Double-click activates inline edit mode
- [ ] Enter saves, ESC cancels, blur saves
- [ ] Simple propositions: single input field
- [ ] Complex propositions: multiple input fields per sub-proposition
- [ ] FreeForm nodes: add/remove premises and conclusions
- [ ] Connection breakage on proposition change
- [ ] Toast notification for connection removal
- [ ] Validation triggered after edit
- [ ] Input styling matches design system
- [ ] Auto-focus on edit activation
- [ ] Edge cases handled (empty, long text, special chars)
- [ ] Unit tests passing
- [ ] Integration tests for edit flows
- [ ] Code reviewed and approved
- [ ] Merged to main branch

## Estimated Effort

**5 points** (2-3 jours)

## Dependencies

- Story 2.5 (Logic Node Visual Components - needs PropositionDisplay)
- Story 2.1 (Proposition System - proposition types)
- Story 3.2 (Logic Validation Engine - for validation trigger)

## Blocks

- Epic 3 Stories (Connections need editable propositions)
- Story 3.6 (Visual validation feedback needs validation triggered)
