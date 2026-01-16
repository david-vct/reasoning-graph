# Story 1.4: Canvas & React Flow Integration

**Epic:** [Epic 1: Foundation & Core Graph Infrastructure](epic-1-foundation.md)

## User Story

**As a** user,  
**I want** to see an interactive canvas where I can zoom and pan,  
**So that** I prepare the workspace for my reasoning graphs.

## Acceptance Criteria

1. React Flow 11+ is installed and integrated in the `/editor` page
2. Canvas occupies 100% of available height/width (viewport minus header)
3. Zoom is functional with mouse wheel (min: 0.5x, max: 2x)
4. Pan (movement) works with click-and-hold on background + drag
5. A subtle grid is displayed in the background (color per theme)
6. Canvas starts centered with 1x zoom
7. Zoom controls (+/-) are displayed bottom-right
8. An optional mini-map is displayed bottom-left (can be toggled off)

## Technical Notes

- React Flow 11+ for canvas management
- Configure React Flow with custom styling
- Grid background with theme-aware colors
- Initial viewport configuration
- Controls and MiniMap components

## Definition of Done

- [ ] React Flow 11+ installed and integrated
- [ ] Canvas fills viewport correctly
- [ ] Zoom functional (wheel, min 0.5x, max 2x)
- [ ] Pan functional (click-and-hold + drag)
- [ ] Grid displayed with theme colors
- [ ] Canvas starts centered at 1x zoom
- [ ] Zoom controls visible bottom-right
- [ ] Mini-map visible bottom-left (toggleable)

## Estimated Effort

**3 points** (1-2 jours)

## Dependencies

- Story 1.1 (project setup)
- Story 1.3 (authentication for /editor protection)
