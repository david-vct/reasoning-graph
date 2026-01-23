# Story 2.6: Node Type Creation Menu

**Epic:** [Epic 2: Node Types & Logic System](../epics/epic-2-node-types.md)  
**Status:** Ready for Development

## User Story

**As a** user,  
**I want** to select from a categorized menu of all available logic node types when creating a new node,  
**So that** I can quickly find and create the appropriate node type for my reasoning.

## Context

Story 1.5 implemented a simple right-click menu with "Create Simple Node" option. Now that we have 9 different logic node types (Story 2.5), we need a professional node creation palette that organizes types by category and displays formal notation to help users identify the right logical form.

The front-end-spec.md describes this as the primary interaction for node creation with categorization and visual affordances.

## Acceptance Criteria

1. Right-click on canvas opens a categorized node type selection menu
2. Menu displays 4 categories: **Foundational**, **Inference**, **Advanced**, **Special**
3. Each category shows its node types with: icon, label, and formal notation (e.g., "Modus Ponens (P→Q, P ⊢ Q)")
4. **Foundational** category contains: Axiom, Simple Affirmation
5. **Inference** category contains: Modus Ponens, Modus Tollens, Syllogism, Disjunction
6. **Advanced** category contains: Reductio Ad Absurdum, Induction
7. **Special** category contains: Free Form
8. Selecting a node type creates the node at the clicked position
9. Menu closes after selection or when clicking outside
10. ESC key closes the menu without creating a node
11. Menu styling matches design system (Tailwind, proper spacing, hover states)
12. Menu is positioned at cursor location or adjusted if near screen edges
13. Categories are collapsible/expandable (optional enhancement)

## Tasks / Subtasks

- [ ] Task 1: Create NodeTypeMenu Component (AC: 1, 9, 10, 11, 12)
  - [ ] Create `apps/web/components/canvas/NodeTypeMenu.tsx`
  - [ ] Accept props: position (x, y), onSelectType callback, onClose callback
  - [ ] Implement menu container with proper positioning
  - [ ] Add Tailwind styling per design system (shadow, rounded, background)
  - [ ] Handle click outside to close menu
  - [ ] Handle ESC key press to close menu
  - [ ] Position adjustment logic for screen edges

- [ ] Task 2: Implement Category Structure (AC: 2, 3, 4, 5, 6, 7)
  - [ ] Define node type categories data structure
  - [ ] Create category sections in menu UI
  - [ ] Map node types to categories per front-end-spec:
    ```typescript
    const categories = {
      foundational: ['axiom', 'simpleAffirmation'],
      inference: ['modusPonens', 'modusTollens', 'syllogism', 'disjunction'],
      advanced: ['reductioAdAbsurdum', 'induction'],
      special: ['freeForm'],
    };
    ```
  - [ ] Fetch node type metadata from nodeTypeRegistry (labels, icons, notation)

- [ ] Task 3: Create NodeTypeMenuItem Component (AC: 3, 11)
  - [ ] Create `apps/web/components/canvas/NodeTypeMenuItem.tsx`
  - [ ] Display: icon + label + formal notation
  - [ ] Example: "🔹 Modus Ponens (P→Q, P ⊢ Q)"
  - [ ] Implement hover state (background color change)
  - [ ] Click handler to trigger node creation
  - [ ] Proper typography: Inter for label, JetBrains Mono for notation

- [ ] Task 4: Integrate with Canvas (AC: 1, 8)
  - [ ] Update canvas component to handle right-click event
  - [ ] Show NodeTypeMenu at cursor position
  - [ ] Pass onSelectType callback that creates node
  - [ ] Use createNode factory from graph-engine with selected type
  - [ ] Add node to React Flow nodes state at clicked position
  - [ ] Close menu after node creation

- [ ] Task 5: Node Creation Logic (AC: 8)
  - [ ] When node type selected, call createNode(type, { position })
  - [ ] Generate unique node ID
  - [ ] Initialize node with empty propositions
  - [ ] Set default validation state to 'neutral'
  - [ ] Add node to canvas via React Flow addNodes action
  - [ ] Focus on newly created node (select it)

- [ ] Task 6: Styling and Polish (AC: 11, 12)
  - [ ] Apply design system colors (Primary Blue for hover, borders)
  - [ ] Add subtle animations (fade in menu, scale on hover)
  - [ ] Ensure proper z-index (menu above canvas)
  - [ ] Test menu positioning near screen edges (flip if needed)
  - [ ] Responsive sizing for different zoom levels

- [ ] Task 7: (Optional) Collapsible Categories (AC: 13)
  - [ ] Add expand/collapse icon to category headers
  - [ ] Track expanded state per category
  - [ ] Default: all categories expanded
  - [ ] Persist preference in local storage (optional)

- [ ] Task 8: Replace Old Simple Node Menu (AC: 1)
  - [ ] Remove old "Create Simple Node" menu from Story 1.5
  - [ ] Ensure no references to old menu remain
  - [ ] Update any tests that relied on old menu

- [ ] Task 9: Unit and Integration Tests
  - [ ] Test menu opens on right-click
  - [ ] Test all 9 node types appear in correct categories
  - [ ] Test selecting a type creates node at position
  - [ ] Test ESC key closes menu
  - [ ] Test click outside closes menu
  - [ ] Test menu positioning logic
  - [ ] Test node creation with proper initialization

## Dev Notes

### Node Type Registry Integration

Use the nodeTypeRegistry from graph-engine to get metadata:

```typescript
import { nodeTypeRegistry } from '@reasoning-graph/graph-engine';

const nodeTypes = nodeTypeRegistry.getAllTypes().map((def) => ({
  type: def.type,
  label: def.label,
  notation: def.notation, // "P→Q, P ⊢ Q"
  category: def.category, // 'inference'
  icon: def.icon, // '🔹'
}));
```

### Front-End Spec Reference

[Source: docs/front-end-spec.md - Section "User Flows - Flow 1"]

**Menu Structure:**

```
Right-click canvas
  ↓
┌─────────────────────────────────┐
│ Create Logic Node               │
├─────────────────────────────────┤
│ 📋 Foundational                 │
│   🔸 Axiom (Hypothesis)         │
│   ⊢  Simple Affirmation         │
│                                 │
│ 🧠 Inference                    │
│   🔹 Modus Ponens (P→Q, P ⊢ Q) │
│   🔹 Modus Tollens (P→Q,¬Q ⊢ ¬P)│
│   🔹 Syllogism                  │
│   🔹 Disjunction (P∨Q,¬P ⊢ Q)  │
│                                 │
│ 🎓 Advanced                     │
│   🔺 Reductio Ad Absurdum       │
│   ♾️  Induction                 │
│                                 │
│ 🆓 Special                      │
│   📝 Free Form                  │
└─────────────────────────────────┘
```

### Menu Positioning Logic

```typescript
function getMenuPosition(
  clickX: number,
  clickY: number,
  menuWidth: number,
  menuHeight: number
): { x: number; y: number } {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  let x = clickX;
  let y = clickY;

  // Flip horizontally if too close to right edge
  if (clickX + menuWidth > windowWidth - 20) {
    x = clickX - menuWidth;
  }

  // Flip vertically if too close to bottom edge
  if (clickY + menuHeight > windowHeight - 20) {
    y = clickY - menuHeight;
  }

  return { x, y };
}
```

### Tailwind Styling

```tsx
<div
  className="
  absolute 
  bg-white dark:bg-slate-800 
  rounded-lg 
  shadow-xl 
  border border-slate-200 dark:border-slate-700
  min-w-[280px]
  max-h-[500px]
  overflow-y-auto
  z-50
"
>
  {/* Menu content */}
</div>
```

## Definition of Done

- [ ] NodeTypeMenu component created and functional
- [ ] Right-click opens menu at cursor position
- [ ] All 9 node types displayed in correct categories
- [ ] Categories labeled: Foundational, Inference, Advanced, Special
- [ ] Each item shows icon, label, and formal notation
- [ ] Selecting a type creates node at clicked position
- [ ] Menu closes on selection, ESC, or click outside
- [ ] Menu positioning handles screen edges
- [ ] Styling matches design system
- [ ] Old simple node menu removed
- [ ] Unit tests passing
- [ ] Integration test for node creation workflow
- [ ] Code reviewed and approved
- [ ] Merged to main branch

## Estimated Effort

**3 points** (1-2 jours)

## Dependencies

- Story 2.5 (Logic Node Visual Components - needs node types to exist)
- Story 2.4 (Node Type Implementations - backend classes)
- Story 1.4 (Canvas & React Flow Integration)

## Blocks

- Story 2.7 (Proposition Inline Editing - users need to create nodes first)
- Epic 3 Stories (Connections - users need to create typed nodes first)
