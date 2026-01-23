# Architecture Shards

Ce dossier contient les shards (morceaux) détaillés de l'architecture Reasoning Graph. Cette approche améliore la maintenabilité et optimise les performances des agents IA en limitant chaque document à ~300-800 lignes.

## 📁 Fichiers Disponibles

### Core Shards (Always Loaded by Devs)

- **[tech-stack.md](tech-stack.md)** - Stack technologique complet avec versions et justifications
- **[source-tree.md](source-tree.md)** - Structure du monorepo et organisation des packages
- **[coding-standards.md](coding-standards.md)** - Guidelines de développement, naming conventions, tests

### Additional Shards (Load on Demand)

Les sections suivantes peuvent être ajoutées au besoin:

- **data-models.md** - Interfaces TypeScript et schemas Mongoose détaillés
- **api-specification.md** - Endpoints REST complets avec OpenAPI specs
- **frontend-architecture.md** - Components, state management, routing
- **frontend-ui-components.md** - Spécifications UI détaillées des nodes logiques
- **backend-architecture.md** - Repositories, authentication, caching
- **database-schema.md** - MongoDB schemas et indexes
- **deployment.md** - CI/CD, environments, configuration
- **security-performance.md** - Security patterns et optimizations

## 🔧 Usage avec BMad Method

Les agents IA chargent automatiquement:

1. **Document master:** [../architecture.md](../architecture.md) (693 lignes) - Vue d'ensemble
2. **Shards core:** Automatiquement chargés selon `devLoadAlwaysFiles` dans `.bmad-core/core-config.yaml`
3. **Shards additionnels:** Chargés à la demande quand mentionnés dans le contexte

## 📏 Benefits du Sharding

✅ **Performance:** Documents <800 lignes = contexte optimal pour agents IA  
✅ **Maintenabilité:** Édition ciblée sans charger toute l'architecture  
✅ **Scalabilité:** Ajout de nouvelles sections sans alourdir le master  
✅ **Collaboration:** Édition parallèle de sections différentes  
✅ **Cache:** Sections stables rarement rechargées

## 🎯 Standards

- Chaque shard doit être auto-suffisant (pas de dépendances circulaires)
- Maximum 800 lignes par shard
- Liens relatifs vers autres shards quand nécessaire
- Maintenir cohérence des versions entre shards

---

**Dernière mise à jour:** 23 janvier 2026 - Winston (Architect)
