# Story 4.1: Dagre Auto-Layout Implementation

**Epic:** [Epic 4: Auto-Layout & Visual Polish](epic-4-auto-layout.md)

## User Story

**As a** user,  
**I want** nodes to automatically arrange in optimal left-to-right topological order,  
**So that** my reasoning flow is visually clear without manual positioning.

## Acceptance Criteria

1. Dagre layout algorithm integrated (@dagrejs/dagre library)
2. "Auto-Arrange" button triggers layout recalculation
3. Nodes arrange left-to-right following topological sort (premises left, conclusions right)
4. Minimum horizontal spacing between dependent nodes (100px)
5. Vertical spacing optimized to minimize edge crossings
6. Layout animation smoothly transitions nodes to new positions (300ms easing)
7. Layout preserves user manual adjustments until "Reset Layout" clicked
8. Debouncing prevents layout recalc more than once per 300ms (NFR9)
9. Layout handles disconnected subgraphs appropriately
10. Performance <500ms for 200 node graphs

## Technical Notes

- @dagrejs/dagre for Sugiyama layout algorithm
- React Flow setNodes with animated transition
- Debounce with lodash.debounce or custom hook
- Layout config: rankdir LR, nodesep 100, ranksep 150
- Store "lastManualEdit" timestamp to preserve user changes

## Definition of Done

- [ ] Dagre integrated
- [ ] Auto-Arrange button functional
- [ ] Left-to-right topological order
- [ ] Spacing requirements met
- [ ] Smooth animation (300ms)
- [ ] Manual adjustments preserved
- [ ] Debouncing working (300ms)
- [ ] Disconnected graphs handled
- [ ] Performance <500ms verified
- [ ] Unit tests for layout logic

## Estimated Effort

**8 points** (3-4 jours)

## Dependencies

- Story 3.1 (Connections exist to determine topology)
- Story 3.3 (DAG structure guaranteed)
