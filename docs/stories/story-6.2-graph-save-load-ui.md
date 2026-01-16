# Story 6.2: Graph Save/Load Functionality

**Epic:** [Epic 6: Persistence & Sharing](epic-6-persistence.md)

## User Story

**As a** user,  
**I want** to save my reasoning graphs and load them later,  
**So that** I can continue working on complex reasoning over multiple sessions.

## Acceptance Criteria

1. "Save" button in editor toolbar saves current graph to database
2. On first save, modal prompts for: title (required), description (optional), isPublic toggle, tags, category
3. Subsequent saves update existing graph without modal (quick save)
4. "Save As..." creates new copy of graph with new ID
5. Auto-save every 2 minutes if changes detected (with visual indicator)
6. **Loading spinner with status message** ("Saving...") displayed during save operation
7. "My Graphs" page displays list of user's graphs with thumbnails, title, last modified date
8. **Loading spinner** visible while fetching My Graphs list
9. Click graph card loads graph into editor
10. **Loading overlay with spinner** displayed during graph load into canvas
11. Unsaved changes warning when navigating away from editor
12. Success toast notification after save: "Graph saved successfully"
13. Error handling with user-friendly messages
14. Public graphs show confirmation modal: "This graph will be publicly visible. Continue?"

## Technical Notes

- Use Zustand store for graph state management
- Loading states: isLoading, isSaving, isLoadingList flags in Zustand
- Spinner component from shadcn/ui for consistent loading UX
- Serialize React Flow nodes/edges to LogicNode[] format
- Deep clone graph for "Save As..."
- Track dirty state: compare current vs last saved
- Auto-save debounce: 2 minutes since last change
- LocalStorage backup for unsaved work (recovery)
- Thumbnail generation: canvas screenshot or placeholder

## Definition of Done

- [ ] Save button functional
- [ ] Save modal working with all fields
- [ ] Quick save (update) working
- [ ] Save As functionality working
- [ ] Auto-save every 2 minutes
- [ ] My Graphs page displays graphs
- [ ] Graph loading into editor working
- [ ] Unsaved changes warning operational
- [ ] Loading states implemented
- [ ] Success notifications showing
- [ ] Error handling comprehensive
- [ ] Public confirmation modal working
- [ ] E2E test for save/load workflow

## Estimated Effort

**13 points** (5-6 jours)

## Dependencies

- Story 6.1 (Graph CRUD API)
- Story 1.4 (Canvas integration)
- Story 1.5 (Node creation - for serialization)
