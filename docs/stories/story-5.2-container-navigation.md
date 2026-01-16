# Story 5.2: Container Multi-Level Navigation

**Epic:** [Epic 5: Fractal Architecture (Containers)](epic-5-containers.md)

## User Story

**As a** user,  
**I want** to navigate into containers to see/edit their internal structure,  
**So that** I can work at different levels of abstraction.

## Acceptance Criteria

1. Double-click container node to "dive in" to internal graph
2. Canvas transitions smoothly to show internal graph (300ms animation)
3. Breadcrumb navigation bar appears at top showing path (e.g., "Root > Container A")
4. Breadcrumb links allow navigating back to parent levels
5. "Back" button (or ESC key) returns to parent graph
6. Internal graph uses same canvas capabilities (zoom, pan, edit)
7. Changes to internal graph auto-save
8. Navigation history tracked for browser back/forward buttons
9. URL updates to reflect current navigation depth
10. Deep linking works (can share URL to specific container level)

## Technical Notes

- Zustand store tracks navigation stack
- breadcrumb state: ['root', 'container-abc-123', ...]
- React Router or query params for URL state
- Animation with React Flow viewport transition
- Prevent infinite navigation loops

## Definition of Done

- [ ] Double-click dives into container
- [ ] Smooth transition animation
- [ ] Breadcrumb navigation working
- [ ] Breadcrumb links functional
- [ ] Back button/ESC returns
- [ ] Full canvas capabilities inside
- [ ] Changes auto-save
- [ ] Browser back/forward working
- [ ] URL reflects depth
- [ ] Deep linking functional

## Estimated Effort

**8 points** (3-4 jours)

## Dependencies

- Story 5.1 (Containers exist)
