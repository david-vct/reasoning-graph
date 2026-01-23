# Project Structure

```
reasoning-graph/
├── .github/workflows/        # CI/CD
├── apps/
│   └── web/                  # Next.js App
│       ├── app/              # App Router (pages + API)
│       ├── components/
│       ├── lib/
│       ├── repositories/
│       ├── models/
│       ├── services/
│       ├── stores/
│       ├── hooks/
│       └── package.json
├── packages/
│   ├── graph-engine/         # Validation logique
│   │   ├── src/
│   │   │   ├── nodes/
│   │   │   ├── propositions/
│   │   │   ├── validation/
│   │   │   └── layout/
│   │   └── package.json
│   ├── ui-components/        # Composants React
│   └── types/                # Types partagés
├── scripts/
├── docs/
├── package.json              # Root workspace
└── README.md
```

## Repository Structure

**Structure:** Monorepo (npm workspaces)  
**Outil Monorepo:** npm workspaces natif  
**Organisation des Packages:**

```
reasoning-graph/
├── apps/
│   └── web/                    # Next.js 14 App (frontend + API routes)
├── packages/
│   ├── graph-engine/           # ⭐ Cœur: validation logique, DAG algorithms
│   ├── ui-components/          # Composants React réutilisables
│   └── types/                  # Types TypeScript partagés
```
