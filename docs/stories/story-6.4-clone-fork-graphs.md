# Story 6.4: Clone/Fork Public Graphs

**Epic:** [Epic 6: Persistence & Sharing](epic-6-persistence.md)

## User Story

**As a** user,  
**I want** to clone/fork public graphs created by others,  
**So that** I can build upon existing reasoning and customize it for my needs.

## Acceptance Criteria

1. "Fork" button visible on all public graphs (in view mode and library)
2. Click "Fork" creates deep copy of graph with new ID and current user as owner
3. Forked graph title prefixed with "Fork of: [original title]"
4. Forked graph metadata includes: clonedFrom.graphId, clonedFrom.originalAuthor
5. Original author attribution displayed in forked graph: "Originally created by [name]"
6. Forked graph defaults to public (but user can change to private)
7. Fork count tracked and displayed on original graph: "Forked 12 times"
8. Forked graphs are independent: changes don't affect original
9. User can fork their own graphs (to create variants)
10. Forking preserves all nodes, edges, containers, and validation state
11. Success notification: "Graph forked successfully. You are now the owner."
12. Forked graph automatically loads in editor

## Technical Notes

- Deep clone operation: recursively copy nodes, edges, containers
- Generate new IDs for all nodes and edges (avoid collisions)
- Preserve internal container structure and relationships
- Update graph document: ownerId, clonedFrom metadata, timestamps
- Increment forkCount on original graph (atomic operation)
- Transaction: ensure fork creation and count increment succeed together

## Definition of Done

- [ ] Fork button visible
- [ ] Clone operation creates copy
- [ ] Title prefixed correctly
- [ ] Metadata includes clonedFrom
- [ ] Attribution displayed
- [ ] Fork defaults to public
- [ ] Fork count tracked
- [ ] Forked graph independent
- [ ] Can fork own graphs
- [ ] All elements preserved
- [ ] Success notification shown
- [ ] Editor loads forked graph
- [ ] Unit tests for clone logic
- [ ] E2E test for fork workflow

## Estimated Effort

**8 points** (3-4 jours)

## Dependencies

- Story 6.1 (Graph CRUD API)
- Story 6.2 (Graph save/load)
- Story 6.3 (Shareable URLs - for fork from public view)
