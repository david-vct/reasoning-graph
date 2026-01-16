# Epic 6: Persistence & Sharing

**Objectif:** Activer la sauvegarde/chargement des graphes dans MongoDB, gestion des graphes publics/privés, URLs partageables, et système de clone/fork avec traçabilité.

## Stories

- [Story 6.1: Graph CRUD API Endpoints](story-6.1-graph-crud-api.md)
- [Story 6.2: Graph Save/Load Functionality](story-6.2-graph-save-load-ui.md)
- [Story 6.3: Shareable URLs for Public Graphs](story-6.3-shareable-urls.md)
- [Story 6.4: Clone/Fork Public Graphs](story-6.4-clone-fork-graphs.md)

## Success Criteria

- Sauvegarde et chargement de graphes depuis MongoDB
- Gestion des graphes publics/privés
- URLs partageables pour graphes publics
- Système de clone/fork
- Traçabilité de l'auteur original lors de clone/fork
- Confirmation explicite lors de sauvegarde publique
- Quota de 50 graphes par utilisateur (NFR10)
- Liste "Mes graphes" dans interface utilisateur

## Dependencies

- Epic 1 (infrastructure, auth, database)
- Epic 2 (types de nodes - pour sérialisation)

## Technical Notes

- Schéma Mongoose pour Graph
- Sérialisation/désérialisation complète du graphe
- API routes pour CRUD opérations
- Gestion des permissions (public/private)
- URL generation avec slug ou ID
- Clone/fork avec copie profonde
