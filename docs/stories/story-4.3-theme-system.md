# Story 4.3: Light/Dark Theme System

**Epic:** [Epic 4: Auto-Layout & Visual Polish](epic-4-auto-layout.md)

## User Story

**As a** user,  
**I want** to toggle between light and dark themes,  
**So that** I can work comfortably in different lighting conditions.

## Acceptance Criteria

1. Theme toggle button in header/toolbar
2. **Light Theme:** Background #F8FAFC, grid #E2E8F0, text #0F172A
3. **Dark Theme:** Background #0F172A, grid #1E293B, text #F8FAFC
4. Node colors adapt to theme (maintain contrast ratios WCAG AA 4.5:1)
5. Validation colors work in both themes (red/green distinguishable)
6. Theme preference saved in user preferences (persists between sessions)
7. Smooth transition between themes (200ms fade)
8. System respects browser prefers-color-scheme on first load
9. All UI components styled for both themes (shadcn/ui themes)
10. No layout shifts when switching themes

## Technical Notes

- next-themes library for theme management
- Tailwind CSS dark: variant for conditional styling
- CSS custom properties for theme colors
- localStorage for preference persistence
- prefers-color-scheme media query detection

## Definition of Done

- [ ] Theme toggle button working
- [ ] Light theme colors correct
- [ ] Dark theme colors correct
- [ ] Node contrast maintained
- [ ] Validation colors work both themes
- [ ] Preference persisted
- [ ] Smooth transition (200ms)
- [ ] prefers-color-scheme respected
- [ ] All components themed
- [ ] No layout shifts

## Estimated Effort

**3 points** (1-2 jours)

## Dependencies

- Story 1.1 (Tailwind configured)
- Story 1.4 (Canvas exists to theme)
