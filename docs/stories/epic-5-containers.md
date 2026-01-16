# Epic 5: Fractal Architecture (Containers)

**Objectif:** Implémenter l'architecture fractale permettant d'encapsuler des graphes comme containers réutilisables, avec navigation multi-niveaux et validation cascade complète.

## Stories

- [Story 5.1: Container Node Encapsulation](story-5.1-container-encapsulation.md)
- [Story 5.2: Container Multi-Level Navigation](story-5.2-container-navigation.md)
- [Story 5.3: Container Validation Cascade](story-5.3-container-validation-cascade.md)
- [Story 5.4: Nested Container Cycle Detection](story-5.4-nested-container-cycle-detection.md)

## Success Criteria

- Encapsulation de graphes complets en tant que containers réutilisables
- Containers exposent uniquement leurs entrées/sorties
- Navigation multi-niveaux (double-clic pour entrer, breadcrumb pour sortir)
- Validation cascade à travers les containers
- Containers invalides marqués visuellement en rouge
- Nommage/titrage des containers
- Détection des cycles indirects à travers containers imbriqués
- Prévention des encapsulations créant des cycles

## Dependencies

- Epic 1 (infrastructure)
- Epic 2 (types de nodes)
- Epic 3 (connexions et validation)

## Technical Notes

- Pattern composite pour architecture fractale
- Détection de cycles récursive à travers containers
- Propagation de validation en cascade
- State management pour navigation multi-niveaux
- Breadcrumb UI pour navigation
