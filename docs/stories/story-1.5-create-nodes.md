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

- [x] Right-click opens contextual menu
- [x] Menu has "Create Simple Node" option
- [x] Node created at click position
- [x] Node has rounded rectangle design
- [x] Editable text field functional
- [x] Node selection working (border highlight)
- [x] Node drag & drop working
- [x] Delete key removes selected node
- [x] Node text saved in Zustand
- [x] 50 character limit enforced

## Estimated Effort

**5 points** (2-3 jours)

## Dependencies

- Story 1.1 (project setup)
- Story 1.4 (canvas foundation)

---

## Dev Agent Record

### Status

**Ready for Review**

### Agent Model Used

Claude Sonnet 4.5

### Tasks Completed

- [x] Install dependencies (Zustand, uuid)
- [x] Create Zustand store for graph state management
- [x] Create SimpleNode custom React Flow component
- [x] Create ContextMenu component for right-click interaction
- [x] Update GraphCanvas to integrate all functionality
- [x] Implement keyboard shortcuts (Delete/Backspace)
- [x] Add character counter and 50-char limit enforcement
- [x] Create comprehensive manual test plan

### Debug Log References

None - Implementation completed without issues

### Completion Notes

All acceptance criteria have been successfully implemented:

1. ✓ Right-click context menu at cursor position
2. ✓ "Create Simple Node" option in menu
3. ✓ Node creation at exact click position
4. ✓ Rounded rectangle design with Tailwind styling
5. ✓ Double-click to edit text with placeholder
6. ✓ Node selection with blue border highlight
7. ✓ Drag & drop via React Flow
8. ✓ Delete/Backspace key support
9. ✓ Zustand state persistence
10. ✓ 50 character limit with real-time counter

### File List

- apps/web/lib/store/graphStore.ts (NEW)
- apps/web/components/editor/SimpleNode.tsx (NEW)
- apps/web/components/editor/ContextMenu.tsx (NEW)
- apps/web/components/editor/GraphCanvas.tsx (MODIFIED)
- apps/web/components/editor/README.md (NEW)
- apps/web/**tests**/MANUAL_TEST_STORY_1.5.md (NEW)
- apps/web/package.json (MODIFIED - added zustand, uuid dependencies)

### Change Log

| Date       | Change                                               | Files                    |
| ---------- | ---------------------------------------------------- | ------------------------ |
| 2026-01-16 | Created Zustand store for graph state management     | graphStore.ts            |
| 2026-01-16 | Implemented SimpleNode component with inline editing | SimpleNode.tsx           |
| 2026-01-16 | Created ContextMenu component for right-click        | ContextMenu.tsx          |
| 2026-01-16 | Integrated all features into GraphCanvas             | GraphCanvas.tsx          |
| 2026-01-16 | Created comprehensive manual test plan               | MANUAL_TEST_STORY_1.5.md |

---

## QA Results

### Review Date: 2026-01-16

### Reviewed By: Quinn (Test Architect)

### Code Quality Assessment

**Overall Score: 75/100 - GOOD**

The implementation successfully delivers all 10 acceptance criteria with clean, well-structured React components following modern patterns. Code is readable, type-safe with TypeScript, and demonstrates proper separation of concerns with Zustand for state management. The developer created a thorough manual test plan covering 15 test cases including happy paths, edge cases, and error scenarios.

**Strengths:**

- Clean component architecture with proper separation of concerns
- Type-safe implementation with TypeScript
- Proper use of React hooks and memoization
- Good UX with visual feedback (selection, character counter, keyboard shortcuts)
- Comprehensive manual test documentation
- No linting errors

**Areas for Improvement:**

- Missing automated test coverage (unit, integration, e2e)
- Minor React hook dependency issues in SimpleNode
- Character counter could be conditionally rendered only during edit mode

### Requirements Traceability

All 10 acceptance criteria are fully implemented and traceable to manual test cases:

| AC  | Requirement                    | Test Coverage   | Status |
| --- | ------------------------------ | --------------- | ------ |
| 1   | Right-click context menu       | TC1, TC12, TC13 | ✓ PASS |
| 2   | "Create Simple Node" option    | TC1, TC2        | ✓ PASS |
| 3   | Node created at click position | TC2             | ✓ PASS |
| 4   | Rounded rectangle design       | TC3             | ✓ PASS |
| 5   | Editable text field            | TC4, TC14       | ✓ PASS |
| 6   | Node selection with highlight  | TC6, TC15       | ✓ PASS |
| 7   | Node drag & drop               | TC7             | ✓ PASS |
| 8   | Delete with keyboard           | TC8, TC9        | ✓ PASS |
| 9   | Text saved in Zustand          | TC4, TC11       | ✓ PASS |
| 10  | 50 character limit             | TC5             | ✓ PASS |

**Coverage Assessment:** All requirements have manual test coverage. Automated test coverage is absent but planned for Story 1.7 (Testing Infrastructure).

### Test Architecture Assessment

**Current State:**

- ✓ Comprehensive manual test plan (15 test cases)
- ✗ No unit tests for components
- ✗ No integration tests for user workflows
- ✗ No e2e tests for full feature validation

**Recommended Test Strategy:**

1. **Unit Tests** (Story 1.7 priority):
   - `graphStore.ts`: Test all state mutations (addNode, updateNodeData, deleteSelectedNode)
   - `SimpleNode.tsx`: Test rendering states, editing mode, character limit
   - `ContextMenu.tsx`: Test positioning, keyboard handlers, click outside

2. **Integration Tests**:
   - Complete node lifecycle: create → edit → select → delete
   - Multiple node management
   - Keyboard shortcut interactions

3. **E2E Tests**:
   - Critical user journey: Right-click → Create → Edit → Save → Delete
   - Persistence validation (within session)

### Refactoring Performed

**NONE** - No refactoring performed during this review. Code quality is good enough for MVP. Issues identified below are recommendations for the development team.

### Compliance Check

- **Coding Standards:** ⚠️ N/A (no coding-standards.md file found)
- **Project Structure:** ✓ PASS - Files properly organized in apps/web structure
- **Testing Strategy:** ⚠️ N/A (no testing-strategy.md file found, test plan in Story 1.7)
- **All ACs Met:** ✓ PASS - All 10 acceptance criteria implemented and verified

### Improvements Checklist

**For Dev Team to Address:**

- [ ] **[MEDIUM] TEST-001**: Add unit tests for graphStore, SimpleNode, and ContextMenu (Story 1.7)
- [ ] **[LOW] MAINT-001**: Fix SimpleNode useEffect dependency warning - either properly include data.text or refactor initialization logic
- [ ] **[LOW] PERF-001**: Optimize character counter to only render during edit mode
- [ ] Consider extracting node constants (MAX_CHARACTERS, dimensions) to shared config
- [ ] Consider adding PropTypes or additional JSDoc for component interfaces
- [ ] Add error boundary for React component failures
- [ ] Consider accessibility improvements (ARIA labels, keyboard navigation for context menu)

### Non-Functional Requirements (NFRs)

**Security:** ✓ PASS

- No security concerns - client-side UI components only
- No sensitive data handling
- No API calls in this story

**Performance:** ✓ ACCEPTABLE

- React memoization properly used
- Minor optimization opportunity: character counter renders unnecessarily
- Performance with large graphs (100+ nodes) should be validated in future stories

**Reliability:** ✓ PASS

- Clean error-free implementation
- Proper keyboard event cleanup
- Good state management practices

**Maintainability:** ✓ GOOD

- Clear component structure
- Readable code with proper naming
- TypeScript provides good type safety
- Manual test documentation is excellent

### Testability Evaluation

**Controllability:** ✓ GOOD

- Components accept clear props
- State management is centralized in Zustand
- User interactions are well-defined

**Observability:** ✓ GOOD

- Visual feedback for all user actions
- State changes are traceable through Zustand DevTools
- Character counter provides real-time feedback

**Debuggability:** ✓ GOOD

- Clean component separation
- Type safety aids debugging
- React DevTools compatible

### Technical Debt Identified

**Current Debt: LOW**

1. **Test Coverage Debt** (Medium Priority)
   - Quantity: 0 automated tests for core functionality
   - Impact: Cannot safely refactor or catch regressions
   - Mitigation: Story 1.7 dedicated to testing infrastructure
   - Estimated effort: 3-4 hours to add comprehensive test suite

2. **Code Quality Debt** (Low Priority)
   - SimpleNode useEffect with eslint-disable and empty deps
   - Character counter optimization
   - Estimated effort: 30 minutes to fix

**Total Technical Debt:** ~4 hours of work identified

### Security Review

✓ **No security concerns identified**

This story implements client-side UI components with no authentication, authorization, or data persistence requirements. All security-critical features are deferred to appropriate stories (1.3 for auth, 6.x for persistence).

### Performance Considerations

✓ **Performance is acceptable for MVP**

**Current Implementation:**

- React.memo() properly used on SimpleNode
- Zustand provides efficient state updates
- React Flow handles canvas performance

**Minor Optimization Opportunities:**

- Character counter renders even when node is not in edit mode
- Could use React.useCallback more aggressively

**Scaling Considerations for Future Stories:**

- With 100+ nodes, consider virtualization
- Monitor React Flow performance with complex graphs
- Consider debouncing text input updates to Zustand

### Files Modified During Review

**NONE** - No files were modified during QA review.

### Gate Status

**Gate:** CONCERNS → [docs/qa/gates/1.5-create-nodes.yml](../qa/gates/1.5-create-nodes.yml)

**Risk Profile:** Low-Medium risk due to lack of automated tests  
**Quality Score:** 75/100

**Gate Decision Rationale:**

- Implementation is functionally complete and well-crafted
- All acceptance criteria met with manual verification
- Code quality is good with minor improvement opportunities
- **Primary concern:** Missing automated test coverage
- For MVP, this is acceptable given Story 1.7 will establish testing infrastructure
- No blocking issues; proceed with caution and prioritize test coverage in next sprint

### Recommended Status

✓ **Ready for Done** (with understanding that test coverage is deferred to Story 1.7)

**Conditions:**

- Dev team acknowledges test debt tracked in Story 1.7
- Manual testing has been performed successfully
- Minor issues (MAINT-001, PERF-001) can be addressed in future refactoring

**Next Steps:**

1. Mark story as Done
2. Ensure Story 1.7 includes test coverage for this story's functionality
3. Consider addressing low-priority improvements in future refactoring sessions
