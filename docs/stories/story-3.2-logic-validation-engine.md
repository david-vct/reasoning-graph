# Story 3.2: Logic Validation Engine

**Epic:** [Epic 3: Connections & Real-Time Validation](epic-3-connections.md)

## User Story

**As a** user,  
**I want** real-time validation of my logical reasoning as I connect nodes,  
**So that** I immediately see when my logic is valid or has errors.

## Acceptance Criteria

1. Validation engine validates each node's logical correctness based on its type
2. **Modus Ponens** validation: If premises are P and P→Q, conclusion must be Q
3. **Modus Tollens** validation: If premises are ¬Q and P→Q, conclusion must be ¬P
4. **Syllogism** validation: Major/minor premises follow syllogistic rules
5. Validation runs automatically after any connection change (<100ms latency per NFR2)
6. Invalid nodes display red border with error icon
7. Valid nodes display green border or neutral state
8. Hover over invalid node shows tooltip with specific error message
9. Axiom nodes are always valid (no premises required)
10. FreeForm nodes are always neutral (no validation)
11. Validation results stored in node validationState property

## Technical Notes

- Validation engine in packages/graph-engine/src/validation/
- Pure functions for each node type validation
- Use proposition type checking for logical correctness
- Debounced validation for performance (50ms)
- Error messages in French (user language)
- Unit tests for all validation rules

## Definition of Done

- [ ] Validation engine module created
- [ ] All node types have validation logic
- [ ] Modus Ponens validation working
- [ ] Modus Tollens validation working
- [ ] Syllogism validation working
- [ ] Validation runs on connection changes
- [ ] Latency <100ms verified
- [ ] Visual feedback (red/green) working
- [ ] Tooltips show error messages
- [ ] Axiom/FreeForm handled correctly
- [ ] Validation state persisted
- [ ] Unit tests 100% coverage

## Estimated Effort

**8 points** (3-4 jours)

## Dependencies

- Story 2.1 (Proposition system)
- Story 2.3-2.4 (All node types)
- Story 3.1 (Connections exist to validate)

