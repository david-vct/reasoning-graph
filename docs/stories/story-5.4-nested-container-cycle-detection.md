# Story 5.4: Nested Container Cycle Detection

**Epic:** [Epic 5: Fractal Architecture (Containers)](epic-5-containers.md)

## User Story

**As a** user,  
**I want** the system to prevent creating cycles through nested containers,  
**So that** I cannot create infinite recursion or circular dependencies in my reasoning graphs.

## Acceptance Criteria

1. System detects when user attempts to place Container A inside Container B when B is already inside A
2. System prevents multi-level cycles: A contains B, B contains C, prevent C from containing A
3. Error modal displays when cycle is detected: "Cannot create container cycle: [Container path]"
4. Visual feedback shows affected containers highlighted during drag operation
5. Pre-validation occurs before container encapsulation operation completes
6. Existing containers are validated on graph load to detect any corrupted cycles
7. Warning indicator on container if it references itself indirectly
8. Undo/redo respects cycle prevention rules

## Technical Notes

- Implement cycle detection using graph traversal (DFS or BFS)
- Algorithm: when encapsulating nodes into container, traverse all selected nodes' internal containers recursively
- Maintain container hierarchy graph: Map<containerId, parentContainerId[]>
- Check: target container ID not in current container's ancestor chain
- Complexity: O(n) where n = depth of container nesting
- Cache hierarchy for performance on large graphs

## Definition of Done

- [ ] Direct cycle detection working (A→B→A)
- [ ] Multi-level cycle detection working (A→B→C→A)
- [ ] Error modal displays on cycle attempt
- [ ] Visual feedback during drag operation
- [ ] Pre-validation before encapsulation
- [ ] Graph load validation for corrupted data
- [ ] Warning indicator for indirect self-reference
- [ ] Undo/redo cycle-safe
- [ ] Unit tests for cycle detection algorithm
- [ ] E2E test for cycle prevention scenarios

## Estimated Effort

**8 points** (3-4 jours)

## Dependencies

- Story 5.1 (Container encapsulation)
- Story 5.2 (Container navigation)
- Story 3.3 (Cycle detection - base algorithm)
