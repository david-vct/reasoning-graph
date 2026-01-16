# Story 3.5: Axiom Contradiction Detection

**Epic:** [Epic 3: Connections & Real-Time Validation](epic-3-connections.md)

## User Story

**As a** user,  
**I want** to be warned if I create contradictory axioms (e.g., P and ¬P),  
**So that** I avoid building reasoning on inconsistent foundations.

## Acceptance Criteria

1. System detects when multiple Axiom nodes contain contradictory propositions
2. Simple contradiction: Axiom1 contains P, Axiom2 contains ¬P
3. Implication contradiction: Axiom1 has P→Q, Axiom2 has P→¬Q
4. Warning banner displays at top of canvas: "⚠️ Contradictory axioms detected"
5. Conflicting axiom nodes outlined in red dashed border
6. Tooltip on axioms explains the contradiction
7. Warning is non-blocking (user can continue but is informed)
8. Detection runs when axiom nodes are created or modified
9. Performance remains <100ms for up to 50 axioms
10. Contradiction cleared when axioms are fixed or deleted

## Technical Notes

- Proposition comparison logic for contradiction detection
- Parse proposition content to identify P and ¬P patterns
- Simple pattern matching initially (exact string match with/without ¬)
- Store contradictions in global validation state
- Warning banner component above canvas
- Consider future enhancement: semantic contradiction detection
- Unit tests for various contradiction patterns

## Definition of Done

- [ ] Contradiction detection algorithm implemented
- [ ] Simple negation contradictions detected
- [ ] Implication contradictions detected
- [ ] Warning banner displays
- [ ] Axioms outlined in red dashed
- [ ] Tooltips explain contradictions
- [ ] Warning is non-blocking
- [ ] Detection on axiom changes
- [ ] Performance <100ms verified
- [ ] Warning clears when fixed
- [ ] Unit tests comprehensive

## Estimated Effort

**5 points** (2-3 jours)

## Dependencies

- Story 2.1 (Proposition system)
- Story 2.3 (Axiom node type)
- Story 3.2 (Validation engine foundation)

