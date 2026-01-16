# Story 2.1: Proposition System & Type Definitions

**Epic:** [Epic 2: Node Types & Logic System](epic-2-node-types.md)

## User Story

**As a** developer,  
**I want** to define a typed propositions system that serves as the basis for premises and conclusions,  
**So that** I create a flexible and type-safe architecture for all logic node types.

## Acceptance Criteria

1. An abstract class `Proposition` is defined in `packages/graph-engine/src/propositions/` with: `id: string`, `content: string`, `type: PropositionType`, `validate(): boolean` (abstract method)
2. Concrete classes inherit from `Proposition`: SimpleProposition, ImplicationProposition, NegationProposition, DisjunctionProposition, ConjunctionProposition
3. Each proposition class has a corresponding Zod schema
4. A union type `AnyProposition` groups all proposition types
5. Helper functions allow easy proposition creation
6. Jest unit tests validate: creation of each proposition type, Zod validation, correct TypeScript type inference

## Technical Notes

- Abstract class pattern for Proposition
- Zod discriminated union for runtime validation
- PropositionType enum
- Factory functions for proposition creation
- 100% test coverage for this module

## Definition of Done

- [ ] Abstract Proposition class defined
- [ ] All 5 concrete proposition classes implemented
- [ ] Zod schemas for all proposition types
- [ ] AnyProposition union type created
- [ ] Helper factory functions implemented
- [ ] Jest tests with 100% coverage
- [ ] TypeScript type inference verified

## Estimated Effort

**5 points** (2-3 jours)

## Dependencies

- Story 1.1 (project setup for packages/graph-engine)
