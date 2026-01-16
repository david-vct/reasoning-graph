# Reasoning Graph - Epics & Stories

## Vue d'ensemble

Ce dossier contient tous les épiques et stories du projet Reasoning Graph, extraits du [PRD principal](../prd.md).

## Structure

- **Fichiers Epic**: `epic-{n}-{nom}.md` - Vue d'ensemble de chaque épique
- **Fichiers Story**: `story-{epic}.{story}-{nom}.md` - Détails de chaque user story

## Epics

### 📋 [Epic 1: Foundation & Core Graph Infrastructure](epic-1-foundation.md)
*Infrastructure technique et éditeur de base*

- [Story 1.1: Setup Project & Monorepo Structure](story-1.1-setup-project.md)
- [Story 1.2: Database Setup & Connection](story-1.2-database-setup.md)
- [Story 1.3: Authentication System Setup](story-1.3-authentication.md)
- [Story 1.4: Canvas & React Flow Integration](story-1.4-canvas-integration.md)
- [Story 1.5: Create Simple Nodes](story-1.5-create-nodes.md)
- [Story 1.6: CI/CD Pipeline & Deployment](story-1.6-cicd-deployment.md)

**Total Epic 1:** 21 points (~2-3 semaines)

---

### 🎯 [Epic 2: Node Types & Logic System](epic-2-node-types.md)
*Système de types de nodes logiques*

- [Story 2.1: Proposition System & Type Definitions](story-2.1-proposition-system.md)
- [Story 2.2: Abstract Node Base Class & Type System](story-2.2-abstract-node.md)
- [Story 2.3: Concrete Node Type Implementations (Part 1)](story-2.3-node-types-part1.md)
- [Story 2.4: Concrete Node Type Implementations (Part 2)](story-2.4-node-types-part2.md)

**Total Epic 2:** 26 points (~2-3 semaines)

---

### 🔗 [Epic 3: Connections & Real-Time Validation](epic-3-connections.md)
*Connexions et validation en temps réel*

**Status:** Stories à définir

---

### 🎨 [Epic 4: Auto-Layout & Visual Polish](epic-4-auto-layout.md)
*Auto-arrangement et optimisations visuelles*

**Status:** Stories à définir

---

### 📦 [Epic 5: Fractal Architecture (Containers)](epic-5-containers.md)
*Architecture fractale avec containers*

**Status:** Stories à définir

---

### 💾 [Epic 6: Persistence & Sharing](epic-6-persistence.md)
*Sauvegarde et partage de graphes*

**Status:** Stories à définir

---

### 📚 [Epic 7: Public Library & Discovery](epic-7-library.md)
*Bibliothèque publique et découverte*

**Status:** Stories à définir

---

## Progression

- ✅ **Epic 1 & 2:** Stories complètement détaillées (10 stories, 47 points)
- 🚧 **Epic 3-7:** Vue d'ensemble créée, stories détaillées à définir

## Conventions

### Estimation (Story Points)
- **1-2 points:** 1-4 heures
- **3 points:** 1-2 jours
- **5 points:** 2-3 jours
- **8 points:** 3-4 jours
- **13 points:** 1 semaine

### Format des Stories
Chaque story contient:
- User Story (As a... I want... So that...)
- Acceptance Criteria
- Technical Notes
- Definition of Done
- Estimated Effort
- Dependencies

## Utilisation

1. **Pour les développeurs:** Consulter les stories pour comprendre les exigences détaillées
2. **Pour le planning:** Utiliser les estimations pour le sprint planning
3. **Pour le suivi:** Cocher les items dans "Definition of Done"

## Liens Utiles

- [PRD complet](../prd.md)
- [Architecture](../architecture.md)
- [Brief du projet](../brief.md)
