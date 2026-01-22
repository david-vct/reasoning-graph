# Story 2.1: Proposition System & Type Definitions

**Epic:** [Epic 2: Node Types & Logic System](../epics/epic-2-node-types.md)  
**Status:** Ready for Review  
**Agent Model Used:** Claude Sonnet 4.5

## User Story

**As a** developer,  
**I want** to define a typed propositions system based on formal logic that serves as the foundation for node premises and conclusions,  
**So that** I create a flexible and type-safe architecture where logic nodes can reference and compose propositions using logical connectives.

## Context & Domain Overview

### What is a Proposition?

In Reasoning Graph, a **proposition** is a formal logical statement that can be either **simple** (atomic) or **complex** (composed). Propositions are the fundamental building blocks of logical reasoning:

- **Simple Propositions:** Atomic statements like "Socrates is a man" or "It is raining"
- **Complex Propositions:** Composed using logical connectives (→, ∨, ∧, ¬) that combine simple or other complex propositions

### Relationship to Logic Nodes

**Nodes use propositions for their premises and conclusions:**

- Each node's input premises are **references to propositions**
- Each node's output conclusions are **references to propositions**
- Nodes apply logical inference rules (modus ponens, syllogism, etc.) to transform input propositions into output propositions

Example: A modus ponens node might have:

- Premise 1: `Proposition(id: "p1", content: "If it rains, the ground is wet", type: "implication")`
- Premise 2: `Proposition(id: "p2", content: "It is raining", type: "simple")`
- Conclusion: `Proposition(id: "p3", content: "The ground is wet", type: "simple")`

### Logical Connectives

Complex propositions reference other propositions via logical connectives:

1. **Implication (→):** `P → Q` has antecedent proposition P and consequent proposition Q
2. **Conjunction (∧):** `P ∧ Q` has left proposition P and right proposition Q
3. **Disjunction (∨):** `P ∨ Q` has left proposition P and right proposition Q
4. **Negation (¬):** `¬P` has a single sub-proposition P
5. **Simple:** Atomic proposition with no sub-propositions

## Architecture Reference

See [Architecture: Data Models - Proposition](../architecture.md#proposition) for the canonical TypeScript interface:

```typescript
export type PropositionType = 'simple' | 'implication' | 'negation' | 'disjunction' | 'conjunction';

export interface Proposition {
  id: string;
  content: string;
  propType: PropositionType;
  subPropositions?: {
    antecedent?: Proposition;
    consequent?: Proposition;
    left?: Proposition;
    right?: Proposition;
  };
}
```

## Acceptance Criteria

1. **Base Proposition Class:** Abstract class `Proposition` defined in `packages/graph-engine/src/propositions/Proposition.ts` with:
   - `id: string` - Unique identifier
   - `content: string` - Human-readable statement
   - `propType: PropositionType` - Discriminator for type
   - `abstract validate(): boolean` - Validation hook for subclasses

2. **Simple Proposition:** `SimpleProposition` class with no sub-propositions
   - No additional properties beyond base
   - `validate()` returns true if content is non-empty

3. **Implication Proposition:** `ImplicationProposition` class with:
   - `antecedent: Proposition` - The "if" part (P in P→Q)
   - `consequent: Proposition` - The "then" part (Q in P→Q)
   - `validate()` checks both antecedent and consequent exist and are valid

4. **Negation Proposition:** `NegationProposition` class with:
   - `negated: Proposition` - The proposition being negated
   - `validate()` checks negated proposition exists and is valid

5. **Disjunction Proposition:** `DisjunctionProposition` class with:
   - `left: Proposition` - Left side of OR
   - `right: Proposition` - Right side of OR
   - `validate()` checks both propositions exist and are valid

6. **Conjunction Proposition:** `ConjunctionProposition` class with:
   - `left: Proposition` - Left side of AND
   - `right: Proposition` - Right side of AND
   - `validate()` checks both propositions exist and are valid

7. **Zod Schemas:** Each proposition class has a corresponding Zod schema for runtime validation with discriminated union on `propType`

8. **Type Union:** `AnyProposition` union type = `SimpleProposition | ImplicationProposition | NegationProposition | DisjunctionProposition | ConjunctionProposition`

9. **Factory Functions:** Helper functions in `propositions/factories.ts`:
   - `createSimple(content: string): SimpleProposition`
   - `createImplication(antecedent: Proposition, consequent: Proposition, content: string): ImplicationProposition`
   - `createNegation(negated: Proposition, content: string): NegationProposition`
   - `createDisjunction(left: Proposition, right: Proposition, content: string): DisjunctionProposition`
   - `createConjunction(left: Proposition, right: Proposition, content: string): ConjunctionProposition`

10. **Unit Tests:** Jest tests in `propositions/__tests__/` covering:
    - Creation of each proposition type
    - Validation logic for each type
    - Zod schema validation
    - Recursive composition (complex propositions containing complex propositions)
    - TypeScript type inference
    - 100% code coverage

## Technical Implementation Guidance

### File Structure

```
packages/graph-engine/src/propositions/
├── Proposition.ts              # Abstract base class
├── SimpleProposition.ts
├── ImplicationProposition.ts
├── NegationProposition.ts
├── DisjunctionProposition.ts
├── ConjunctionProposition.ts
├── types.ts                    # PropositionType enum, AnyProposition union
├── schemas.ts                  # Zod schemas with discriminated union
├── factories.ts                # Factory helper functions
├── index.ts                    # Public API exports
└── __tests__/
    ├── SimpleProposition.test.ts
    ├── ImplicationProposition.test.ts
    ├── NegationProposition.test.ts
    ├── DisjunctionProposition.test.ts
    ├── ConjunctionProposition.test.ts
    ├── schemas.test.ts
    └── factories.test.ts
```

### Implementation Pattern

```typescript
// Example: ImplicationProposition.ts
import { Proposition } from './Proposition';
import { PropositionType } from './types';

export class ImplicationProposition extends Proposition {
  propType: PropositionType.Implication = 'implication';

  constructor(
    id: string,
    content: string,
    public antecedent: Proposition,
    public consequent: Proposition
  ) {
    super(id, content, 'implication');
  }

  validate(): boolean {
    return this.content.length > 0 && this.antecedent.validate() && this.consequent.validate();
  }
}
```

### Zod Schema Pattern

Use discriminated union for type-safe runtime validation:

```typescript
// schemas.ts
import { z } from 'zod';

const basePropositionSchema = z.object({
  id: z.string().uuid(),
  content: z.string().min(1),
  propType: z.enum(['simple', 'implication', 'negation', 'disjunction', 'conjunction']),
});

// Define recursive type for nested propositions
type PropositionInput = z.infer<typeof basePropositionSchema> & {
  antecedent?: PropositionInput;
  consequent?: PropositionInput;
  left?: PropositionInput;
  right?: PropositionInput;
  negated?: PropositionInput;
};

export const propositionSchema: z.ZodType<PropositionInput> = z.lazy(() =>
  z.discriminatedUnion('propType', [
    z.object({
      ...basePropositionSchema.shape,
      propType: z.literal('simple'),
    }),
    z.object({
      ...basePropositionSchema.shape,
      propType: z.literal('implication'),
      antecedent: propositionSchema,
      consequent: propositionSchema,
    }),
    // ... other types
  ])
);
```

### Usage Example

```typescript
import { createSimple, createImplication } from './propositions/factories';

// Create simple propositions
const p1 = createSimple('It is raining');
const p2 = createSimple('The ground is wet');

// Create complex implication: "If it rains, the ground is wet"
const implication = createImplication(p1, p2, 'If it is raining, then the ground is wet');

// Validate
console.log(implication.validate()); // true
```

## Testing Requirements

### Test Coverage Targets

- Line coverage: 100%
- Branch coverage: 100%
- Function coverage: 100%

### Key Test Scenarios

1. **Simple Proposition:**
   - Creates with valid content
   - Rejects empty content
   - Validates successfully

2. **Complex Propositions:**
   - Creates with valid sub-propositions
   - Validates recursively
   - Handles nested complex propositions (e.g., implication containing disjunction)

3. **Zod Schemas:**
   - Parses valid proposition JSON
   - Rejects invalid structures
   - Correctly discriminates by propType

4. **Factory Functions:**
   - Generate unique IDs
   - Set correct propType
   - Create valid proposition instances

## Definition of Done

- [x] Abstract Proposition class defined with validate() method
- [x] All 5 concrete proposition classes implemented (Simple, Implication, Negation, Disjunction, Conjunction)
- [x] PropositionType enum exported from types.ts
- [x] AnyProposition union type created
- [x] Zod schemas with discriminated union implemented
- [x] Factory functions for all proposition types
- [x] Jest tests with 100% coverage
- [x] TypeScript strict mode passes
- [x] All exports available from index.ts

## Estimated Effort

**5 points** (2-3 days)

## Dependencies

- Story 1.1 (project setup for packages/graph-engine)
- Story 1.7 (testing infrastructure with Jest configured)

---

## Dev Agent Record

### Debug Log References

None

### Completion Notes

- ✅ Successfully implemented complete proposition system with all 5 proposition types
- ✅ Achieved 100% test coverage (57 tests passing)
- ✅ All TypeScript compilation passes for proposition files
- ✅ Zod schemas implemented with discriminated union for runtime validation
- ✅ Factory functions with auto-generated UUIDs for all proposition types
- ✅ Recursive validation working correctly for nested complex propositions
- ✅ Public API exports tested and verified

### File List

**Source Files:**

- `packages/graph-engine/src/propositions/Proposition.ts` - Abstract base class
- `packages/graph-engine/src/propositions/SimpleProposition.ts` - Simple proposition implementation
- `packages/graph-engine/src/propositions/ImplicationProposition.ts` - Implication (P→Q) implementation
- `packages/graph-engine/src/propositions/NegationProposition.ts` - Negation (¬P) implementation
- `packages/graph-engine/src/propositions/DisjunctionProposition.ts` - Disjunction (P∨Q) implementation
- `packages/graph-engine/src/propositions/ConjunctionProposition.ts` - Conjunction (P∧Q) implementation
- `packages/graph-engine/src/propositions/types.ts` - PropositionType enum and AnyProposition union
- `packages/graph-engine/src/propositions/factories.ts` - Factory functions with UUID generation
- `packages/graph-engine/src/propositions/schemas.ts` - Zod schemas with discriminated union
- `packages/graph-engine/src/propositions/index.ts` - Public API exports
- `packages/graph-engine/src/propositions/README.md` - Documentation with usage examples
- `packages/graph-engine/src/index.ts` - Updated to export proposition system

**Test Files:**

- `packages/graph-engine/src/propositions/__tests__/SimpleProposition.test.ts` - 6 tests
- `packages/graph-engine/src/propositions/__tests__/ImplicationProposition.test.ts` - 7 tests
- `packages/graph-engine/src/propositions/__tests__/NegationProposition.test.ts` - 6 tests
- `packages/graph-engine/src/propositions/__tests__/DisjunctionProposition.test.ts` - 7 tests
- `packages/graph-engine/src/propositions/__tests__/ConjunctionProposition.test.ts` - 7 tests
- `packages/graph-engine/src/propositions/__tests__/factories.test.ts` - 11 tests
- `packages/graph-engine/src/propositions/__tests__/schemas.test.ts` - 9 tests
- `packages/graph-engine/src/propositions/__tests__/index.test.ts` - 4 tests

### Change Log

- Created complete proposition system architecture
- Implemented abstract Proposition base class with validate() method
- Implemented 5 concrete proposition classes (Simple, Implication, Negation, Disjunction, Conjunction)
- Created PropositionType enum and AnyProposition union type
- Implemented factory functions with auto-generated UUIDs using Node's crypto.randomUUID()
- Created comprehensive test suite with 57 tests achieving 100% code coverage
- Implemented public API exports through index.ts
