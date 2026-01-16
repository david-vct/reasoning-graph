# Story 7.4: User Help System & In-App Documentation

**Epic:** [Epic 7: Public Library & Discovery](epic-7-library.md)

## User Story

**As a** user,  
**I want** contextual help, tooltips, and an accessible help guide,  
**So that** I can understand logic rules and use the application effectively without external documentation.

## Acceptance Criteria

1. **Node Type Tooltips:** Hovering over any node type displays a tooltip explaining the logic rule in simple language (e.g., "Modus Ponens: If P→Q is true and P is true, then Q must be true")
2. **Help Icon in Header:** A "?" icon in the application header opens a help modal
3. **Help Modal Content:** Modal contains:
   - Quick Start guide (create nodes, connect, validate)
   - Logic rules reference (all node types with examples)
   - Keyboard shortcuts list
   - FAQ section
4. **Keyboard Shortcut:** Pressing "?" or F1 opens the help modal from anywhere
5. **First-Time User Onboarding:** New users see an optional, skippable interactive tour highlighting:
   - Canvas basics (zoom, pan)
   - Creating first node
   - Connection modes
   - Validation feedback
6. **Validation Error Tooltips:** Hovering over invalid connections or nodes shows tooltip with:
   - What is wrong
   - Why it's invalid
   - How to fix it (actionable suggestion)
7. **Connection Mode Tooltip:** When hovering over connection area, tooltip explains active connection mode
8. **User Preference:** Onboarding tour can be disabled in preferences and manually retriggered
9. **Help Content in French & English:** All help content available in both languages (detects user preference)

## Technical Notes

- Use Radix UI Tooltip component for consistency
- Help modal: Radix UI Dialog with tabs for different sections
- Onboarding tour: react-joyride or similar library
- Store `hasSeenOnboarding` in user preferences (MongoDB)
- Help content stored in JSON files for easy i18n
- Tooltip positioning: smart placement to avoid canvas edges

## Definition of Done

- [ ] Node type tooltips implemented for all 9+ types
- [ ] Help icon in header functional
- [ ] Help modal with complete content
- [ ] Keyboard shortcut (? or F1) working
- [ ] First-time onboarding tour implemented
- [ ] Tour is skippable and re-triggerable
- [ ] Validation error tooltips explanatory
- [ ] Connection mode tooltip visible
- [ ] User preference for tour persisted
- [ ] French & English content available
- [ ] All tooltips tested on different screen sizes

## Estimated Effort

**5 points** (2-3 jours)

## Dependencies

- Story 2.4 (Node types must exist to document)
- Story 3.2 (Validation engine for error tooltips)
- Story 7.2 (Integrate with library UI)
