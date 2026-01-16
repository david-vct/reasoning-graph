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
