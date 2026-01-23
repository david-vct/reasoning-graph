# Development Guidelines & Coding Standards

## Code Documentation Standards

**JSDoc for Public APIs:**

- All exported functions, classes, and interfaces MUST have JSDoc comments
- Include @param, @returns, @throws, @example when applicable
- Example:

```typescript
/**
 * Validates a logic node and its connections
 * @param node - The logic node to validate
 * @param edges - All edges in the graph
 * @returns Validation result with errors if any
 * @throws ValidationError if node structure is invalid
 */
export function validateNode(node: LogicNode, edges: Edge[]): ValidationResult;
```

**Inline Comments for Complex Logic:**

- Graph engine algorithms MUST have step-by-step comments
- Validation rules MUST explain the logic being validated
- Performance-critical sections MUST document optimization rationale

**Naming Conventions:**

- Components: PascalCase (e.g., `NodeRenderer`, `GraphCanvas`)
- Functions/variables: camelCase (e.g., `validateGraph`, `isConnecting`)
- Constants: UPPER_SNAKE_CASE (e.g., `MAX_NODES`, `DEFAULT_ZOOM`)
- Types/Interfaces: PascalCase with descriptive names (e.g., `ValidationResult`, `PropositionType`)
- File names: kebab-case for components (e.g., `node-renderer.tsx`), camelCase for utilities

**TypeScript Standards:**

- Strict mode enabled (no any, implicit any, null checks)
- Prefer interfaces over types for object shapes
- Use discriminated unions for polymorphic data (e.g., LogicNode)
- Export types alongside implementation

## Error Message Guidelines

**Structure:** Problem + Cause + Solution

**Tone:** Helpful and non-blaming

**Examples:**

- ❌ Bad: "Invalid connection"
- ✅ Good: "Cannot connect: Modus Ponens requires an implication (P→Q) as first premise. Try connecting an implication node instead."

**Categories:**

- Validation errors: Explain logic rule violated
- Network errors: Suggest retry or check connection
- User input errors: Guide toward correct format

## Form Validation Patterns

**Client-Side:**

- Use Zod schemas for all forms
- Real-time validation on blur (not on every keystroke)
- Display errors below field with red text and icon
- Disable submit button if form invalid

**Server-Side:**

- ALWAYS revalidate with same Zod schemas
- Return structured error responses: `{ field: string, message: string }[]`
- Log validation failures for security monitoring

## Testing Standards

**Unit Tests (80%+ coverage for graph-engine):**

- Test files colocated: `node-validator.ts` → `node-validator.test.ts`
- Use descriptive test names: `describe("validateModusPonens") { it("should fail when first premise is not an implication") }`
- Mock external dependencies (MongoDB, APIs)
- Use MongoDB Memory Server for database tests

**Integration Tests:**

- Test API endpoints with supertest
- Test critical user flows end-to-end
- Use test database (not production!)

**E2E Tests (Playwright):**

- Focus on critical paths: auth, create graph, save graph, load graph
- Run in CI pipeline on every PR
- Use data-testid attributes for stable selectors

## Git Workflow

**Branches:**

- main: production-ready code
- develop: integration branch (optional for larger teams)
- feature/story-X-Y: feature branches (e.g., feature/story-2-1-propositions)

**Commits:**

- Conventional commits: `feat:`, `fix:`, `docs:`, `test:`, `refactor:`
- Reference story: `feat(story-3.2): implement validation engine`
- Keep commits atomic and focused

**Pull Requests:**

- Title: `Story X.Y: Brief description`
- Description: Link to story, summary of changes, testing done
- Require 1 approval before merge
- CI must pass (tests, linting, build)
