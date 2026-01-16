# Story 1.5: Create Simple Nodes

**Epic:** [Epic 1: Foundation & Core Graph Infrastructure](../epics/epic-1-foundation.md)  
**Status:** Done  
**Created:** January 16, 2026

## Story

**As a** user,  
**I want** to create simple nodes by right-clicking on the canvas,  
**so that** I can start building my reasoning graph.

## Acceptance Criteria

1. A right-click on canvas opens a contextual menu at cursor position
2. Menu contains an option "Create Simple Node"
3. Selecting the option creates a new node at clicked position
4. Node displays a rounded rectangle with border (design per UI Goals)
5. Node contains an editable text field (placeholder: "Enter your statement...")
6. Node can be selected (border highlight) by clicking on it
7. Node can be moved by drag & drop
8. A selected node can be deleted with "Delete" or "Backspace" key
9. Node text is saved in Zustand state upon editing
10. Maximum 50 characters for node text (MVP constraint for layout)

## Tasks / Subtasks

- [ ] Task 1: Install Zustand for State Management (AC: 9)
  - [ ] Install `zustand@^4.5.0` in `apps/web`
  - [ ] Verify installation with `npm list zustand`

- [ ] Task 2: Create Zustand Graph Store (AC: 9)
  - [ ] Create `apps/web/stores/graphStore.ts`
  - [ ] Define `GraphStore` interface with `nodes`, `edges`, `selectedNodeIds`
  - [ ] Implement `addNode(node)` action
  - [ ] Implement `updateNode(id, updates)` action
  - [ ] Implement `deleteNode(id)` action
  - [ ] Implement `selectNode(id)` action
  - [ ] Use `zustand` create function with TypeScript types
  - [ ] Export `useGraphStore` hook

- [ ] Task 3: Create Custom SimpleNode Component (AC: 4, 5, 6, 10)
  - [ ] Create `apps/web/components/editor/nodes/SimpleNode.tsx`
  - [ ] Define component accepting `NodeProps` from React Flow
  - [ ] Render rounded rectangle with Tailwind classes: `rounded-lg border-2`
  - [ ] Add editable `<input>` or `<textarea>` for node text
  - [ ] Set placeholder: "Enter your statement..."
  - [ ] Implement maxLength={50} validation
  - [ ] Add selection border style: `border-blue-500` when selected
  - [ ] Style unselected: `border-gray-300`
  - [ ] Add theme-aware background colors (light/dark)

- [ ] Task 4: Register Custom Node Type in GraphCanvas (AC: 4, 7)
  - [ ] Import `SimpleNode` component in `GraphCanvas.tsx`
  - [ ] Create `nodeTypes` object: `{ 'simple-node': SimpleNode }`
  - [ ] Pass `nodeTypes` prop to `<ReactFlow>`
  - [ ] Verify drag-and-drop is enabled by default (React Flow feature)

- [ ] Task 5: Connect GraphCanvas to Zustand Store (AC: 3, 9)
  - [ ] Import `useGraphStore` hook in `GraphCanvas.tsx`
  - [ ] Replace local `useNodesState` with `useGraphStore((state) => state.nodes)`
  - [ ] Replace local `useEdgesState` with `useGraphStore((state) => state.edges)`
  - [ ] Get `addNode`, `updateNode` actions from store
  - [ ] Pass `onNodesChange` handler that updates Zustand store

- [ ] Task 6: Implement Context Menu on Canvas Right-Click (AC: 1, 2, 3)
  - [ ] Create `apps/web/components/editor/ContextMenu.tsx` component
  - [ ] Add `onContextMenu` handler to ReactFlow's `<ReactFlow>` component
  - [ ] Prevent default browser context menu: `e.preventDefault()`
  - [ ] Capture click position: `{ x: e.clientX, y: e.clientY }`
  - [ ] Show menu at cursor position with absolute positioning
  - [ ] Add menu option: "Create Simple Node"
  - [ ] On menu item click: call `addNode()` with new node at canvas coordinates
  - [ ] Convert screen coordinates to canvas coordinates using React Flow's `project` function
  - [ ] Generate unique node ID using `crypto.randomUUID()` or `nanoid`
  - [ ] Close menu after selection or on outside click

- [ ] Task 7: Implement Node Selection Logic (AC: 6)
  - [ ] Add `onNodeClick` handler to `<ReactFlow>`
  - [ ] On node click: call `selectNode(nodeId)` in Zustand store
  - [ ] Update `selectedNodeIds` array in store
  - [ ] SimpleNode reads `selected` prop from React Flow
  - [ ] Apply blue border when `selected === true`

- [ ] Task 8: Implement Delete Key Handler (AC: 8)
  - [ ] Add `useEffect` hook in GraphCanvas for keyboard listeners
  - [ ] Listen for "Delete" and "Backspace" key events
  - [ ] Check if any nodes are selected (`selectedNodeIds.length > 0`)
  - [ ] Call `deleteNode(id)` for each selected node
  - [ ] Prevent delete if focus is in text input (check `document.activeElement`)

- [ ] Task 9: Implement Node Text Editing with State Sync (AC: 5, 9, 10)
  - [ ] In SimpleNode, add `onChange` handler for text input
  - [ ] Call `updateNode(id, { data: { label: newText } })` on change
  - [ ] Debounce updates (300ms) to avoid excessive re-renders
  - [ ] Enforce 50 character max with `maxLength` attribute
  - [ ] Show character counter: "25/50" below input
  - [ ] Auto-focus input when node is created

- [ ] Task 10: Apply Design System Styling (AC: 4)
  - [ ] Use Tailwind colors from design system:
    - Primary blue: `#2563EB` for selected border
    - Gray: `#E5E7EB` for unselected border (light theme)
    - Dark gray: `#374151` for unselected border (dark theme)
  - [ ] Node dimensions: min 200px width, auto height
  - [ ] Padding: `p-4` (16px)
  - [ ] Font: default sans-serif from Tailwind
  - [ ] Add subtle shadow: `shadow-md`
  - [ ] Rounded corners: `rounded-lg` (8px)

- [ ] Task 11: Testing and Validation (AC: All)
  - [ ] Test right-click opens context menu at cursor position
  - [ ] Test "Create Simple Node" creates node at clicked position
  - [ ] Test node displays with rounded rectangle design
  - [ ] Test editable text field with placeholder
  - [ ] Test clicking node selects it (blue border)
  - [ ] Test dragging node moves it on canvas
  - [ ] Test Delete/Backspace removes selected node
  - [ ] Test node text is persisted in Zustand store
  - [ ] Test 50 character limit is enforced
  - [ ] Test TypeScript compilation passes
  - [ ] Test light/dark theme styling

## Dev Notes

### Previous Story Insights

[Source: Story 1.4 Completion Notes]

- GraphCanvas component exists at `apps/web/components/editor/GraphCanvas.tsx`
- React Flow 11.11.4 is installed and working
- Canvas uses `useNodesState` and `useEdgesState` hooks (will be replaced with Zustand)
- Theme preferences accessible via `session.user.preferences.theme`
- Editor page layout established with full viewport canvas

### State Management Architecture

[Source: docs/architecture.md#state-management-zustand]

**Zustand Version:** 4.5+ (specified in tech stack)

**Store Structure for GraphStore:**

```typescript
// apps/web/stores/graphStore.ts
import { create } from 'zustand';

interface Node {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: { label: string };
  selected?: boolean;
}

interface Edge {
  id: string;
  source: string;
  target: string;
}

interface GraphStore {
  nodes: Node[];
  edges: Edge[];
  selectedNodeIds: string[];

  addNode: (node: Node) => void;
  updateNode: (id: string, updates: Partial<Node>) => void;
  deleteNode: (id: string) => void;
  selectNode: (id: string) => void;
}

export const useGraphStore = create<GraphStore>((set) => ({
  nodes: [],
  edges: [],
  selectedNodeIds: [],

  addNode: (node) =>
    set((state) => ({
      nodes: [...state.nodes, node],
    })),

  updateNode: (id, updates) =>
    set((state) => ({
      nodes: state.nodes.map((n) => (n.id === id ? { ...n, ...updates } : n)),
    })),

  deleteNode: (id) =>
    set((state) => ({
      nodes: state.nodes.filter((n) => n.id !== id),
      edges: state.edges.filter((e) => e.source !== id && e.target !== id),
    })),

  selectNode: (id) =>
    set(() => ({
      selectedNodeIds: [id],
    })),
}));
```

**Selective Subscriptions Pattern:**

```typescript
// In GraphCanvas.tsx
const nodes = useGraphStore((state) => state.nodes);
const addNode = useGraphStore((state) => state.addNode);
```

This pattern prevents unnecessary re-renders by subscribing only to specific state slices.

### Custom Node Component Pattern

[Source: docs/architecture.md#components]

**React Flow Custom Node Requirements:**

Custom nodes must accept `NodeProps` from React Flow:

```typescript
import { NodeProps } from 'reactflow';

interface SimpleNodeData {
  label: string;
}

export default function SimpleNode({ id, data, selected }: NodeProps<SimpleNodeData>) {
  const updateNode = useGraphStore((state) => state.updateNode);

  return (
    <div className={`rounded-lg border-2 p-4 bg-white ${
      selected ? 'border-blue-500' : 'border-gray-300'
    }`}>
      <input
        type="text"
        value={data.label}
        onChange={(e) => updateNode(id, { data: { label: e.target.value } })}
        placeholder="Enter your statement..."
        maxLength={50}
        className="w-full outline-none"
      />
    </div>
  );
}
```

**Node Type Registration:**

```typescript
// In GraphCanvas.tsx
import SimpleNode from './nodes/SimpleNode';

const nodeTypes = { 'simple-node': SimpleNode };

<ReactFlow
  nodes={nodes}
  nodeTypes={nodeTypes}
  ...
/>
```

### Context Menu Implementation

[Source: docs/prd.md#key-interaction-paradigms]

**Context Menu Pattern:**

React Flow provides `onPaneContextMenu` for canvas right-click:

```typescript
import { useReactFlow } from 'reactflow';

function GraphCanvas() {
  const { project } = useReactFlow();
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();

    // Get canvas coordinates from screen coordinates
    const position = project({ x: event.clientX, y: event.clientY });

    setMenu({ x: event.clientX, y: event.clientY });
  };

  const handleCreateNode = () => {
    const canvasPos = project({ x: menu!.x, y: menu!.y });
    addNode({
      id: crypto.randomUUID(),
      type: 'simple-node',
      position: canvasPos,
      data: { label: '' }
    });
    setMenu(null);
  };

  return (
    <>
      <ReactFlow onPaneContextMenu={handleContextMenu} ... />
      {menu && (
        <div
          style={{ position: 'fixed', left: menu.x, top: menu.y }}
          className="bg-white border rounded shadow-lg p-2"
        >
          <button onClick={handleCreateNode}>Create Simple Node</button>
        </div>
      )}
    </>
  );
}
```

### Design System Colors

[Source: docs/prd.md#branding]

**Color Palette (Tailwind Classes):**

- **Primary Blue:** `#2563EB` → `border-blue-600` or `bg-blue-600`
- **Selected Border:** `border-blue-500` (AC requirement)
- **Unselected Border Light:** `border-gray-300`
- **Unselected Border Dark:** `border-gray-600`
- **Background Light:** `bg-white`
- **Background Dark:** `bg-slate-800`

**Theme-Aware Styling:**

```typescript
const theme = useSession()?.data?.user?.preferences?.theme || 'light';

className={`rounded-lg border-2 p-4 ${
  theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-white text-gray-900'
} ${selected ? 'border-blue-500' : theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}
```

### Node ID Generation

[Source: docs/architecture.md#tech-stack, best practices]

**Recommended:** Use native Web Crypto API:

```typescript
const nodeId = crypto.randomUUID();
```

**Alternative:** Use `nanoid` package (if already installed):

```typescript
import { nanoid } from 'nanoid';
const nodeId = nanoid();
```

For MVP, `crypto.randomUUID()` is sufficient and requires no additional dependencies.

### File Locations

[Source: docs/architecture.md#unified-project-structure]

**New Files to Create:**

```
apps/web/stores/graphStore.ts              # Zustand state store
apps/web/components/editor/nodes/SimpleNode.tsx   # Custom node component
apps/web/components/editor/ContextMenu.tsx  # Context menu component
```

**Files to Modify:**

```
apps/web/components/editor/GraphCanvas.tsx  # Add context menu, connect to Zustand
apps/web/package.json                       # Add zustand dependency
```

### React Flow Integration Details

[Source: React Flow docs, docs/architecture.md#components]

**Key React Flow Hooks:**

- `useReactFlow()`: Access `project()` for coordinate conversion
- `useNodesState()` / `useEdgesState()`: Built-in state (will be replaced by Zustand)

**Coordinate Systems:**

- **Screen Coordinates:** Mouse event clientX/clientY (pixels from viewport)
- **Canvas Coordinates:** Positions within the infinite canvas (accounting for pan/zoom)
- **Conversion:** Use `project({ x: screenX, y: screenY })` to convert screen → canvas

**Node Drag-and-Drop:**

React Flow handles node dragging automatically. Nodes are draggable by default. No additional code needed for AC7.

### Performance Considerations

[Source: docs/architecture.md#performance, NFR1, NFR2]

**Debouncing Node Updates:**

Text input changes should be debounced to avoid excessive Zustand updates:

```typescript
import { useDebouncedCallback } from 'use-debounce'; // or custom hook

const debouncedUpdate = useDebouncedCallback(
  (id, label) => updateNode(id, { data: { label } }),
  300 // 300ms delay per NFR9
);
```

**Selective Zustand Subscriptions:**

Subscribe to specific state slices to prevent unnecessary re-renders:

```typescript
// Good: Only re-renders when nodes change
const nodes = useGraphStore((state) => state.nodes);

// Bad: Re-renders on ANY store change
const store = useGraphStore();
```

### Character Limit Implementation

[Source: AC10, NFR requirements]

**50 Character Limit (MVP Constraint):**

```typescript
<input
  maxLength={50}
  value={data.label}
  ...
/>
<div className="text-xs text-gray-500 mt-1">
  {data.label.length}/50
</div>
```

This limit ensures nodes fit within layout constraints and maintains performance per NFR1.

### Keyboard Event Handling

[Source: docs/prd.md#key-interaction-paradigms]

**Delete Key Implementation:**

```typescript
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    // Don't delete if typing in input
    if (document.activeElement?.tagName === 'INPUT') return;

    if (e.key === 'Delete' || e.key === 'Backspace') {
      selectedNodeIds.forEach((id) => deleteNode(id));
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [selectedNodeIds, deleteNode]);
```

### Testing

[Source: docs/architecture.md#development-guidelines]

**Manual Testing Checklist:**

1. **Context Menu (AC1, AC2):**
   - Right-click on empty canvas → menu appears at cursor
   - Menu contains "Create Simple Node" option
   - Click outside menu → menu closes

2. **Node Creation (AC3, AC4):**
   - Click "Create Simple Node" → node appears at click position
   - Node has rounded corners and border
   - Node positioned correctly on canvas (accounting for zoom/pan)

3. **Node Editing (AC5, AC10):**
   - Click inside node text → input becomes editable
   - Placeholder "Enter your statement..." visible when empty
   - Type text → updates immediately
   - Try typing 51 characters → only 50 accepted
   - Character counter shows "X/50"

4. **Node Selection (AC6):**
   - Click on node → border changes to blue
   - Click on canvas → node deselects
   - Click different node → new node selected

5. **Node Drag (AC7):**
   - Click and hold node → drag it
   - Release mouse → node stays at new position
   - Zustand store reflects new position

6. **Node Deletion (AC8):**
   - Select node → press Delete key → node removed
   - Select node → press Backspace → node removed
   - Focus text input → press Delete → text deleted (node NOT removed)

7. **State Persistence (AC9):**
   - Create node → type text → inspect Zustand store (React DevTools)
   - Verify node data persisted correctly
   - Create multiple nodes → verify all tracked

8. **Theme Support:**
   - Switch theme in user preferences
   - Verify node colors adapt to light/dark theme
   - Border colors appropriate for theme

**No Unit Tests Required** for this MVP story - focus on integration validation. Unit tests will be added in Story 1.7 (Testing Infrastructure).

## Definition of Done

- [ ] Zustand 4.5+ installed in apps/web
- [ ] GraphStore created with nodes, edges, and actions
- [ ] SimpleNode component created with rounded rectangle design
- [ ] Custom node type registered in GraphCanvas
- [ ] Context menu opens on right-click with "Create Simple Node" option
- [ ] Node created at clicked canvas position (not screen position)
- [ ] Node displays editable text field with placeholder
- [ ] Node selection working (blue border on select)
- [ ] Node drag-and-drop working
- [ ] Delete/Backspace removes selected node
- [ ] Node text saved in Zustand store on change
- [ ] 50 character limit enforced with counter displayed
- [ ] Theme-aware styling (light/dark) implemented
- [ ] No TypeScript compilation errors
- [ ] All acceptance criteria manually tested and verified
- [ ] Code follows naming conventions and project structure

## Estimated Effort

**5 points** (2-3 days)

## Dependencies

- Story 1.1: Setup Project & Monorepo Structure (project foundation)
- Story 1.4: Canvas & React Flow Integration (GraphCanvas component exists)

---

## Change Log

| Date       | Version | Description            | Author   |
| ---------- | ------- | ---------------------- | -------- |
| 2026-01-16 | 1.0     | Initial story creation | Bob (SM) |

---

## Dev Agent Record

_This section will be populated during implementation_

---

## QA Results

_This section will be populated after QA review_
