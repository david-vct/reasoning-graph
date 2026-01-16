# Story 3.3: Cycle Detection & Prevention

**Epic:** [Epic 3: Connections & Real-Time Validation](epic-3-connections.md)

## User Story

**As a** user,  
**I want** the system to prevent circular reasoning by detecting and blocking cycles,  
**So that** my logical arguments remain valid directed acyclic graphs (DAGs).

## Acceptance Criteria

1. System detects cycles using graphlib topological sort algorithm
2. Cycle detection runs before allowing new connection
3. Connection creating a cycle is rejected with clear error message
4. Visual feedback shows why connection is blocked (tooltip: "This would create circular reasoning")
5. Cycle detection completes in <100ms for graphs up to 200 nodes (NFR1)
6. All existing nodes in a cycle are highlighted in orange
7. Cycle path is visually traced (optional enhancement)
8. No false positives (valid DAGs not blocked)
9. Algorithm handles disconnected subgraphs correctly
10. Unit tests verify cycle detection for various graph topologies

## Technical Notes

- Use graphlib.alg.isAcyclic() for cycle detection
- Run detection before onConnect handler completes
- Performance test with 200 node graphs
- Consider memoization for repeated checks
- Error messages in French
- Test cases: simple cycle, complex cycle, false positive checks

## Definition of Done

- [ ] graphlib integrated for cycle detection
- [ ] Detection runs before connections
- [ ] Cycles blocked with error message
- [ ] Visual feedback working
- [ ] Performance <100ms verified
- [ ] Cycle nodes highlighted
- [ ] No false positives confirmed
- [ ] Disconnected graphs handled
- [ ] Unit tests comprehensive
- [ ] Performance tests passing

## Estimated Effort

**5 points** (2-3 jours)

## Dependencies

- Story 3.1 (Connection mechanism)
- graphlib library (should be installed in Story 1.1 or early)

