# Story 3.1: Connection Modes Implementation

**Epic:** [Epic 3: Connections & Real-Time Validation](epic-3-connections.md)

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

- [ ] Both connection modes implemented
- [ ] Mode selection in preferences UI
- [ ] Drag-drop mode functional
- [ ] Click-click mode functional
- [ ] Visual feedback working
- [ ] Connection preview visible
- [ ] ESC cancellation working
- [ ] Invalid targets disabled visually
- [ ] Preference persisted
- [ ] Tooltips explaining mode

## Estimated Effort

**5 points** (2-3 jours)

## Dependencies

- Story 1.4 (Canvas & React Flow)
- Story 1.5 (Nodes exist to connect)
- Story 2.4 (Node types with input/output ports)

