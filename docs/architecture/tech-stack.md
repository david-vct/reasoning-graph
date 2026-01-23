# Tech Stack

Cette table constitue la source unique de vérité - tout développement doit utiliser exactement ces versions.

| Catégorie                | Technologie        | Version             | Objectif                     | Justification                                      |
| ------------------------ | ------------------ | ------------------- | ---------------------------- | -------------------------------------------------- |
| **Frontend Language**    | TypeScript         | 5.3+                | Langage principal frontend   | Type safety cruciale pour graph engine complexe    |
| **Frontend Framework**   | Next.js            | 14.1+               | Framework React full-stack   | App Router avec RSC, API Routes intégrées          |
| **UI Component Library** | React              | 18.2+               | Bibliothèque UI              | Standard industrie, React Flow compatible          |
| **Graph Rendering**      | React Flow         | 11.10+              | Canvas de graphe interactif  | Solution mature pour DAG editing                   |
| **State Management**     | Zustand            | 4.5+                | Store global léger           | Minimal boilerplate, excellent pour state complexe |
| **UI Component Library** | shadcn/ui          | Latest              | Composants UI réutilisables  | Components Tailwind copiables, Radix UI accessible |
| **CSS Framework**        | Tailwind CSS       | 3.4+                | Styling utility-first        | Rapid prototyping, design system via config        |
| **Backend Language**     | TypeScript         | 5.3+                | Langage API Routes           | Partage types avec frontend                        |
| **Backend Framework**    | Next.js API Routes | 14.1+               | Endpoints REST serverless    | Pas de serveur séparé, déploiement unifié          |
| **API Style**            | REST               | -                   | Architecture API             | Simplicité, caching HTTP standard                  |
| **Database**             | MongoDB            | 7.0+                | Base de données NoSQL        | Free tier Atlas, schémas flexibles                 |
| **ORM/ODM**              | Mongoose           | 8.1+                | Object Document Mapper       | Validation schemas, TypeScript support             |
| **Cache**                | Vercel KV (Redis)  | Latest              | Cache in-memory serverless   | Free tier 256MB, ultra-rapide                      |
| **File Storage**         | Vercel Blob        | Latest              | Stockage fichiers (future)   | Free tier 5GB, prêt pour export PNG/PDF            |
| **Authentication**       | NextAuth.js        | 5.0+ (beta)         | Auth avec JWT                | Provider credentials, session JWT                  |
| **Validation**           | Zod                | 3.22+               | Runtime validation           | Infer TypeScript types, schemas réutilisables      |
| **Frontend Testing**     | Jest               | 29.7+               | Unit tests composants React  | Standard industrie, React Testing Library          |
| **Backend Testing**      | Jest               | 29.7+               | Unit tests API Routes        | Même runner que frontend                           |
| **E2E Testing**          | Playwright         | 1.41+               | Tests end-to-end             | Multi-browser, debug UI excellent                  |
| **Build Tool**           | Turbopack          | Built-in Next.js 14 | Build et dev server          | Rust-powered ultra rapide                          |
| **Bundler**              | Turbopack          | Built-in Next.js 14 | Bundling production          | Tree-shaking optimal                               |
| **Graph Algorithms**     | graphlib           | 2.1+                | DAG validation et topo sort  | Détection cycles O(n)                              |
| **Layout Engine**        | @dagrejs/dagre     | 1.1+                | Auto-arrangement graphe      | Algorithme Sugiyama layout                         |
| **IaC Tool**             | Vercel CLI         | Latest              | Infrastructure as Code       | Configuration vercel.json                          |
| **CI/CD**                | GitHub Actions     | N/A                 | Pipeline CI/CD               | Free pour repos publics                            |
| **Monitoring**           | Vercel Analytics   | Latest (free tier)  | Analytics et Core Web Vitals | Real User Monitoring                               |
| **Logging**              | Vercel Logs        | Latest              | Logs serverless functions    | Tail logs en temps réel                            |
| **Error Tracking**       | Sentry             | Free tier           | Tracking erreurs production  | 5k events/mois gratuit                             |
