# Graph Editor Components - Story 1.5

This directory contains the components for the graph editor functionality, specifically implementing the ability to create and manage simple nodes on the canvas.

## Components Overview

### GraphCanvas.tsx
Main orchestrator component that manages the React Flow canvas and integrates all sub-components.

**Features:**
- React Flow canvas initialization
- Right-click context menu handling
- Keyboard event handling (Delete/Backspace)
- Integration with Zustand store
- Custom node type registration

**Key Methods:**
- `onPaneContextMenu`: Opens context menu on right-click
- `onCreateNode`: Creates a new node at the clicked position
- `onCloseMenu`: Closes the context menu

### SimpleNode.tsx
Custom React Flow node component representing a simple text statement node.

**Features:**
- Double-click to edit text
- Inline text editing with Enter/Escape keys
- 50 character limit enforcement
- Real-time character counter
- Selection highlighting (blue border when selected)
- Handles for connecting to other nodes (top and bottom)

**Props:**
- `id`: Unique node identifier
- `data`: Node data containing text
- `selected`: Whether the node is currently selected

**Interactions:**
- Single click: Select node
- Double click: Enter edit mode
- Enter key: Save and exit edit mode
- Escape key: Cancel and exit edit mode
- Blur: Save and exit edit mode

### ContextMenu.tsx
Contextual menu that appears on right-click on the canvas.

**Features:**
- Positioned at cursor location
- Click outside to close
- Escape key to close
- "Create Simple Node" action

**Props:**
- `x`, `y`: Screen coordinates for menu position
- `onClose`: Callback to close menu
- `onCreateNode`: Callback to create a new node

## State Management

### Zustand Store (`lib/store/graphStore.ts`)
Centralized state management for the graph editor.

**State:**
- `nodes`: Array of all nodes
- `edges`: Array of all connections
- `selectedNodeId`: Currently selected node ID

**Actions:**
- `addNode(position)`: Create a new node at specified position
- `updateNodeData(nodeId, data)`: Update node's data
- `deleteSelectedNode()`: Remove the currently selected node
- `setSelectedNode(nodeId)`: Set node selection
- `onNodesChange(changes)`: Handle React Flow node changes
- `onEdgesChange(changes)`: Handle React Flow edge changes

## Styling

All components use Tailwind CSS for styling following the design system:
- Rounded corners (`rounded-lg`)
- Border styling (gray default, blue when selected)
- Shadow effects
- Hover states
- Transitions for smooth interactions

## Testing

Manual test plan available at `__tests__/MANUAL_TEST_STORY_1.5.md`

## Dependencies

- `reactflow`: Core graph canvas library
- `zustand`: State management
- `uuid`: Unique ID generation

## Usage Example

```tsx
import GraphCanvas from '@/components/editor/GraphCanvas';

function EditorPage() {
  return <GraphCanvas />;
}
```

## Future Enhancements (Not in Story 1.5)

- Backend persistence
- Undo/redo functionality
- Node copy/paste
- Multi-select
- Different node types
- Connection validation
