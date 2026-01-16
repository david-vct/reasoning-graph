# Story 5.3: Container Validation Cascade

**Epic:** [Epic 5: Fractal Architecture (Containers)](epic-5-containers.md)

## User Story

**As a** user,  
**I want** validation errors inside containers to propagate to the container itself and its descendants,  
**So that** I can immediately see which containers contain logical errors without opening them.

## Acceptance Criteria

1. When any internal node in a container has validation error, container node shows red border
2. Container displays error badge with count of internal errors (e.g., "3 errors")
3. Hovering over container shows tooltip with summary of internal errors
4. Validation status propagates: invalid container → all descendants become invalid
5. When container errors are fixed, validation re-propagates and container becomes green
6. Container's output conclusions are marked as "tainted" when internal errors exist
7. Descendants consuming tainted conclusions show warning state (orange/amber)
8. Validation cascade works through multiple container nesting levels
9. Performance: validation cascade completes in <100ms for graphs with 200 nodes

## Technical Notes

- Extend validation engine to traverse container internal graphs
- Recursive validation: validate internal nodes, then container itself
- Cache validation results to avoid re-computing unchanged subgraphs
- ValidationState on ContainerNode includes: internalErrors[], taintedOutputs[]
- Propagation algorithm: breadth-first traversal from error source
- Consider using React.memo to prevent unnecessary re-renders

## Definition of Done

- [ ] Container shows red border when internal errors exist
- [ ] Error badge displays internal error count
- [ ] Tooltip shows error summary
- [ ] Validation propagates to descendants
- [ ] Fixed errors trigger re-validation
- [ ] Output conclusions marked as tainted
- [ ] Descendants show warning for tainted inputs
- [ ] Multi-level nesting supported
- [ ] Performance requirement met (<100ms)
- [ ] Unit tests for cascade logic
- [ ] E2E test for validation propagation

## Estimated Effort

**8 points** (3-4 jours)

## Dependencies

- Story 5.1 (Container encapsulation)
- Story 5.2 (Container navigation)
- Story 3.2 (Logic validation engine)
- Story 3.4 (Validation propagation - base system)
