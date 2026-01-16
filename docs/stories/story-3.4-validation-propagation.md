# Story 3.4: Validation Cascade Propagation

**Epic:** [Epic 3: Connections & Real-Time Validation](epic-3-connections.md)

## User Story

**As a** user,  
**I want** invalid nodes to automatically mark all dependent nodes as affected,  
**So that** I can see the full impact of logical errors in my graph.

## Acceptance Criteria

1. When a node becomes invalid, all descendant nodes are marked as "affected by upstream error"
2. Affected nodes display orange warning border (distinct from red invalid)
3. Affected nodes show tooltip: "Dependent on invalid node: [NodeX]"
4. Propagation follows edge direction (only downstream nodes affected)
5. When invalid node is fixed, affected nodes re-validate automatically
6. Propagation completes in <100ms for graphs up to 200 nodes
7. Multiple invalid ancestors tracked (show all in tooltip)
8. Affected state stored in node validationState.affectedDescendants
9. Visual distinction: Red = locally invalid, Orange = upstream invalid, Green = valid
10. Propagation algorithm uses BFS or DFS efficiently

## Technical Notes

- Recursive propagation algorithm in validation engine
- Track visited nodes to avoid infinite loops (shouldn't happen with DAG but defensive)
- Batch state updates for performance
- Zustand store updates trigger React re-renders efficiently
- Consider using immer for immutable state updates
- Unit tests for propagation tree structures

## Definition of Done

- [ ] Propagation algorithm implemented
- [ ] Invalid nodes mark descendants
- [ ] Orange warning border for affected
- [ ] Tooltips show upstream issues
- [ ] Direction respected (downstream only)
- [ ] Auto re-validation on fix
- [ ] Performance <100ms verified
- [ ] Multiple ancestors tracked
- [ ] Color coding working (red/orange/green)
- [ ] State stored correctly
- [ ] Unit tests comprehensive

## Estimated Effort

**5 points** (2-3 jours)

## Dependencies

- Story 3.2 (Validation engine)
- Story 3.3 (DAG structure guaranteed)

