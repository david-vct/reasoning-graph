# Epic 2: Node Types & Logic System

**Objectif:** Implémenter le système de types de nodes logiques avec système de propositions typées et architecture orientée objet utilisant classes TypeScript abstraites et Zod pour la validation runtime. Chaque type de node expose visuellement ses points d'entrée et de sortie avec nomenclature appropriée.

## Stories

- [Story 2.1: Proposition System & Type Definitions](../stories/story-2.1-proposition-system.md)
- [Story 2.2: Abstract Node Base Class & Type System](../stories/story-2.2-abstract-node.md)
- [Story 2.3: Concrete Node Type Implementations (Part 1)](../stories/story-2.3-node-types-part1.md)
- [Story 2.4: Concrete Node Type Implementations (Part 2)](../stories/story-2.4-node-types-part2.md)
- [Story 2.5: Logic Node Visual Components](../stories/story-2.5-logic-node-visual-components.md) ⭐ **CRITIQUE - Débloque Epic 3**
- [Story 2.6: Node Type Creation Menu](../stories/story-2.6-node-type-creation-menu.md)
- [Story 2.7: Proposition Inline Editing](../stories/story-2.7-proposition-inline-editing.md)

## Success Criteria

- Système de propositions typées complet et testé
- Architecture orientée objet avec classes abstraites et concrètes
- Tous les types de nodes logiques implémentés (Axiom, Modus Ponens, Modus Tollens, Syllogism, Disjunction, Reductio, Induction, FreeForm)
- Validation Zod pour tous les types
- Tests unitaires avec couverture >80%

## Dependencies

- Epic 1 (infrastructure fondamentale requise)

## Technical Notes

- Classes TypeScript abstraites pour LogicNode
- Zod schemas avec discriminated unions
- Jest pour tests unitaires
- Factory pattern pour création de nodes
- Registry pattern pour types de nodes
