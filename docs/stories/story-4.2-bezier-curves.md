# Story 4.2: Bézier Curve Edges

**Epic:** [Epic 4: Auto-Layout & Visual Polish](epic-4-auto-layout.md)

## User Story

**As a** user,  
**I want** connections displayed as smooth Bézier curves,  
**So that** my graph looks professional and edges are easy to follow.

## Acceptance Criteria

1. All edges render as smooth Bézier curves (not straight lines)
2. Curve control points calculated to avoid node overlaps
3. Edge color indicates validation state (green=valid, red=invalid, orange=affected)
4. Edge thickness 2px default, 3px on hover
5. Animated edge creation (grows from source to target over 200ms)
6. Edge labels display connection type if applicable (optional)
7. Edge hover shows source→target node names in tooltip
8. Click on edge selects it (highlight)
9. Selected edge can be deleted with Delete/Backspace key
10. Performance maintained with 300+ edges

## Technical Notes

- React Flow Edge types: bezier (built-in) or custom
- Custom edge component for validation colors
- CSS transitions for hover effects
- Edge label positioning with labelBgPadding
- Optimize rendering with React.memo on edge components

## Definition of Done

- [ ] Bézier curves rendering
- [ ] Control points avoid overlaps
- [ ] Colors indicate state (green/red/orange)
- [ ] Thickness changes on hover
- [ ] Animation on creation
- [ ] Tooltips show node names
- [ ] Edge selection working
- [ ] Delete key removes selected edge
- [ ] Performance with 300+ edges verified
- [ ] Visual polish complete

## Estimated Effort

**5 points** (2-3 jours)

## Dependencies

- Story 3.1 (Connections/edges exist)
- Story 3.2 (Validation states)
