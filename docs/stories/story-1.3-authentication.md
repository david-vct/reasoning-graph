# Story 1.3: Authentication System Setup

**Epic:** [Epic 1: Foundation & Core Graph Infrastructure](../epics/epic-1-foundation.md)  
**Status:** Done
**Agent Model Used:** Claude Sonnet 4.5

## Story

**As a** user,  
**I want** to create an account and login,  
**so that** I can access the application and save my graphs.

## Acceptance Criteria

1. NextAuth.js v5 is configured with JWT strategy
2. An Email/Password (Credentials) provider is implemented
3. The `/login` page displays a form with email and password
4. The `/signup` page allows creating a new user account
5. Passwords are hashed with bcrypt before saving
6. After successful login, user is redirected to `/editor`
7. A "Logout" button in the header allows disconnecting
8. Sessions persist for 7 days (JWT configuration)
9. Protected routes redirect to `/login` if not authenticated

## Tasks / Subtasks

- [x] Task 1: Install and Configure NextAuth.js v5 Dependencies (AC: 1)
  - [x] Install `next-auth@beta` (v5.0+), `bcryptjs`, `@types/bcryptjs`
  - [x] Add NEXTAUTH_URL and NEXTAUTH_SECRET to `.env.example` and `.env.local`
  - [x] Generate secure NEXTAUTH_SECRET: `openssl rand -base64 32`

- [x] Task 2: Create NextAuth.js Configuration and API Route (AC: 1, 2, 8)
  - [x] Create `apps/web/app/api/auth/[...nextauth]/route.ts`
  - [x] Configure authOptions with CredentialsProvider
  - [x] Set session strategy to JWT with maxAge: 7 days (604800 seconds)
  - [x] Implement authorize function calling UserRepository.verifyPassword()
  - [x] Export GET and POST handlers from route

- [x] Task 3: Implement UserRepository Password Verification (AC: 2, 5)
  - [x] Create `apps/web/repositories/UserRepository.ts`
  - [x] Implement `verifyPassword(email, password)` method
  - [x] Use bcrypt.compare() to verify password against passwordHash
  - [x] Implement `create(data)` method with bcrypt.hash() (10 salt rounds)
  - [x] Return user object without passwordHash for security

- [x] Task 4: Create Signup Page and API Endpoint (AC: 4, 5)
  - [x] Create signup API route: `apps/web/app/api/auth/signup/route.ts`
  - [x] Validate email format and password length (min 8 chars) using Zod
  - [x] Hash password with bcrypt (10 rounds) before storing
  - [x] Call UserRepository.create() to save new user to MongoDB
  - [x] Handle duplicate email error (unique constraint)
  - [x] Create signup page: `apps/web/app/(auth)/signup/page.tsx`
  - [x] Build form with email, name, password, confirm password fields
  - [x] Call signup API endpoint on form submission
  - [x] Redirect to `/login` on successful signup

- [x] Task 5: Create Login Page (AC: 3, 6)
  - [x] Create login page: `apps/web/app/(auth)/login/page.tsx`
  - [x] Build form with email and password fields
  - [x] Use NextAuth signIn('credentials') client function
  - [x] Handle login errors and display user-friendly messages
  - [x] Redirect to `/editor` on successful login (callbackUrl)

- [x] Task 6: Implement Protected Routes Middleware (AC: 9)
  - [x] Create middleware: `apps/web/middleware.ts`
  - [x] Use NextAuth getToken() to verify JWT from request
  - [x] Protect routes matching `/editor`, `/my-graphs`, `/api/graphs/*`
  - [x] Redirect unauthenticated users to `/login?callbackUrl={path}`
  - [x] Configure middleware matcher in middleware.ts config

- [x] Task 7: Create Logout Button Component (AC: 7)
  - [x] Create header component: `apps/web/components/Header.tsx`
  - [x] Add logout button using NextAuth signOut() client function
  - [x] Display user name/email when authenticated
  - [x] Redirect to `/login` after logout

- [x] Task 8: Create Editor Page Placeholder (AC: 6)
  - [x] Create protected page: `apps/web/app/(dashboard)/editor/page.tsx`
  - [x] Display welcome message with authenticated user's name
  - [x] Verify page is only accessible when authenticated

- [x] Task 9: Testing and Validation (AC: All)
  - [x] Test signup flow: create new user account
  - [x] Test login flow: authenticate with created account
  - [x] Verify session persists across browser refresh
  - [x] Test logout: session cleared, redirected to login
  - [x] Test protected route access without auth (redirects to login)
  - [x] Test duplicate email signup (shows error)
  - [x] Test invalid password login (shows error)
  - [x] Verify JWT expires after 7 days (optional: manual time manipulation)

## Dev Notes

### Previous Story Insights

[Source: Story 1.2 Completion Notes]

- MongoDB connection utility already created at `apps/web/lib/mongodb.ts`
- User Mongoose model exists at `apps/web/models/User.ts` with passwordHash field (select: false)
- User TypeScript interface exported from `packages/types/src/index.ts`
- Environment variables pattern established in `.env.example` and `.env.local`

### NextAuth.js v5 Configuration

[Source: docs/architecture.md#authentication-nextauthjs]

**Authentication Options:**

```typescript
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const user = await UserRepository.verifyPassword(credentials.email, credentials.password);
        return user;
      },
    }),
  ],
  session: { strategy: 'jwt', maxAge: 7 * 24 * 60 * 60 },
  secret: process.env.NEXTAUTH_SECRET,
};
```

**Key Configuration:**

- **Session Strategy:** JWT (not database sessions) - stores user data in encrypted cookie
- **Max Age:** 7 days (604800 seconds)
- **Secret:** Must be 32+ character random string from NEXTAUTH_SECRET env var
- **Provider:** CredentialsProvider for email/password authentication

### UserRepository Implementation

[Source: docs/architecture.md#repository-pattern]

**Required Methods:**

```typescript
export class UserRepository {
  static async findByEmail(email: string): Promise<User | null> {
    await connectDB();
    return User.findOne({ email }).select('+passwordHash');
  }

  static async create(data: { email: string; name: string; password: string }): Promise<User> {
    await connectDB();
    const passwordHash = await bcrypt.hash(data.password, 10);
    const user = await User.create({
      email: data.email,
      name: data.name,
      passwordHash,
    });
    return user;
  }

  static async verifyPassword(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    if (!user || !user.passwordHash) return null;

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) return null;

    // Return user without passwordHash
    const { passwordHash, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  }
}
```

**Important Notes:**

- Use `select('+passwordHash')` to include passwordHash field (normally excluded)
- Always call `connectDB()` before Mongoose operations
- Never return passwordHash to client - exclude it from returned user object
- Use bcrypt salt rounds: 10 (balance between security and performance)

### Password Hashing (bcrypt)

[Source: docs/architecture.md#security]

- **Library:** bcryptjs (pure JavaScript, no native dependencies)
- **Salt Rounds:** 10 (industry standard for 2024)
- **Hash Function:** `bcrypt.hash(password, saltRounds)`
- **Verify Function:** `bcrypt.compare(plainPassword, hash)`

### API Routes

[Source: docs/architecture.md#api-route-organization]

**File Locations:**

```
apps/web/app/api/
├── auth/
│   ├── [...nextauth]/route.ts    # NextAuth.js dynamic route
│   └── signup/route.ts           # Custom signup endpoint
```

**Signup Endpoint Structure:**

```typescript
// POST /api/auth/signup
export async function POST(request: Request) {
  const body = await request.json();

  // Validate with Zod
  const schema = z.object({
    email: z.string().email(),
    name: z.string().min(1),
    password: z.string().min(8),
  });

  const validated = schema.parse(body);

  try {
    const user = await UserRepository.create(validated);
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
    }
    throw error;
  }
}
```

### Middleware for Route Protection

[Source: docs/architecture.md#routing-architecture]

**Middleware Location:** `apps/web/middleware.ts`

**Implementation:**

```typescript
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Protected routes
  if (!token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/editor/:path*', '/my-graphs/:path*', '/api/graphs/:path*'],
};
```

**Protected Routes:**

- `/editor` - Graph editor page
- `/my-graphs` - User's saved graphs
- `/api/graphs/*` - Graph API endpoints (require auth)

### Route Groups

[Source: docs/architecture.md#routing-architecture]

**Auth Routes (Public):**

```
apps/web/app/(auth)/
├── login/page.tsx
└── signup/page.tsx
```

**Dashboard Routes (Protected):**

```
apps/web/app/(dashboard)/
├── editor/page.tsx
└── my-graphs/page.tsx
```

**Note:** Route groups `(auth)` and `(dashboard)` don't affect URL structure but help organize code

### Form Validation

[Source: docs/architecture.md#tech-stack]

**Client-Side:**

- Email format validation: standard HTML5 email input type
- Password minimum length: 8 characters
- Confirm password matching
- Display error messages inline

**Server-Side:**

- Use Zod for runtime validation
- Validate email format: `z.string().email()`
- Validate password length: `z.string().min(8)`
- Never trust client-side validation alone

### Environment Variables

**New Variables to Add:**

```bash
# .env.example and .env.local
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generate-with-openssl-rand-base64-32>
```

**Generate Secret:**

```bash
openssl rand -base64 32
```

### Project Structure

```
apps/web/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx          # Login page
│   │   └── signup/
│   │       └── page.tsx          # Signup page
│   ├── (dashboard)/
│   │   └── editor/
│   │       └── page.tsx          # Protected editor page
│   └── api/
│       └── auth/
│           ├── [...nextauth]/
│           │   └── route.ts      # NextAuth.js API route
│           └── signup/
│               └── route.ts      # Signup API route
├── components/
│   └── Header.tsx                # Header with logout button
├── repositories/
│   └── UserRepository.ts         # User data access layer
└── middleware.ts                 # Route protection middleware
```

### Testing

[Source: docs/architecture.md#testing-strategy]

**Testing Approach:** Manual verification + API testing

1. **Signup Flow:**
   - Visit http://localhost:3000/signup
   - Create account with valid email/password
   - Verify redirect to login page
   - Check user created in MongoDB

2. **Login Flow:**
   - Visit http://localhost:3000/login
   - Login with created account
   - Verify redirect to /editor
   - Check session cookie set in browser

3. **Session Persistence:**
   - Refresh browser
   - Verify still authenticated (no redirect to login)

4. **Logout:**
   - Click logout button in header
   - Verify redirect to /login
   - Verify session cookie cleared

5. **Protected Route:**
   - Logout
   - Try accessing /editor directly
   - Verify redirect to /login?callbackUrl=/editor

6. **Error Handling:**
   - Test duplicate email signup (409 error)
   - Test invalid credentials login (401 error)
   - Test weak password (validation error)

**No unit tests required** for this MVP story - focus on integration verification

## Definition of Done

- [ ] NextAuth.js v5 configured with JWT strategy and 7-day session
- [ ] CredentialsProvider implemented using UserRepository
- [ ] Signup page created at `/signup` with form validation
- [ ] Signup API endpoint creates users with bcrypt password hashing
- [ ] Login page created at `/login` with email/password form
- [ ] Successful login redirects to `/editor`
- [ ] Logout button in Header component clears session
- [ ] Middleware protects `/editor`, `/my-graphs`, and `/api/graphs/*` routes
- [ ] Unauthenticated users redirected to `/login` with callbackUrl
- [ ] All environment variables documented in `.env.example`
- [ ] Manual testing confirms all acceptance criteria met
- [ ] TypeScript compilation passes without errors

## Estimated Effort

**5 points** (2-3 days)

## Dependencies

- Story 1.1 (Setup Project & Monorepo Structure) - **REQUIRED**
- Story 1.2 (Database Setup & Connection) - **REQUIRED**

## Change Log

| Date       | Version | Description                                  | Author |
| ---------- | ------- | -------------------------------------------- | ------ |
| 2026-01-16 | 1.2     | Story completed - authentication implemented | James  |
| 2026-01-16 | 1.1     | Enriched with full context from architecture | Bob SM |
| 2026-01-16 | 1.0     | Initial story creation                       | Bob SM |

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.5

### Debug Log References

None

### Completion Notes

- NextAuth.js v5 (beta) successfully configured with JWT strategy and 7-day session expiration
- Credentials provider implemented with bcrypt password hashing (10 salt rounds)
- UserRepository created with password verification and user creation methods
- Signup API endpoint validates input with Zod and handles duplicate emails
- Login and signup pages created with client-side form validation
- Middleware protects /editor, /my-graphs, and /api/graphs/\* routes
- Header component displays user email and logout button
- Editor page placeholder created with user welcome message
- SessionProvider wraps entire app to enable useSession hook
- NextAuth type definitions added for TypeScript support
- All linting errors resolved
- Build passes successfully
- Note: Next.js 16 shows deprecation warning for middleware file convention (recommends "proxy"), but middleware still functions correctly

### File List

- `apps/web/.env.example` (modified - added NEXTAUTH_URL and NEXTAUTH_SECRET)
- `apps/web/.env.local` (modified - added NEXTAUTH_URL and NEXTAUTH_SECRET with generated secret)
- `apps/web/package.json` (modified - added next-auth@beta, bcryptjs, @types/bcryptjs, zod)
- `apps/web/repositories/UserRepository.ts` (new - user data access layer with password verification)
- `apps/web/app/api/auth/[...nextauth]/route.ts` (new - NextAuth.js configuration and handlers)
- `apps/web/app/api/auth/signup/route.ts` (new - signup API endpoint with Zod validation)
- `apps/web/app/(auth)/signup/page.tsx` (new - signup page with form)
- `apps/web/app/(auth)/login/page.tsx` (new - login page with form)
- `apps/web/app/(dashboard)/editor/page.tsx` (new - protected editor page placeholder)
- `apps/web/middleware.ts` (new - route protection middleware)
- `apps/web/components/Header.tsx` (new - header with logout button)
- `apps/web/components/SessionProvider.tsx` (new - client-side session provider wrapper)
- `apps/web/types/next-auth.d.ts` (new - NextAuth TypeScript type definitions)
- `apps/web/app/layout.tsx` (modified - added SessionProvider and Header)
