# Proposition System

A typed proposition system based on formal logic that serves as the foundation for logical reasoning in the Reasoning Graph application.

## Overview

Propositions are formal logical statements that can be either **simple** (atomic) or **complex** (composed). This system provides:

- 5 proposition types: Simple, Implication, Negation, Disjunction, Conjunction
- Type-safe TypeScript classes with validation
- Zod schemas for runtime validation
- Factory functions for easy creation
- Support for recursive composition

## Quick Start

```typescript
import {
  createSimple,
  createImplication,
  createNegation,
  createDisjunction,
  createConjunction,
} from '@reasoning-graph/graph-engine';

// Create simple propositions
const p = createSimple('It is raining');
const q = createSimple('The ground is wet');

// Create complex implication: P → Q
const implication = createImplication(p, q, 'If it is raining, then the ground is wet');

// Validate
console.log(implication.validate()); // true
```

## Proposition Types

### Simple Proposition

Atomic statements with no sub-propositions.

```typescript
const prop = createSimple('Socrates is a man');
```

### Implication (P → Q)

Represents "if P then Q" logical structure.

```typescript
const antecedent = createSimple('It is raining');
const consequent = createSimple('The ground is wet');
const impl = createImplication(antecedent, consequent, 'If it is raining, then the ground is wet');
```

### Negation (¬P)

Represents logical negation "not P".

```typescript
const prop = createSimple('It is raining');
const negation = createNegation(prop, 'It is not raining');
```

### Disjunction (P ∨ Q)

Represents logical OR "P or Q".

```typescript
const left = createSimple('It is raining');
const right = createSimple('It is snowing');
const disj = createDisjunction(left, right, 'It is raining or snowing');
```

### Conjunction (P ∧ Q)

Represents logical AND "P and Q".

```typescript
const left = createSimple('It is raining');
const right = createSimple('It is cold');
const conj = createConjunction(left, right, 'It is raining and cold');
```

## Nested Propositions

Complex propositions can be nested recursively:

```typescript
const p = createSimple('A');
const q = createSimple('B');
const r = createSimple('C');

// (A → B) ∧ C
const impl = createImplication(p, q, 'If A then B');
const conj = createConjunction(impl, r, '(A → B) and C');

console.log(conj.validate()); // true
```

## Validation

All propositions have a `validate()` method that recursively checks:

- Content is non-empty
- Sub-propositions (if any) are valid

```typescript
const valid = createSimple('Valid content');
console.log(valid.validate()); // true

const invalid = createSimple('');
console.log(invalid.validate()); // false
```

## Zod Schema Validation

For runtime validation of JSON data:

```typescript
import { propositionSchema } from '@reasoning-graph/graph-engine';

const data = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  content: 'Test',
  propType: 'simple',
};

const result = propositionSchema.safeParse(data);
if (result.success) {
  console.log('Valid proposition:', result.data);
} else {
  console.error('Invalid:', result.error);
}
```

## Type System

```typescript
import { PropositionType, type AnyProposition } from '@reasoning-graph/graph-engine';

// Enum for proposition types
PropositionType.Simple; // 'simple'
PropositionType.Implication; // 'implication'
PropositionType.Negation; // 'negation'
PropositionType.Disjunction; // 'disjunction'
PropositionType.Conjunction; // 'conjunction'

// Union type for any proposition
function processProposition(prop: AnyProposition) {
  switch (prop.propType) {
    case PropositionType.Simple:
      // prop is SimpleProposition
      break;
    case PropositionType.Implication:
      // prop is ImplicationProposition
      // Access prop.antecedent, prop.consequent
      break;
    // ... other cases
  }
}
```

## Architecture

- **Abstract Base Class**: `Proposition` - Common interface for all propositions
- **Concrete Classes**: `SimpleProposition`, `ImplicationProposition`, `NegationProposition`, `DisjunctionProposition`, `ConjunctionProposition`
- **Type Definitions**: `PropositionType` enum, `AnyProposition` union type
- **Factory Functions**: `create*` functions with auto-generated UUIDs
- **Schemas**: Zod schemas for runtime validation with discriminated unions

## Testing

The proposition system has 100% test coverage with 57 tests covering:

- Creation and validation of all proposition types
- Recursive composition
- Zod schema validation
- Factory function behavior
- TypeScript type inference
