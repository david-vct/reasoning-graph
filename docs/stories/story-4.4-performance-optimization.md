# Story 4.4: Performance Optimization for Large Graphs

**Epic:** [Epic 4: Auto-Layout & Visual Polish](epic-4-auto-layout.md)

## User Story

**As a** user,  
**I want** the graph editor to remain responsive with 200+ nodes,  
**So that** I can build complex reasoning graphs without lag.

## Acceptance Criteria

1. Application remains responsive (<100ms interactions) with 200 nodes (NFR1)
2. React.memo applied to NodeRenderer and EdgeRenderer components
3. Zustand selective subscriptions used throughout
4. Validation runs in Web Worker for graphs >100 nodes
5. Virtual rendering considered for graphs >200 nodes (optional Phase 2)
6. Layout calculation debounced (300ms minimum per NFR9)
7. Performance profiling with React DevTools shows no unnecessary re-renders
8. Lighthouse performance score >90
9. FPS remains >30 during pan/zoom with 200 nodes
10. Load time <2s for 200 node graph

## Technical Notes

- React.memo with custom comparison functions
- Zustand shallow equality for subscriptions
- Web Workers API for validation offloading
- Performance monitoring with React DevTools Profiler
- Lighthouse CI for performance regression detection
- Consider react-window for virtual rendering (future)

## Definition of Done

- [ ] 200 nodes responsive <100ms
- [ ] React.memo on renderers
- [ ] Zustand selective subscriptions
- [ ] Web Worker validation >100 nodes
- [ ] Layout debouncing (300ms)
- [ ] No unnecessary re-renders
- [ ] Lighthouse score >90
- [ ] FPS >30 with 200 nodes
- [ ] Load time <2s
- [ ] Performance tests passing

## Estimated Effort

**8 points** (3-4 jours)

## Dependencies

- Story 3.2 (Validation engine to optimize)
- Story 4.1 (Layout to optimize)
- Story 1.7 (Testing infrastructure for performance tests)
