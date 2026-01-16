# Epic 4: Auto-Layout & Visual Polish

**Objectif:** Fournir l'auto-arrangement intelligent avec ordre topologique gauche→droite, optimiser les performances pour grands graphes, et polir l'expérience visuelle (courbes de Bézier, zoom/pan fluide, thèmes).

## Stories

- [Story 4.1: Dagre Auto-Layout Implementation](story-4.1-dagre-layout.md)
- [Story 4.2: Bézier Curve Edges](story-4.2-bezier-curves.md)
- [Story 4.3: Light/Dark Theme System](story-4.3-theme-system.md)
- [Story 4.4: Performance Optimization for Large Graphs](story-4.4-performance-optimization.md)

## Success Criteria

- Auto-arrangement automatique avec ordre topologique gauche→droite
- Bouton "Reset Layout" pour revenir à l'arrangement optimal
- Séparation visuelle minimale entre nodes dépendants
- Courbes de Bézier fluides pour les connexions
- Zoom et pan optimisés
- Thèmes clair et sombre implémentés
- Performance maintenue avec graphes de 200+ nodes
- Debouncing de layout (300ms minimum)

## Dependencies

- Epic 1 (infrastructure)
- Epic 2 (types de nodes)
- Epic 3 (connexions)

## Technical Notes

- Dagre pour algorithme de layout
- Layout incrémental avec debouncing
- Web Workers pour graphes >100 nodes
- React.memo pour optimisation rendering
- Support NFR1 et NFR9 (performance)
