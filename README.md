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
- **`npm run test`** - Run tests across all packages
- **`npm run lint`** - Run ESLint across all packages
- **`npm run type-check`** - Run TypeScript type checking

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
