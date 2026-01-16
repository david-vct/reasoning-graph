# Story 2.4: Concrete Node Type Implementations (Part 2)

**Epic:** [Epic 2: Node Types & Logic System](epic-2-node-types.md)

## User Story

**As a** developer,  
**I want** implementations of advanced node types,  
**So that** I complete the library of logical forms.

## Acceptance Criteria

1. **SyllogismNode**: 2 premises (major, minor), 1 conclusion
2. **DisjunctionNode**: 2 premises (P∨Q, ¬P), 1 conclusion (Q)
3. **ReductioAdAbsurdumNode**: 1 premise (P→⊥), 1 conclusion (¬P)
4. **InductionNode**: 2 premises (P(0), ∀n P(n)→P(n+1)), 1 conclusion (∀n P(n))
5. **FreeFormNode**: dynamic premises (0-5), dynamic conclusions (1-3), methods addPremise(), removePremise(), addConclusion(), always neutral validation
6. All Zod schemas integrated in discriminated union `AnyNodeSchema`
7. Registry `nodeTypeRegistry.ts` contains all definitions with complete metadata
8. Unit tests cover all types with edge case scenarios

## Technical Notes

- FreeFormNode has dynamic premise/conclusion management
- Complete node type registry with metadata
- Symbol notation in all node type definitions
- Edge case testing (boundary conditions)
- Integration of all schemas in AnyNodeSchema union

## Definition of Done

- [ ] SyllogismNode implemented and tested
- [ ] DisjunctionNode implemented and tested
- [ ] ReductioAdAbsurdumNode implemented and tested
- [ ] InductionNode implemented and tested
- [ ] FreeFormNode with dynamic management implemented
- [ ] All schemas in AnyNodeSchema discriminated union
- [ ] nodeTypeRegistry.ts complete with all 9 types
- [ ] Unit tests with edge cases (>90% coverage)
- [ ] All metadata documented

## Estimated Effort

**8 points** (3-4 jours)

## Dependencies

- Story 2.3 (node types part 1)
