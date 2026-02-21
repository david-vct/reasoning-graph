# Story 3.1: Connection Modes Implementation

**Epic:** [Epic 3: Connections & Real-Time Validation](epic-3-connections.md)
**Status:** Ready for Review

## User Story

**As a** user,  
**I want** to connect nodes using either drag-and-drop or click-click mode,  
**So that** I can build reasoning graphs with my preferred interaction style.

## Acceptance Criteria

1. User can choose connection mode in preferences (drag-drop or click-click)
2. **Drag-Drop Mode:** Click and hold on output port → drag to input port → release creates connection
3. **Click-Click Mode:** Click output port (highlights) → click input port → connection created
4. Visual feedback during connection (animated line following cursor in drag mode, highlighted ports in click mode)
5. Connection preview shows before finalizing
6. ESC key cancels ongoing connection in either mode
7. Invalid target ports are visually disabled during connection attempt
8. Mode preference is saved in user preferences (persists between sessions)
9. Tooltip explains active mode when hovering connection area
10. Connections appear as edges in React Flow with proper source/target

## Technical Notes

- React Flow handles prop for connection behavior
- Custom connection validation function
- Zustand store for connection state (isConnecting, sourcePort, etc.)
- User preferences stored in MongoDB (connectionMode field)
- CSS classes for visual states (connecting, valid-target, invalid-target)

## Definition of Done

- [x] Both connection modes implemented
- [x] Mode selection in preferences UI
- [x] Drag-drop mode functional
- [x] Click-click mode functional
- [x] Visual feedback working
- [x] Connection preview visible
- [x] ESC cancellation working
- [x] Invalid targets disabled visually
- [x] Preference persisted
- [x] Tooltips explaining mode

## Estimated Effort

**5 points** (2-3 jours)

## Dependencies

- Story 1.4 (Canvas & React Flow)
- Story 1.5 (Nodes exist to connect)
- Story 2.4 (Node types with input/output ports)

## Dev Agent Record

### Agent Model Used

GPT-5.3-Codex

### Debug Log References

- Implemented dual connection mode flow in canvas (`drag-drop` and `click-click`) with strict validation.
- Added Zustand connection state (`isConnecting`, selected source handle, cancel/start/complete actions).
- Refactored node handles to stable proposition-based IDs for deterministic validation and visual feedback.
- Added preferences API route and repository update for persistent `connectionMode` in MongoDB.
- Wired NextAuth JWT/session preferences and added header selector UI to change/save active mode.
- Verified by running full test suite via `runTests` (all passing).

### Completion Notes List

- Connection creation now appears as React Flow edges with source/target/sourceHandle/targetHandle.
- ESC key cancels in-progress connection attempts for both interaction modes.
- Invalid targets are visually disabled while connecting, valid targets are highlighted.
- Active mode explanation is available as canvas tooltip and compact mode badge.

### File List

- apps/web/components/editor/GraphCanvas.tsx
- apps/web/lib/store/graphStore.ts
- apps/web/components/nodes/LogicNodeWrapper.tsx
- apps/web/components/nodes/AxiomNode.tsx
- apps/web/components/nodes/SimpleAffirmationNode.tsx
- apps/web/components/nodes/ModusPonensNode.tsx
- apps/web/components/nodes/ModusTollensNode.tsx
- apps/web/components/nodes/SyllogismNode.tsx
- apps/web/components/nodes/DisjunctionNode.tsx
- apps/web/components/nodes/ReductioAdAbsurdumNode.tsx
- apps/web/components/nodes/InductionNode.tsx
- apps/web/components/nodes/FreeFormNode.tsx
- apps/web/components/Header.tsx
- apps/web/auth.ts
- apps/web/types/next-auth.d.ts
- apps/web/repositories/UserRepository.ts
- apps/web/app/api/preferences/connection-mode/route.ts
- docs/stories/story-3.1-connection-modes.md

### Change Log

1. Added connection mode state/actions in graph store.
2. Implemented canvas connection handlers (`onConnect`, `onConnectStart`, `onConnectEnd`) and ESC cancellation.
3. Added visual connection feedback on handles (active source, valid/invalid targets).
4. Added header preference selector for mode switching.
5. Added API persistence and repository support for `preferences.connectionMode`.
6. Updated auth/session typing and propagation of user preferences.
