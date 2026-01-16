# Epic 7: Public Library & Discovery

**Objectif:** Créer la bibliothèque publique de raisonnements célèbres avec système de recherche, catégories, et interface de découverte, établissant la communauté de partage.

## Stories

- [Story 7.1: Library Seed Data & Famous Reasonings](story-7.1-library-seed-data.md)
- [Story 7.2: Public Library UI & Discovery](story-7.2-library-ui.md)
- [Story 7.3: Library Search & Filtering](story-7.3-library-search-filtering.md)
- [Story 7.4: User Help System & In-App Documentation](story-7.4-user-help-system.md)

## Success Criteria

- Bibliothèque publique de raisonnements célèbres
- Interface de navigation et découverte
- Système de recherche avec filtres (catégories, tags, mots-clés)
- Catégorisation des graphes (Logique, Mathématiques, Philosophie, etc.)
- Système de tags
- Page de détail pour chaque graphe avec métadonnées
- Possibilité de cloner/forker depuis la bibliothèque
- Seed data avec raisonnements classiques (Socrate est mortel, etc.)

## Dependencies

- Epic 1 (infrastructure)
- Epic 6 (persistence et sharing)

## Technical Notes

- Search indexing (MongoDB text search ou Algolia free tier)
- Système de tags flexible
- Métadonnées enrichies (catégorie, difficulté, tags)
- UI de découverte (grille de cards)
- Seed script pour raisonnements célèbres
- Pagination pour performance
