# Story 1.6: CI/CD Pipeline & Deployment

**Epic:** [Epic 1: Foundation & Core Graph Infrastructure](../epics/epic-1-foundation.md)  
**Status:** Draft

## Story

**As a** developer,  
**I want** an automated CI/CD pipeline with continuous deployment to Vercel,  
**So that** the application deploys automatically, tests run on each commit, and build errors are caught early.

## Acceptance Criteria

1. GitHub Actions workflow is configured to execute on push and pull request
2. Workflow executes: lint, type-check, unit tests (even if no tests yet)
3. Workflow builds the Next.js application to detect build errors
4. Vercel is connected to GitHub repository with automatic deployment
5. Each push to `main` triggers a production deployment
6. Each pull request generates a Vercel preview URL
7. Secrets (MONGODB_URI, NEXTAUTH_SECRET, NEXTAUTH_URL) are configured in Vercel
8. A GitHub Actions badge is added to README showing build status

## Tasks / Subtasks

- [x] Task 1: Create GitHub Actions CI Workflow (AC: 1, 2, 3, 8)
  - [x] Create `.github/workflows/ci.yml` file
  - [x] Configure trigger on push and pull_request for all branches
  - [x] Setup Node.js 20 LTS with actions/setup-node@v4
  - [x] Cache npm dependencies using actions/cache@v4 with npm cache path
  - [x] Add step to run `npm ci` for reproducible installs
  - [x] Add step to run `npm run lint` (AC: 2)
  - [x] Add step to run `npm run type-check` (AC: 2)
  - [x] Add step to run `npm run test` (AC: 2)
  - [x] Add step to run `npm run build` (AC: 3)
  - [x] Configure job to fail if any step fails
  - [x] Copy GitHub Actions badge markdown from workflow status page
  - [x] Add badge to top of README.md (AC: 8)

- [x] Task 2: Configure Vercel Project and Connect Repository (AC: 4, 5, 6)
  - [x] Login to Vercel dashboard (vercel.com)
  - [x] Import GitHub repository (reasoning-graph)
  - [x] Configure Framework Preset: Next.js
  - [x] Set Root Directory: `apps/web`
  - [x] Configure Build Command: `npm run build --workspace=apps/web`
  - [x] Configure Output Directory: `.next` (default for Next.js)
  - [x] Configure Install Command: `npm install` (monorepo aware)
  - [x] Enable automatic deployments for main branch (AC: 5)
  - [x] Enable preview deployments for all PRs (AC: 6)
  - [x] Verify Git integration is active

- [x] Task 3: Configure Environment Variables in Vercel (AC: 7)
  - [x] Navigate to Project Settings → Environment Variables
  - [x] Add MONGODB_URI (value from Story 1.2 setup)
    - Set for Production, Preview, and Development environments
  - [x] Add NEXTAUTH_SECRET (value from Story 1.3 setup)
    - Set for Production, Preview, and Development environments
  - [x] Add NEXTAUTH_URL for Production environment
    - Value: `https://<your-production-domain>.vercel.app`
  - [x] Add NEXTAUTH_URL for Preview environment
    - Value: `https://$VERCEL_URL` (automatic Vercel variable)
  - [x] Add NODE_ENV (optional, auto-set by Vercel)
    - Production: `production`
    - Preview: `production`
    - Development: `development`
  - [x] Verify all secrets are marked as "Sensitive" (hidden in logs)

- [ ] Task 4: Test CI/CD Pipeline End-to-End (AC: All)
  - [x] Create feature branch and make a test commit
  - [x] Push branch to GitHub and verify GitHub Actions workflow runs
  - [x] Check workflow executes all steps: lint, type-check, test, build
  - [x] Verify workflow passes with green status
  - [ ] Open pull request and verify Vercel preview deployment comment appears
  - [ ] Visit Vercel preview URL and test application works
  - [ ] Merge PR to main branch
  - [ ] Verify production deployment triggers automatically
  - [ ] Visit production URL and verify deployment successful
  - [ ] Check README displays GitHub Actions badge with passing status

## Dev Notes

### Previous Story Context

[Source: Story 1.1, 1.2, 1.3 Completion Notes]

**From Story 1.1 (Project Setup):**

- Monorepo structure uses npm workspaces with root `package.json`
- Main application located at `apps/web/`
- Root scripts available: `npm run dev`, `npm run build`, `npm run test`, `npm run lint`, `npm run type-check`
- Node.js version requirement: `>=20.0.0`

**From Story 1.2 (Database Setup):**

- `MONGODB_URI` environment variable format: `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/reasoning-graph?retryWrites=true&w=majority`
- Already configured in `.env.local` for local development
- Database name: `reasoning-graph`

**From Story 1.3 (Authentication Setup):**

- `NEXTAUTH_SECRET` generated via `openssl rand -base64 32`
- Already configured in `.env.local`
- `NEXTAUTH_URL` format: `http://localhost:3000` (local) or `https://<domain>` (production)
- Session strategy: JWT with 7-day expiration

### GitHub Actions CI Workflow Structure

[Source: docs/architecture.md#cicd-pipeline]

Create file at `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: ['**']
  pull_request:
    branches: ['**']

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run type-check
        run: npm run type-check

      - name: Run tests
        run: npm run test

      - name: Build application
        run: npm run build
```

**Key Configuration Details:**

- `actions/checkout@v4`: Latest checkout action
- `actions/setup-node@v4`: Node.js setup with built-in caching
- `npm ci`: Clean install using package-lock.json (reproducible builds)
- `cache: 'npm'`: Automatically caches npm dependencies for faster runs

### Vercel Project Configuration

[Source: docs/architecture.md#deployment-architecture]

**Framework Preset:** Next.js (auto-detected)

**Build Settings:**

- Root Directory: `apps/web`
- Build Command: `npm run build --workspace=apps/web` (monorepo command)
- Output Directory: `.next` (Next.js default)
- Install Command: `npm install` (installs all workspace dependencies)
- Development Command: `npm run dev` (for local Vercel dev)

**Deployment Strategy:**

[Source: docs/architecture.md#environments]

| Environment | Branch/PR   | Trigger              | URL Pattern                   |
| ----------- | ----------- | -------------------- | ----------------------------- |
| Production  | `main`      | Push to main         | `<project>.vercel.app`        |
| Preview     | Feature PRs | Pull request created | `<project>-<hash>.vercel.app` |
| Development | Local       | `vercel dev`         | `localhost:3000`              |

**Auto-Deploy Behavior:**

- Production: Auto-deploys on merge to `main` (AC: 5)
- Preview: Auto-generates unique URL for every PR commit (AC: 6)
- Comment: Vercel bot comments on PR with preview URL

### Environment Variables Configuration

[Source: docs/architecture.md#environment-variables]

**Required Secrets for Vercel:**

1. **MONGODB_URI** (from Story 1.2)
   - Format: `mongodb+srv://<user>:<password>@<cluster>.mongodb.net/reasoning-graph`
   - Scope: Production, Preview, Development
   - Source: MongoDB Atlas connection string

2. **NEXTAUTH_SECRET** (from Story 1.3)
   - Format: 32+ character random string
   - Scope: Production, Preview, Development
   - Generation: `openssl rand -base64 32`
   - Purpose: JWT encryption key

3. **NEXTAUTH_URL** (from Story 1.3)
   - Production: `https://<your-project>.vercel.app`
   - Preview: `https://$VERCEL_URL` (use Vercel system variable)
   - Purpose: NextAuth.js callback URL base

4. **NODE_ENV** (optional, auto-set by Vercel)
   - Production: `production`
   - Preview: `production`
   - Development: `development`

**How to Configure in Vercel Dashboard:**

1. Navigate to Project Settings → Environment Variables
2. Click "Add New" for each variable
3. Enter Name, Value, and select environments (Production/Preview/Development)
4. Mark as "Sensitive" to hide values in logs
5. Click "Save"

**Important Note:** For Preview environments using `$VERCEL_URL`, NextAuth.js automatically detects the preview URL, so set `NEXTAUTH_URL=https://$VERCEL_URL` for Preview scope.

### Monorepo Build Considerations

[Source: docs/architecture.md#repository-structure]

**Workspace Commands:**

- The monorepo uses npm workspaces
- Vercel needs to install dependencies from root (`npm install`)
- Build command targets specific workspace: `npm run build --workspace=apps/web`
- Vercel automatically detects monorepo structure and adjusts build process

**Build Performance:**

- GitHub Actions caches npm dependencies between runs
- Typical CI run time: 2-4 minutes (fresh build)
- Cached run time: 30-60 seconds

### CI/CD Pipeline Flow Diagram

```
Developer Push → GitHub
                   ↓
         ┌─────────┴─────────┐
         ↓                   ↓
    GitHub Actions      Vercel Deploy
    (CI Pipeline)       (CD Pipeline)
         ↓                   ↓
    Lint, Test,        Build & Deploy
    Type-check,        to Edge Network
    Build                   ↓
         ↓              Preview URL or
    Pass/Fail          Production URL
         ↓                   ↓
    Status Badge       Comment on PR
```

### Testing

**CI Workflow Testing:**

- **Lint**: Validates code style and catches errors
- **Type-check**: Ensures TypeScript type safety
- **Test**: Runs Jest test suites (currently minimal/placeholder)
- **Build**: Compiles production bundle to catch build-time errors

**Expected Test Results (Story 1.6 state):**

- Lint: Should pass (code already follows standards)
- Type-check: Should pass (TypeScript configured)
- Test: May show "No tests configured" warning but should not fail
- Build: Should successfully compile Next.js app

**Testing Standards:**

[Source: docs/architecture.md#testing]

- Test framework: Jest 29.7+
- Test location: Co-located with source files or `__tests__/` folders
- CI must pass before merge (enforce via GitHub branch protection - optional)
- Future stories will add actual test suites

### GitHub Actions Badge

**Badge Markdown:**

After first workflow run, get badge from:

1. Go to GitHub Actions tab
2. Click on "CI" workflow
3. Click "..." menu → "Create status badge"
4. Copy markdown

**Badge Format:**

```markdown
[![CI](https://github.com/<username>/reasoning-graph/actions/workflows/ci.yml/badge.svg)](https://github.com/<username>/reasoning-graph/actions/workflows/ci.yml)
```

**Add to README.md** at the top, after title (AC: 8).

### File Locations Summary

**Files to Create:**

- `.github/workflows/ci.yml` - GitHub Actions workflow configuration

**Files to Modify:**

- `README.md` - Add CI status badge

**External Configuration:**

- Vercel Dashboard - Project settings, environment variables, Git integration

### Project Structure Context

[Source: docs/architecture.md#unified-project-structure]

```
reasoning-graph/
├── .github/
│   └── workflows/
│       └── ci.yml          ← CREATE THIS FILE
├── apps/
│   └── web/                ← Vercel builds from here
│       ├── app/
│       ├── components/
│       ├── package.json
│       └── ...
├── packages/
│   ├── graph-engine/
│   ├── ui-components/
│   └── types/
├── package.json            ← Root workspace config
├── package-lock.json
└── README.md               ← Add badge here
```

## Dev Agent Record

### Agent Model Used
Claude Sonnet 4.5

### Debug Log References
- Fixed useSearchParams Suspense boundary error in login page (commit 0596fdb)
- Fixed Husky CI failure: made husky optional in CI environments (commit 4869019)
- Fixed Vercel monorepo config: changed Root Directory to "." and adjusted build commands
- Fixed missing dependency: added @reasoning-graph/types to web workspace (commit 102cdc9)
- Fixed login redirect: use window.location.href for full page navigation (commit 9c9a80c)

### Completion Notes
- Task 2 completed: Vercel project configured with monorepo root directory `apps/web`
- Fixed build error: wrapped useSearchParams in Suspense boundary in login page
- Build now passes successfully (✓ Compiled successfully)
- Fixed Husky CI failure: made husky script fail-safe with `|| true` for CI environments
- Task 3 completed: All environment variables configured in Vercel (MONGODB_URI, NEXTAUTH_SECRET, NEXTAUTH_URL)
- Task 4 in progress: Testing CI/CD pipeline end-to-end with test branch

### File List
**Modified:**
- `apps/web/app/(auth)/login/page.tsx` - Wrapped useSearchParams in Suspense
- `package.json` - Made husky optional in CI environments
- `apps/web/package.json` - Added @reasoning-graph/types as dependency

## Change Log

| Date       | Version | Description                | Author   |
| ---------- | ------- | -------------------------- | -------- |
| 2026-01-21 | 1.0     | Story created              | Bob (SM) |
| 2026-01-21 | 2.0     | Rewritten with v2 template | Bob (SM) |
