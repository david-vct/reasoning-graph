# Reasoning Graph

[![CI](https://github.com/david-vct/reasoning-graph/actions/workflows/ci.yml/badge.svg)](https://github.com/david-vct/reasoning-graph/actions/workflows/ci.yml)

Visual reasoning tool with logical validation - Build and validate logical arguments using an interactive graph interface.

<!-- CI/CD Pipeline Test: Verifying automated deployments -->

## Prerequisites

- **Node.js**: Version 20+ LTS (Long Term Support)
  - Check your version: `node --version`
  - Download from: https://nodejs.org/

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

This will install all dependencies for the monorepo and all workspace packages.

### 2. Development Server

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

This is a monorepo project with the following structure:

```
reasoning-graph/
├── apps/
│   └── web/                  # Next.js 14+ App (frontend + API routes)
├── packages/
│   ├── graph-engine/         # Core: validation logic, DAG algorithms
│   ├── ui-components/        # Reusable React components
│   └── types/                # Shared TypeScript types
├── package.json              # Root workspace configuration
└── README.md
```

## Available Scripts

From the root directory:

- **`npm run dev`** - Start the development server (Next.js app)
- **`npm run build`** - Build all workspace packages for production
- **`npm run test`** - Run all tests across workspaces
- **`npm run test:watch`** - Run tests in watch mode for development
- **`npm run test:coverage`** - Generate test coverage report
- **`npm run test:e2e`** - Run end-to-end tests with Playwright
- **`npm run lint`** - Run ESLint across all packages
- **`npm run type-check`** - Run TypeScript type checking

## Testing

This project uses a comprehensive testing setup:

### Unit & Component Tests (Jest)

Run unit and component tests:

```bash
npm test                    # Run all tests
npm run test:watch          # Watch mode for development
npm run test:coverage       # Generate coverage report
```

Coverage reports are generated in the `coverage/` directory. Open `coverage/lcov-report/index.html` in a browser to view detailed coverage.

**Test Structure:**

- Unit tests: `packages/graph-engine/src/__tests__/`
- Component tests: `apps/web/__tests__/components/`
- API tests: `apps/web/__tests__/api/`

### End-to-End Tests (Playwright)

Run E2E tests:

```bash
npm run test:e2e            # Run Playwright tests
```

**Note:** E2E tests require the development server to be running or will start it automatically.

E2E tests are located in `apps/web/__tests__/e2e/`.

### Writing Tests

**Example Unit Test:**

```typescript
// packages/graph-engine/src/__tests__/validation.test.ts
import { validateDAG } from '../validation';

describe('DAG Validation', () => {
  it('should detect cycles', () => {
    const result = validateDAG(graphWithCycle);
    expect(result.isValid).toBe(false);
  });
});
```

**Example Component Test:**

```typescript
// apps/web/__tests__/components/MyComponent.test.tsx
import { render, screen } from '../utils/test-utils';
import MyComponent from '@/components/MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

**Example E2E Test:**

```typescript
// apps/web/__tests__/e2e/workflow.spec.ts
import { test, expect } from '@playwright/test';

test('user can complete workflow', async ({ page }) => {
  await page.goto('/');
  await page.click('[data-testid="start-button"]');
  await expect(page.locator('.result')).toBeVisible();
});
```

## Development Workflow

1. **Code Quality**: Pre-commit hooks automatically run linting and formatting
2. **TypeScript**: Strict mode is enabled for type safety
3. **Styling**: Tailwind CSS with custom design system

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Linting**: ESLint + Prettier
- **Package Manager**: npm workspaces

## Troubleshooting

### Node Version Issues

If you encounter errors during installation, verify your Node.js version:

```bash
node --version
```

Ensure it's 20.0.0 or higher. If not, update Node.js.

### Lock File Issues

If you encounter package-lock.json conflicts, delete it and node_modules, then reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use

If port 3000 is already in use, you can specify a different port:

```bash
PORT=3001 npm run dev
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Ensure all checks pass (`npm run lint`, `npm run type-check`)
4. Commit your changes (pre-commit hooks will run automatically)
5. Push and create a pull request

## License

MIT
