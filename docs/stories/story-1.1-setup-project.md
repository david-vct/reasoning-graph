# Story 1.1: Setup Project & Monorepo Structure

**Epic:** [Epic 1: Foundation & Core Graph Infrastructure](../epics/epic-1-foundation.md)  
**Status:** Ready for Review

## Story

**As a** developer,  
**I want** a Next.js 14+ project configured with monorepo structure and all development tools,  
**so that** I can start implementing features with a solid technical foundation.

## Acceptance Criteria

1. Monorepo is initialized with structure `apps/web`, `packages/graph-engine`, `packages/ui-components`, `packages/types`
2. Next.js 14+ with App Router is configured in `apps/web`
3. TypeScript strict mode is enabled with shared configuration
4. Tailwind CSS is configured with base design system (colors defined in UI Goals)
5. ESLint and Prettier are configured with pre-commit hooks
6. npm scripts are defined for dev, build, test, lint
7. A "Hello World" component displays on root route `/`
8. README contains setup instructions for developers including:
   - Required Node.js version (20+ LTS)
   - Environment setup steps
   - npm install instructions
9. package-lock.json is committed to repository for reproducible builds

## Tasks / Subtasks

- [x] Task 1: Initialize root monorepo structure (AC: 1, 9)
  - [x] Create root `package.json` with npm workspaces configuration
  - [x] Define workspace packages: `apps/web`, `packages/graph-engine`, `packages/ui-components`, `packages/types`
  - [x] Set Node.js version requirement to `"engines": { "node": ">=20.0.0" }` in root package.json
  - [x] Run `npm install` and commit `package-lock.json`

- [x] Task 2: Setup Next.js 14+ App in apps/web (AC: 2, 7)
  - [x] Run `npx create-next-app@latest apps/web` with App Router, TypeScript, Tailwind CSS
  - [x] Configure `apps/web/package.json` with proper workspace dependencies
  - [x] Create basic "Hello World" page in `apps/web/app/page.tsx`
  - [x] Verify Next.js dev server runs on http://localhost:3000

- [x] Task 3: Configure TypeScript with strict mode (AC: 3)
  - [x] Create root `tsconfig.json` with `strict: true`
  - [x] Configure path aliases for clean imports: `@/*`, `@graph-engine/*`, `@ui-components/*`, `@types/*`
  - [x] Create individual tsconfig.json in each package extending root config
  - [x] Verify TypeScript compilation works: `npm run type-check`

- [x] Task 4: Setup Tailwind CSS with custom design system (AC: 4)
  - [x] Install Tailwind CSS and dependencies in apps/web
  - [x] Configure `tailwind.config.js` with custom color palette (see Dev Notes for exact colors)
  - [x] Add custom typography fonts: Inter for UI, JetBrains Mono for logic content
  - [x] Test custom colors in Hello World component

- [x] Task 5: Configure ESLint, Prettier, and pre-commit hooks (AC: 5)
  - [x] Install and configure ESLint with Next.js and TypeScript rules
  - [x] Install and configure Prettier with standard settings
  - [x] Install Husky and setup pre-commit hook to run `lint-staged`
  - [x] Configure `lint-staged` to run ESLint and Prettier on staged files
  - [x] Test pre-commit hook works by making a commit

- [x] Task 6: Initialize package structures (AC: 1)
  - [x] Create `packages/graph-engine` with basic structure: `src/`, `package.json`, `tsconfig.json`
  - [x] Create `packages/ui-components` with basic structure: `src/`, `package.json`, `tsconfig.json`
  - [x] Create `packages/types` with basic structure: `src/`, `package.json`, `tsconfig.json`
  - [x] Add basic `index.ts` export files in each package

- [x] Task 7: Setup npm scripts and README (AC: 6, 8)
  - [x] Define root-level npm scripts: `dev`, `build`, `test`, `lint`, `type-check`
  - [x] Write comprehensive README.md with setup instructions
  - [x] Document Node.js 20+ LTS requirement
  - [x] Document npm install and workspace structure
  - [x] Include troubleshooting section

## Dev Notes

### Monorepo Configuration

[Source: docs/architecture.md#repository-structure]

**Structure:**

```
reasoning-graph/
├── apps/
│   └── web/                  # Next.js 14+ App (frontend + API routes)
├── packages/
│   ├── graph-engine/         # Core: validation logique, DAG algorithms
│   ├── ui-components/        # Composants React réutilisables
│   └── types/                # Types TypeScript partagés
├── package.json              # Root workspace with npm workspaces
└── README.md
```

**Root package.json workspace configuration:**

```json
{
  "name": "reasoning-graph",
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "engines": {
    "node": ">=20.0.0"
  }
}
```

### TypeScript Path Aliases

Configure in root `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": ["./apps/web/*"],
      "@graph-engine/*": ["./packages/graph-engine/src/*"],
      "@ui-components/*": ["./packages/ui-components/src/*"],
      "@types/*": ["./packages/types/src/*"]
    }
  }
}
```

### Tailwind CSS Custom Color Palette

[Source: docs/prd.md#branding]

Configure dans `apps/web/tailwind.config.js`:

```javascript
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui-components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors - modernes et configurables
        primary: {
          DEFAULT: '#2563EB', // Bleu profond
          50: '#EFF6FF',
          100: '#DBEAFE',
          500: '#2563EB',
          600: '#1D4ED8',
          700: '#1E40AF',
        },
        // Secondary colors
        secondary: {
          DEFAULT: '#475569', // Gris ardoise
          50: '#F8FAFC',
          100: '#F1F5F9',
          500: '#475569',
          600: '#334155',
          700: '#1E293B',
        },
        // Validation states
        valid: {
          DEFAULT: '#10B981', // Vert émeraude
          50: '#ECFDF5',
          500: '#10B981',
          600: '#059669',
        },
        invalid: {
          DEFAULT: '#EF4444', // Rouge corail
          50: '#FEF2F2',
          500: '#EF4444',
          600: '#DC2626',
        },
        // Canvas backgrounds
        canvas: {
          light: '#F8FAFC', // Blanc cassé
          dark: '#0F172A', // Charbon
          gridLight: '#E2E8F0', // Grille gris clair
          gridDark: '#1E293B', // Grille gris foncé
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Interface UI
        mono: ['JetBrains Mono', 'monospace'], // Contenu logique
      },
    },
  },
  plugins: [],
};
```

**Note:** Ces couleurs sont configurables via variables CSS custom properties pour permettre des modifications ultérieures sans refactoring.

### npm Scripts to Define

In root `package.json`:

```json
{
  "scripts": {
    "dev": "npm run dev --workspace=apps/web",
    "build": "npm run build --workspaces",
    "test": "npm run test --workspaces",
    "lint": "npm run lint --workspaces",
    "type-check": "tsc --noEmit"
  }
}
```

### Husky Pre-commit Hook Configuration

```bash
# Install Husky
npm install -D husky lint-staged
npx husky install

# Create pre-commit hook
npx husky add .husky/pre-commit "npx lint-staged"
```

**lint-staged configuration** in root `package.json`:

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md,yml}": ["prettier --write"]
  }
}
```

### Testing

**Testing Approach:** Build verification and linting

- Verify `npm run build` succeeds without errors
- Verify `npm run lint` passes all checks
- Verify `npm run type-check` has no TypeScript errors
- Manually verify Hello World page displays at http://localhost:3000

**No unit tests required** for this infrastructure setup story.

## Definition of Done

- [x] Monorepo structure created with all packages
- [x] Next.js 14+ running successfully on port 3000
- [x] TypeScript strict mode enabled and compiling without errors
- [x] Tailwind CSS operational with custom color palette
- [x] ESLint and Prettier running on pre-commit via Husky
- [x] README contains complete setup instructions
- [x] "Hello World" visible on http://localhost:3000
- [x] All npm scripts working: dev, build, test, lint, type-check
- [x] package-lock.json committed to repository

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.5

### Completion Notes

- Successfully initialized monorepo with npm workspaces
- Next.js 16.1.2 (latest) installed with App Router and TypeScript
- TypeScript strict mode configured with path aliases for all packages
- Tailwind CSS configured with custom color palette and Google Fonts (Inter, JetBrains Mono)
- Husky and lint-staged configured for pre-commit hooks
- All validation tests passed: type-check, lint, build
- Development server verified running on http://localhost:3000
- Comprehensive README created with troubleshooting section

### File List

- `package.json` - Root workspace configuration
- `tsconfig.json` - Root TypeScript configuration with strict mode
- `.prettierrc.json` - Prettier configuration
- `.gitignore` - Git ignore rules (excluding node_modules, build outputs)
- `.husky/pre-commit` - Pre-commit hook for lint-staged
- `README.md` - Project documentation and setup instructions
- `apps/web/package.json` - Next.js app package configuration
- `apps/web/tsconfig.json` - Next.js TypeScript configuration
- `apps/web/tailwind.config.js` - Tailwind CSS with custom design system
- `apps/web/app/page.tsx` - Hello World landing page
- `apps/web/app/globals.css` - Global styles with custom fonts
- `packages/graph-engine/package.json` - Graph engine package
- `packages/graph-engine/src/index.ts` - Graph engine entry point
- `packages/graph-engine/tsconfig.json` - Graph engine TypeScript config
- `packages/ui-components/package.json` - UI components package
- `packages/ui-components/src/index.ts` - UI components entry point
- `packages/ui-components/tsconfig.json` - UI components TypeScript config
- `packages/types/package.json` - Shared types package
- `packages/types/src/index.ts` - Shared types entry point
- `packages/types/tsconfig.json` - Types TypeScript config

### Change Log

- 2026-01-16: Implemented all 7 tasks and subtasks
- 2026-01-16: All validations passed (type-check, lint, build, dev server)
- 2026-01-16: Story marked as Ready for Review

## Estimated Effort

**3 points** (1-2 jours)

## Dependencies

None - Première story fondationnelle

## Change Log

| Date       | Version | Description                | Author      |
| ---------- | ------- | -------------------------- | ----------- |
| 2026-01-16 | 1.2     | Implementation completed   | James (Dev) |
| 2026-01-16 | 1.1     | Enriched with full context | Bob SM      |
| 2026-01-15 | 1.0     | Initial story creation     | Bob SM      |
