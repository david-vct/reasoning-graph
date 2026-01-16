# Story 1.7: Testing Infrastructure Setup

**Epic:** [Epic 1: Foundation & Core Graph Infrastructure](epic-1-foundation.md)

## User Story

**As a** developer,  
**I want** a complete testing infrastructure with Jest and Playwright configured,  
**So that** I can write unit, integration, and E2E tests for all features.

## Acceptance Criteria

1. Jest 29.7+ is installed and configured for unit tests
2. React Testing Library is installed and configured
3. Playwright 1.41+ is installed for E2E tests
4. Test scripts are defined in package.json: `test`, `test:watch`, `test:coverage`, `test:e2e`
5. Jest config supports TypeScript with ts-jest
6. MongoDB Memory Server is configured for unit tests (in-memory database)
7. Test environment variables documented in `.env.test.example`
8. Example unit test for a utility function passes
9. Example React component test with RTL passes
10. Example Playwright E2E test passes
11. Coverage report generates successfully (HTML + terminal)
12. Pre-commit hook runs tests and blocks commit if tests fail
13. Test coverage threshold configured (80% for statements, branches, functions, lines)

## Technical Notes

- Jest configuration in jest.config.js with monorepo support
- Playwright config with Chromium, Firefox, Safari browsers
- MongoDB Memory Server for unit tests (lightweight in-memory database)
- MongoDB local instance for integration tests (document setup in README)
- Test utilities in `packages/graph-engine/__tests__/utils/`
- Mock factories for common test data
- Setup files for test environment
- .env.test.example with test-specific variables
- GitHub Actions will run these tests (Story 1.6)

## Definition of Done

- [ ] Jest 29.7+ installed and configured
- [ ] React Testing Library configured
- [ ] Playwright 1.41+ installed
- [ ] All test scripts functional
- [ ] TypeScript support working
- [ ] Example unit test passing
- [ ] Example component test passing
- [ ] Example E2E test passing
- [ ] Coverage report generating
- [ ] Pre-commit hook functional
- [ ] Coverage thresholds enforced

## Estimated Effort

**3 points** (1-2 jours)

## Dependencies

- Story 1.1 (project setup)
- Should be completed BEFORE Story 1.6 (CI/CD will use these tests)
