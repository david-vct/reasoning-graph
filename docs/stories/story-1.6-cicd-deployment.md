# Story 1.6: CI/CD Pipeline & Deployment

**Epic:** [Epic 1: Foundation & Core Graph Infrastructure](epic-1-foundation.md)

## User Story

**As a** developer,  
**I want** an automated CI/CD pipeline,  
**So that** the application deploys automatically and tests run on each commit.

## Acceptance Criteria

1. GitHub Actions workflow is configured to execute on push and pull request
2. Workflow executes: lint, type-check, unit tests (even if no tests yet)
3. Workflow builds the Next.js application to detect build errors
4. Vercel is connected to GitHub repository with automatic deployment
5. Each push to `main` triggers a production deployment
6. Each pull request generates a Vercel preview URL
7. Secrets (MONGODB_URI, NEXTAUTH_SECRET) are configured in Vercel
8. A GitHub Actions badge is added to README showing build status

## Technical Notes

- GitHub Actions workflow in `.github/workflows/ci.yml`
- Vercel CLI for deployment automation
- Environment variables management in Vercel dashboard
- Cache npm dependencies for faster builds
- Parallel job execution when possible

## Definition of Done

- [ ] GitHub Actions workflow created
- [ ] Workflow runs on push and PR
- [ ] Lint, type-check, tests execute
- [ ] Build succeeds in CI
- [ ] Vercel connected to repository
- [ ] Main branch auto-deploys to production
- [ ] PRs generate preview URLs
- [ ] Secrets configured in Vercel
- [ ] Build status badge in README

## Estimated Effort

**3 points** (1-2 jours)

## Dependencies

- Story 1.1 (project setup)
- Story 1.2 (database - for env vars)
- Story 1.3 (auth - for env vars)
