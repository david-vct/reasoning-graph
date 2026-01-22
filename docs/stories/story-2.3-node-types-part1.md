# Story 2.3: Concrete Node Type Implementations (Part 1)

**Epic:** [Epic 2: Node Types & Logic System](epic-2-node-types.md)

## User Story

**As a** developer,  
**I want** concrete implementations of the most common node types,  
**So that** I validate the architecture and provide the first usable types.

## Acceptance Criteria

1. **AxiomNode** extends LogicNode: no premises, 1 conclusion, always valid
2. **ModusPonensNode** extends LogicNode: 2 premises (P, P→Q), 1 conclusion (Q), validates logical inference
3. **ModusTollensNode** extends LogicNode: 2 premises (¬Q, P→Q), 1 conclusion (¬P)
4. **SimpleAffirmationNode** extends LogicNode: 1 premise, 1 conclusion (direct pass-through)
5. Each class has its Zod schema with discriminated union on type
6. Unit tests for each type verify: instantiation, Zod validation, validate() method with valid/invalid cases, TypeScript type inference

## Technical Notes

- Each node type in separate file
- Zod discriminated union on 'type' field
- Comprehensive validation logic for each type
- Test coverage >90% for this module
- Symbol notation (P→Q, ¬P, etc.) in metadata

## Definition of Done

- [ ] AxiomNode implemented and tested
- [ ] ModusPonensNode implemented and tested
- [ ] ModusTollensNode implemented and tested
- [ ] SimpleAffirmationNode implemented and tested
- [ ] Zod schemas with discriminated union
- [ ] Unit tests for all types (>90% coverage)
- [ ] Valid and invalid test cases
- [ ] TypeScript inference working

## Estimated Effort

**8 points** (3-4 jours)

## Dependencies

- Story 2.2 (abstract node base class)

---

## Dev Agent Record

### Tasks

- [x] Implement AxiomNode class with tests
- [x] Implement ModusPonensNode class with tests
- [x] Implement ModusTollensNode class with tests
- [x] Implement SimpleAffirmationNode class with tests
- [x] Create Zod schemas with discriminated union
- [x] Verify test coverage >90%
- [x] Update factory to use real implementations

### Debug Log

(No issues encountered during implementation)

### Completion Notes

- All 4 node types implemented with 100% test coverage
- Zod schemas already existed from Story 2.2 with proper discriminated union
- Added comprehensive unit tests for each node type covering instantiation, validation, and type inference
- Updated factory.ts to use real implementations instead of mock classes
- All tests pass (49 tests for the 4 node types)
- TypeScript type inference working correctly

### File List

**Created:**

- packages/graph-engine/src/nodes/AxiomNode.ts
- packages/graph-engine/src/nodes/ModusPonensNode.ts
- packages/graph-engine/src/nodes/ModusTollensNode.ts
- packages/graph-engine/src/nodes/SimpleAffirmationNode.ts
- packages/graph-engine/src/nodes/**tests**/AxiomNode.test.ts
- packages/graph-engine/src/nodes/**tests**/ModusPonensNode.test.ts
- packages/graph-engine/src/nodes/**tests**/ModusTollensNode.test.ts
- packages/graph-engine/src/nodes/**tests**/SimpleAffirmationNode.test.ts
- packages/graph-engine/src/nodes/**tests**/schemas.test.ts

**Modified:**

- packages/graph-engine/src/nodes/index.ts (added exports for concrete classes)
- packages/graph-engine/src/nodes/factory.ts (replaced mock implementations with real ones)

### Change Log

(No changes to story requirements)

---

**Status:** Ready for Review  
**Agent Model Used:** Claude Sonnet 4.5
