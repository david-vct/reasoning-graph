# Reasoning Graph Product Requirements Document (PRD)

**Version:** 1.0  
**Date:** January 15, 2026  
**Author:** Davidou & John (Product Manager)

---

## Goals and Background Context

### Goals

- Fournir un outil visuel interactif pour construire et valider des raisonnements logiques formels
- Détecter automatiquement les erreurs logiques et les raisonnements circulaires en temps réel
- Permettre la réutilisation de graphes complets comme composants dans d'autres raisonnements (architecture fractale)
- Offrir un équilibre entre rigueur formelle (nodes typés) et liberté d'exploration (nodes libres)
- Rendre la logique formelle accessible aux non-spécialistes sans nécessiter une expertise en proof assistants
- Garantir la scalabilité pour gérer des graphes complexes de 100+ nodes
- Créer une bibliothèque publique de raisonnements célèbres réutilisables

### Background Context

Les chercheurs, étudiants et professionnels qui construisent des arguments logiques complexes manquent d'outils dédiés à la visualisation et validation de raisonnements formels. Les solutions actuelles (papier, mind mapping générique, proof assistants) sont soit trop permissives sans validation, soit trop complexes avec des courbes d'apprentissage de plusieurs mois. Ce vide crée des erreurs logiques non détectées, une réinvention perpétuelle des raisonnements classiques, et limite l'accessibilité de la logique formelle.

Reasoning Graph comble cet espace en créant un éditeur visuel de graphes logiques avec validation intelligente non-bloquante. Le système permet de construire des raisonnements comme des graphes dirigés où chaque node représente une étape logique (modus ponens, syllogisme, etc.), avec des prémisses typées et une validation automatique qui guide sans bloquer. L'architecture fractale permet d'encapsuler tout graphe validé comme composant réutilisable, gérant ainsi la complexité de raisonnements comportant des centaines d'étapes.

### Change Log

| Date       | Version | Description              | Author            |
| ---------- | ------- | ------------------------ | ----------------- |
| 2026-01-15 | 1.0     | Initial PRD creation     | Davidou & John PM |

---

## Requirements

### Functional Requirements

**FR1:** Le système doit permettre aux utilisateurs de créer des nodes avec plusieurs types logiques: modus ponens, modus tollens, syllogisme, disjonction, raisonnement par l'absurde, induction, affirmation simple, et nodes en forme libre.

**FR2:** Chaque node typé doit exposer le nombre approprié de prémisses en entrée et de conclusions en sortie selon son type logique (ex: modus ponens a 2 entrées et 1 sortie; syllogisme a 2 entrées et 1 sortie).

**FR2b:** Les types de nodes doivent être affichés en utilisant la notation logique formelle (ex: P→Q, P∨Q, ¬P) nécessitant que les utilisateurs comprennent les symboles logiques de base.

**FR3:** Le système doit permettre aux utilisateurs de connecter la conclusion d'un node aux prémisses d'un autre node via interaction drag-and-drop ou click-click (deux modes au choix).

**FR4:** Le système doit valider les connexions logiques en temps réel et indiquer visuellement les connexions invalides en rouge avec des tooltips explicatifs.

**FR5:** Le système doit détecter et signaler les raisonnements circulaires en identifiant les cycles dans la structure du graphe dirigé.

**FR5b:** Le système doit interdire la création de connexions qui créeraient des cycles, empêchant ainsi les démonstrations cycliques invalides.

**FR6:** Le système doit propager le statut de validation en cascade - les nodes invalides doivent marquer visuellement tous les nodes descendants dépendants.

**FR7:** Le système doit permettre l'encapsulation de tout graphe (validé ou invalide) en tant que node container réutilisable exposant uniquement ses entrées/sorties.

**FR7b:** Les containers contenant des erreurs logiques internes doivent être marqués visuellement en rouge avec un message indiquant l'invalidité, et leurs conclusions ne se propageront pas comme valides aux nodes descendants.

**FR8:** Les utilisateurs doivent pouvoir double-cliquer sur les containers pour naviguer dans leur structure de graphe interne.

**FR9:** Le système doit supporter l'ajout d'annotations et de commentaires sur les nodes individuels.

**FR10:** Le système doit fournir un type de node "Axiome" dédié permettant aux utilisateurs de déclarer des prémisses/hypothèses initiales qui peuvent être référencées comme entrées dans tous les autres nodes du graphe.

**FR11:** Le système doit imposer un ordre topologique strict de gauche à droite où tout node dépendant d'un autre doit être positionné strictement à sa droite avec une séparation visuelle minimale, tout en fournissant un auto-arrangement fort pour un layout optimal.

**FR12:** Le système doit afficher les connexions en utilisant des courbes de Bézier fluides pour une visualisation naturelle.

**FR13:** Le système doit fournir des capacités de zoom et panoramique pour naviguer dans les grands graphes.

**FR14:** Les utilisateurs doivent pouvoir créer, sauvegarder et charger des graphes de raisonnement avec un stockage cloud persistant.

**FR15:** Le système doit supporter l'authentification utilisateur pour la propriété des graphes.

**FR16:** Les graphes doivent être publics par défaut avec une option pour les rendre privés.

**FR17:** Le système doit générer des URLs partageables pour les graphes publics.

**FR18:** Les utilisateurs doivent pouvoir cloner/forker des graphes publics existants.

**FR19:** Le système doit fournir une bibliothèque publique de raisonnements célèbres pour l'apprentissage et la réutilisation.

**FR20:** Le système doit fournir une fonctionnalité de recherche dans la bibliothèque publique permettant de filtrer par catégories, tags, ou mots-clés.

**FR21:** Les utilisateurs doivent pouvoir saisir et éditer les énoncés logiques (contenu texte) dans les prémisses et conclusions de chaque node.

**FR22:** Le système doit permettre de nommer/titrer les containers pour faciliter leur identification lors de la réutilisation.

**FR23:** Le système doit afficher visuellement les points d'entrée (prémisses) alignés à gauche du node et les points de sortie (conclusions) alignés à droite du node.

**FR24:** Le système doit détecter et prévenir les cycles indirects à travers les containers imbriqués avant de permettre l'encapsulation (ex: Container A contient Container B, interdire l'ajout de Container A dans Container B).

**FR25:** Le système doit valider la cohérence logique entre plusieurs Axiom Nodes dans le même graphe et alerter l'utilisateur en cas de contradiction détectée (ex: Axiom1 affirme P, Axiom2 affirme ¬P).

**FR26:** Le système doit maintenir une traçabilité de l'auteur original lors du clone/fork de graphes publics, affichant clairement la source du graphe cloné.

**FR27:** Le système doit avertir explicitement l'utilisateur avec une confirmation lorsqu'il sauvegarde un graphe qui sera public par défaut.

### Non-Functional Requirements

**NFR1:** Le système doit rester réactif avec des graphes contenant jusqu'à 200 nodes sans dégradation des performances.

**NFR2:** Le feedback de validation doit être affiché en temps réel avec une latence inférieure à 100ms pour les opérations typiques.

**NFR3:** L'application doit fonctionner sur des écrans PC standards avec un design responsive (résolution minimale 1280x720).

**NFR4:** L'infrastructure cloud doit utiliser des services en tier gratuit dans la mesure du possible (MongoDB Atlas ou Supabase).

**NFR5:** L'interface utilisateur doit fournir des options de thème clair et sombre.

**NFR6:** Le système doit être accessible aux utilisateurs ayant des connaissances de base en logique formelle (compréhension des opérateurs logiques standards) sans nécessiter d'expertise en proof assistants (Coq, Lean, Isabelle).

**NFR7:** Le code source doit être maintenable par une petite équipe avec une séparation claire des préoccupations.

**NFR8:** Le système doit gérer gracieusement les erreurs et fournir des messages explicatifs plutôt que des crashs ou états bloqués.

**NFR9:** L'algorithme d'auto-arrangement doit utiliser le layout incrémental avec debouncing (minimum 300ms entre recalculs) pour maintenir les performances sur des graphes complexes et respecter NFR2.

**NFR10:** Le système doit limiter chaque utilisateur à un quota raisonnable de graphes sauvegardés (ex: 50 graphes par utilisateur) pour respecter les limites du free-tier cloud (NFR4).

---

## User Interface Design Goals

### Overall UX Vision

Créer une expérience d'édition de graphes fluide et naturelle qui évoque la manipulation de diagrammes sur tableau blanc physique, tout en fournissant la puissance d'un outil de validation formelle. L'interface doit être suffisamment intuitive pour permettre l'exploration créative, tout en guidant visuellement l'utilisateur vers des raisonnements logiquement valides grâce à des feedback immédiats et non-intrusifs.

**Principes UX Clés:**
- Feedback Immédiat mais Non-Bloquant: Validation en temps réel avec indicateurs visuels (rouge/vert) sans empêcher la progression
- Progressive Disclosure: Complexité cachée dans les containers, interface simple par défaut
- Spatial Reasoning: L'ordre gauche→droite reflète naturellement le flux logique temporel
- Affordances Claires: Points de connexion visibles, interactions prévisibles
- État de Flow: Minimiser les interruptions, permettre la concentration sur le raisonnement

### Key Interaction Paradigms

**Paradigme Principal: Direct Manipulation avec Contraintes Intelligentes**

- **Création de Nodes:** Clic droit sur canvas → menu contextuel avec icônes des types logiques → node apparaît instantanément
- **Connexion:** Deux modes au choix de l'utilisateur (préférence sauvegardée):
  - Mode Drag & Drop: Cliquer-glisser depuis un point de sortie vers un point d'entrée
  - Mode Click-Click: Clic sur point de sortie (highlight), clic sur point d'entrée (connexion créée)
- **Auto-arrangement avec Override Manuel:** Le système positionne automatiquement les nodes avec magnétisme style Obsidian, mais l'utilisateur peut les déplacer manuellement. Un bouton "Reset Layout" permet de revenir à l'arrangement optimal.
- **Navigation Multi-Niveaux:** Double-clic sur container = zoom dans le sous-graphe, breadcrumb en haut pour remonter
- **Validation Visuelle Progressive:** Connexions invalides en rouge pulsé (attire l'attention), tooltips au survol expliquent l'erreur avec suggestion de correction

**Interactions Secondaires:**
- Molette souris: Zoom in/out sur canvas
- Clic maintenu + drag sur fond: Pan/déplacement de la vue
- Sélection multiple: Shift+Clic ou rectangle de sélection pour grouper des nodes
- Undo/Redo: Ctrl+Z / Ctrl+Y pour toutes les opérations

### Core Screens and Views

1. **Canvas Principal (Editor View)** - L'écran central où 90% du temps est passé
2. **Node Palette Modal** - Sélection du type de node lors de la création
3. **Library Browser** - Accès à la bibliothèque publique de graphes
4. **Authentication/Profile** - Gestion utilisateur simple
5. **Graph Properties Panel** - Métadonnées du graphe actuel

### Accessibility

**Niveau: WCAG AA (Accessible, mais pas exhaustif)**

- Contraste Couleurs: Ratio 4.5:1 minimum (texte sur fond), validation rouge et vert distinguables aussi par forme/icône
- Navigation Clavier: Tab pour naviguer entre nodes, Enter pour éditer, Espace pour valider
- Taille de Cible: Boutons et points de connexion minimum 44x44px
- Zoom: Support jusqu'à 200% sans perte de fonctionnalité

### Branding

**Style Visuel: Moderne Minimaliste avec Rigueur Académique**

Esthétique entre Figma (interfaces modernes, épurées) et Obsidian (élégance sobre, focus contenu)

**Palette de Couleurs:**
- Primaire: Bleu profond (#2563EB)
- Secondaire: Gris ardoise (#475569)
- Validation: Vert émeraude (#10B981) pour valide, Rouge corail (#EF4444) pour invalide
- Fond Clair: Blanc cassé (#F8FAFC) avec grille gris clair (#E2E8F0)
- Fond Sombre: Charbon (#0F172A) avec grille gris foncé (#1E293B)

**Typographie:**
- Interface: Inter (sans-serif moderne)
- Contenu Logique: JetBrains Mono (monospace, clarté des symboles)

### Target Device and Platforms

**Plateforme Principale: Web Responsive (Desktop Focus)**

- Optimal: 1920x1080 et supérieur
- Supporté: 1280x720 minimum
- Non Supporté pour édition: Tablettes et mobiles (écrans < 1024px width)
- Mobile Read-Only: Version adaptée pour consultation uniquement

**Navigateurs Supportés:** Chrome/Edge 90+, Firefox 88+, Safari 14+

---

## Technical Assumptions

### Repository Structure

**DÉCISION: Monorepo**

Structure proposée:
```
reasoning-graph/
├── apps/
│   └── web/          # Next.js frontend
├── packages/
│   ├── graph-engine/ # Logique de graphe, validation
│   ├── ui-components/# Composants React réutilisables
│   └── types/        # Types TypeScript partagés
```

### Service Architecture

**DÉCISION: Monolithe Next.js avec API Routes (Full-Stack Framework)**

- Frontend: Next.js App Router avec React Server Components
- API: Next.js API Routes (serverless functions)
- État: Zustand ou Jotai pour gestion état graphe côté client

### Tech Stack Core

**Frontend:**
- Framework: Next.js 14+ avec App Router
- Langage: TypeScript strict
- UI Library: React 18+
- Styling: Tailwind CSS
- Graphe Visuel: React Flow 11+

**Backend:**
- Runtime: Node.js 20+ (LTS)
- Framework: Next.js API Routes
- Validation: Zod
- Auth: NextAuth.js v5

**Database:**
- Primaire: MongoDB Atlas Free Tier (512MB)
- ORM/Client: Mongoose

### Graph Engine & Algorithms

- **graphlib:** Bibliothèque pour graphes dirigés (DAG validation, topological sort)
- **Custom Validation Engine:** Code spécifique pour validation logique
- **Layout Algorithm:** Dagre pour auto-arrangement
- **Performance:** Debouncing de layout (300ms), validation incrémentale, Web Workers pour graphes >100 nodes

### Testing Requirements

**DÉCISION: Unit + Integration Testing**

- Unit Tests: Jest (focus: Graph Engine, validation, détection cycles)
- Integration Tests: Playwright ou Cypress (focus: flows utilisateur critiques)
- Couverture cible: 80%+ pour packages/graph-engine

### Deployment & Infrastructure

**DÉCISION: Vercel (Frontend + API) + MongoDB Atlas (Database)**

- Hosting: Vercel Free Tier
- Database: MongoDB Atlas Free Tier (M0)
- Auth: NextAuth.js avec stratégie JWT
- CI/CD: GitHub Actions + Vercel auto-deploy

### Additional Technical Assumptions

- **Gestion d'État:** Zustand pour état global
- **Performance:** React.memo pour nodes, virtual rendering si >200 nodes (Phase 2)
- **Developer Experience:** ESLint + Prettier, Husky pre-commit hooks, TypeScript strict mode
- **Package Manager:** npm
- **Sécurité:** Rate limiting, input sanitization, CORS configuration stricte
- **Mobile Read-Only:** Responsive breakpoint à 768px avec édition désactivée

---

## Epic List

### Epic 1: Foundation & Core Graph Infrastructure
**Objectif:** Établir les fondations du projet (setup Next.js, authentification basique, structure de données) tout en livrant une première fonctionnalité visible: créer des nodes simples et les afficher sur un canvas interactif.

### Epic 2: Node Types & Logic System
**Objectif:** Implémenter tous les types de nodes logiques avec système de propositions typées et architecture orientée objet, permettant aux utilisateurs de construire des raisonnements formels structurés.

### Epic 3: Connections & Real-Time Validation
**Objectif:** Activer la connexion entre nodes (drag-and-drop + click-click), implémenter le moteur de validation logique en temps réel avec feedback visuel (rouge/vert), et détecter/interdire les cycles.

### Epic 4: Auto-Layout & Visual Polish
**Objectif:** Fournir l'auto-arrangement intelligent avec ordre topologique gauche→droite, optimiser les performances pour grands graphes, et polir l'expérience visuelle (courbes Bézier, zoom/pan fluide, thèmes).

### Epic 5: Fractal Architecture (Containers)
**Objectif:** Implémenter l'architecture fractale permettant d'encapsuler des graphes comme containers réutilisables, avec navigation multi-niveaux et validation cascade complète.

### Epic 6: Persistence & Sharing
**Objectif:** Activer la sauvegarde/chargement des graphes dans MongoDB, gestion des graphes publics/privés, URLs partageables, et système de clone/fork avec traçabilité.

### Epic 7: Public Library & Discovery
**Objectif:** Créer la bibliothèque publique de raisonnements célèbres avec système de recherche, catégories, et interface de découverte, établissant la communauté de partage.

---


## Epic 1: Foundation & Core Graph Infrastructure

**Goal:** Établir l'infrastructure technique complète du projet (monorepo Next.js, authentification NextAuth, MongoDB, CI/CD) tout en livrant une première fonctionnalité utilisateur tangible: un éditeur de graphe minimal permettant de créer des nodes simples, les positionner manuellement, et les visualiser.

### Story 1.1: Setup Project & Monorepo Structure

**As a** developer,  
**I want** a Next.js 14+ project configured with monorepo structure and all development tools,  
**So that** I can start implementing features with a solid technical foundation.

**Acceptance Criteria:**

1. Monorepo is initialized with structure `apps/web`, `packages/graph-engine`, `packages/ui-components`, `packages/types`
2. Next.js 14+ with App Router is configured in `apps/web`
3. TypeScript strict mode is enabled with shared configuration
4. Tailwind CSS is configured with base design system (colors defined in UI Goals)
5. ESLint and Prettier are configured with pre-commit hooks
6. npm scripts are defined for dev, build, test, lint
7. A "Hello World" component displays on root route `/`
8. README contains setup instructions for developers

### Story 1.2: Database Setup & Connection

**As a** developer,  
**I want** a configured and operational MongoDB Atlas connection,  
**So that** I can save and retrieve data in upcoming stories.

**Acceptance Criteria:**

1. MongoDB Atlas free tier is provisioned and accessible
2. Mongoose is installed and configured with MongoDB connection
3. Environment variables (MONGODB_URI) are documented in `.env.example`
4. A minimal Mongoose schema for `User` is created with fields: email, name, createdAt
5. An API route `/api/health` returns MongoDB connection status (connected: true/false)
6. Connection uses pooling to optimize performance
7. Connection errors are explicitly logged

### Story 1.3: Authentication System Setup

**As a** user,  
**I want** to create an account and login,  
**So that** I can access the application and save my graphs.

**Acceptance Criteria:**

1. NextAuth.js v5 is configured with JWT strategy
2. An Email/Password (Credentials) provider is implemented
3. The `/login` page displays a form with email and password
4. The `/signup` page allows creating a new user account
5. Passwords are hashed with bcrypt before saving
6. After successful login, user is redirected to `/editor`
7. A "Logout" button in the header allows disconnecting
8. Sessions persist for 7 days (JWT configuration)
9. Protected routes redirect to `/login` if not authenticated

### Story 1.4: Canvas & React Flow Integration

**As a** user,  
**I want** to see an interactive canvas where I can zoom and pan,  
**So that** I prepare the workspace for my reasoning graphs.

**Acceptance Criteria:**

1. React Flow 11+ is installed and integrated in the `/editor` page
2. Canvas occupies 100% of available height/width (viewport minus header)
3. Zoom is functional with mouse wheel (min: 0.5x, max: 2x)
4. Pan (movement) works with click-and-hold on background + drag
5. A subtle grid is displayed in the background (color per theme)
6. Canvas starts centered with 1x zoom
7. Zoom controls (+/-) are displayed bottom-right
8. An optional mini-map is displayed bottom-left (can be toggled off)

### Story 1.5: Create Simple Nodes

**As a** user,  
**I want** to create simple nodes by right-clicking on the canvas,  
**So that** I start building my reasoning graph.

**Acceptance Criteria:**

1. A right-click on canvas opens a contextual menu at cursor position
2. Menu contains an option "Create Simple Node"
3. Selecting the option creates a new node at clicked position
4. Node displays a rounded rectangle with border (design per UI Goals)
5. Node contains an editable text field (placeholder: "Enter your statement...")
6. Node can be selected (border highlight) by clicking on it
7. Node can be moved by drag & drop
8. A selected node can be deleted with "Delete" or "Backspace" key
9. Node text is saved in Zustand state upon editing
10. Maximum 50 characters for node text (MVP constraint for layout)

### Story 1.6: CI/CD Pipeline & Deployment

**As a** developer,  
**I want** an automated CI/CD pipeline,  
**So that** the application deploys automatically and tests run on each commit.

**Acceptance Criteria:**

1. GitHub Actions workflow is configured to execute on push and pull request
2. Workflow executes: lint, type-check, unit tests (even if no tests yet)
3. Workflow builds the Next.js application to detect build errors
4. Vercel is connected to GitHub repository with automatic deployment
5. Each push to `main` triggers a production deployment
6. Each pull request generates a Vercel preview URL
7. Secrets (MONGODB_URI, NEXTAUTH_SECRET) are configured in Vercel
8. A GitHub Actions badge is added to README showing build status

---

## Epic 2: Node Types & Logic System

**Goal:** Implémenter le système de types de nodes logiques avec système de propositions typées et architecture orientée objet utilisant classes TypeScript abstraites et Zod pour la validation runtime. Chaque type de node expose visuellement ses points d'entrée et de sortie avec nomenclature appropriée.

### Story 2.1: Proposition System & Type Definitions

**As a** developer,  
**I want** to define a typed propositions system that serves as the basis for premises and conclusions,  
**So that** I create a flexible and type-safe architecture for all logic node types.

**Acceptance Criteria:**

1. An abstract class `Proposition` is defined in `packages/graph-engine/src/propositions/` with: `id: string`, `content: string`, `type: PropositionType`, `validate(): boolean` (abstract method)
2. Concrete classes inherit from `Proposition`: SimpleProposition, ImplicationProposition, NegationProposition, DisjunctionProposition, ConjunctionProposition
3. Each proposition class has a corresponding Zod schema
4. A union type `AnyProposition` groups all proposition types
5. Helper functions allow easy proposition creation
6. Jest unit tests validate: creation of each proposition type, Zod validation, correct TypeScript type inference

### Story 2.2: Abstract Node Base Class & Type System

**As a** developer,  
**I want** an abstract class architecture for nodes with inheritance,  
**So that** I can easily define new logic node types with type-safety.

**Acceptance Criteria:**

1. An abstract class `LogicNode` is defined in `packages/graph-engine/src/nodes/` with: id, type, position, premises[], conclusions[], abstract methods getInputCount(), getOutputCount(), validate(), annotation?
2. A base Zod schema `LogicNodeSchema` defines common fields
3. A `NodeTypeDefinition` interface defines metadata
4. A `nodeTypeRegistry.ts` file maintains a mapping of definitions
5. TypeScript utility types allow inference
6. A factory function `createNode(type, data)` instantiates the correct node type
7. Exports are organized for easy import

### Story 2.3: Concrete Node Type Implementations (Part 1)

**As a** developer,  
**I want** concrete implementations of the most common node types,  
**So that** I validate the architecture and provide the first usable types.

**Acceptance Criteria:**

1. **AxiomNode** extends LogicNode: no premises, 1 conclusion, always valid
2. **ModusPonensNode** extends LogicNode: 2 premises (P, P→Q), 1 conclusion (Q), validates logical inference
3. **ModusTollensNode** extends LogicNode: 2 premises (¬Q, P→Q), 1 conclusion (¬P)
4. **SimpleAffirmationNode** extends LogicNode: 1 premise, 1 conclusion (direct pass-through)
5. Each class has its Zod schema with discriminated union on type
6. Unit tests for each type verify: instantiation, Zod validation, validate() method with valid/invalid cases, TypeScript type inference

### Story 2.4: Concrete Node Type Implementations (Part 2)

**As a** developer,  
**I want** implementations of advanced node types,  
**So that** I complete the library of logical forms.

**Acceptance Criteria:**

1. **SyllogismNode**: 2 premises (major, minor), 1 conclusion
2. **DisjunctionNode**: 2 premises (P∨Q, ¬P), 1 conclusion (Q)
3. **ReductioAdAbsurdumNode**: 1 premise (P→⊥), 1 conclusion (¬P)
4. **InductionNode**: 2 premises (P(0), ∀n P(n)→P(n+1)), 1 conclusion (∀n P(n))
5. **FreeFormNode**: dynamic premises (0-5), dynamic conclusions (1-3), methods addPremise(), removePremise(), addConclusion(), always neutral validation
6. All Zod schemas integrated in discriminated union `AnyNodeSchema`
7. Registry `nodeTypeRegistry.ts` contains all definitions with complete metadata
8. Unit tests cover all types with edge case scenarios

