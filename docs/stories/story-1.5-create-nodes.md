# Story 1.5: Create Simple Nodes

**Epic:** [Epic 1: Foundation & Core Graph Infrastructure](epic-1-foundation.md)

## User Story

**As a** user,  
**I want** to create simple nodes by right-clicking on the canvas,  
**So that** I start building my reasoning graph.

## Acceptance Criteria

1. A right-click on canvas opens a contextual menu at cursor position
2. Menu contains an option "Create Simple Node"
3. Selecting the option creates a new node at clicked position
4. Node displays a rounded rectangle with border (design per UI Goals)
5. Node contains an editable text field (placeholder: "Enter your statement...")
6. Node can be selected (border highlight) by clicking on it
7. Node can be moved by drag & drop
8. A selected node can be deleted with "Delete" or "Backspace" key
9. Node text is saved in Zustand state upon editing
10. Maximum 50 characters for node text (MVP constraint for layout)

## Technical Notes

- Custom React Flow node component
- Context menu on canvas right-click
- Zustand for state management
- Unique node ID generation (uuid)
- Node styling per design system (Tailwind)
- Character limit validation

## Definition of Done

- [ ] Right-click opens contextual menu
- [ ] Menu has "Create Simple Node" option
- [ ] Node created at click position
- [ ] Node has rounded rectangle design
- [ ] Editable text field functional
- [ ] Node selection working (border highlight)
- [ ] Node drag & drop working
- [ ] Delete key removes selected node
- [ ] Node text saved in Zustand
- [ ] 50 character limit enforced

## Estimated Effort

**5 points** (2-3 jours)

## Dependencies

- Story 1.1 (project setup)
- Story 1.4 (canvas foundation)
