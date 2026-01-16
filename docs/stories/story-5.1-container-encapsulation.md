# Story 5.1: Container Node Encapsulation

**Epic:** [Epic 5: Fractal Architecture (Containers)](epic-5-containers.md)

## User Story

**As a** user,  
**I want** to encapsulate a group of connected nodes into a reusable container,  
**So that** I can manage complexity and reuse reasoning patterns.

## Acceptance Criteria

1. Select multiple nodes → Right-click → "Create Container" option
2. Selected nodes become internal to new Container node
3. Container exposes input ports (from nodes with external incoming connections)
4. Container exposes output ports (from nodes with external outgoing connections)
5. Container node renders as larger rounded rectangle with distinct visual style
6. Container shows title (editable inline or in properties panel)
7. Container displays number of internal nodes as badge (e.g., "12 nodes")
8. Internal connections preserved within container
9. External connections rerouted to container ports
10. Undo/redo supports container creation

## Technical Notes

- Container is a special LogicNode type (ContainerNode)
- Store internal graph structure in container.internalGraph property
- Calculate exposed ports by analyzing boundary connections
- Port mapping: internal node ID + port → container port
- Z-index layering for container visual hierarchy

## Definition of Done

- [ ] Multi-select + Create Container working
- [ ] Nodes encapsulated correctly
- [ ] Input ports exposed
- [ ] Output ports exposed
- [ ] Distinct container visual style
- [ ] Title editable
- [ ] Node count badge visible
- [ ] Internal connections preserved
- [ ] External connections rerouted
- [ ] Undo/redo functional

## Estimated Effort

**13 points** (5-6 jours)

## Dependencies

- Story 2.4 (Node types including Container)
- Story 3.1 (Connections)
