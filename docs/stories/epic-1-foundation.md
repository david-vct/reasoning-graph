# Epic 1: Foundation & Core Graph Infrastructure

**Objectif:** Établir l'infrastructure technique complète du projet (monorepo Next.js, authentification NextAuth, MongoDB, CI/CD) tout en livrant une première fonctionnalité utilisateur tangible: un éditeur de graphe minimal permettant de créer des nodes simples, les positionner manuellement, et les visualiser.

## Stories

- [Story 1.1: Setup Project & Monorepo Structure](story-1.1-setup-project.md)
- [Story 1.2: Database Setup & Connection](story-1.2-database-setup.md)
- [Story 1.3: Authentication System Setup](story-1.3-authentication.md)
- [Story 1.4: Canvas & React Flow Integration](story-1.4-canvas-integration.md)
- [Story 1.5: Create Simple Nodes](story-1.5-create-nodes.md)
- [Story 1.7: Testing Infrastructure Setup](story-1.7-testing-infrastructure.md)
- [Story 1.6: CI/CD Pipeline & Deployment](story-1.6-cicd-deployment.md)

## Success Criteria

- Infrastructure technique complète opérationnelle (Next.js, MongoDB, Auth, CI/CD)
- Éditeur de graphe fonctionnel permettant de créer, positionner et manipuler des nodes simples
- Application déployée automatiquement sur Vercel avec tests automatisés

## Dependencies

Aucune - Epic fondationnelle

## Technical Notes

- Monorepo structure pour séparation des concerns
- Next.js 14+ avec App Router
- TypeScript strict mode
- MongoDB Atlas free tier
- NextAuth.js v5 pour l'authentification
- React Flow 11+ pour le canvas
