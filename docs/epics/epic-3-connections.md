# Epic 3: Connections & Real-Time Validation

**Objectif:** Activer la connexion entre nodes (drag-and-drop + click-click), implémenter le moteur de validation logique en temps réel avec feedback visuel (rouge/vert), et détecter/interdire les cycles.

## Stories

- [Story 3.1: Connection Modes Implementation](story-3.1-connection-modes.md)
- [Story 3.2: Logic Validation Engine](story-3.2-logic-validation-engine.md)
- [Story 3.3: Cycle Detection & Prevention](../stories/story-3.3-cycle-detection.md)
- [Story 3.4: Validation Cascade Propagation](../stories/story-3.4-validation-propagation.md)
- [Story 3.5: Axiom Contradiction Detection](../stories/story-3.5-axiom-contradiction-detection.md)
- [Story 3.6: Node Validation Visual Feedback](../stories/story-3.6-node-validation-visual-feedback.md) ⭐ **NOUVEAU**

## Success Criteria

- Connexions entre nodes fonctionnelles avec deux modes (drag-and-drop et click-click)
- Moteur de validation logique en temps réel
- Feedback visuel immédiat (rouge pour invalide, vert pour valide)
- Détection automatique des cycles
- Interdiction de créer des connexions créant des cycles
- Propagation en cascade du statut de validation

## Dependencies

- Epic 1 (infrastructure)
- Epic 2 (types de nodes)

## Technical Notes

- graphlib pour détection de cycles
- Validation incrémentale pour performance
- Tooltips explicatifs sur erreurs
- Algorithme de propagation en cascade
