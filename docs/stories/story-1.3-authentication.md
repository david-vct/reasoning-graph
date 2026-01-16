# Story 1.3: Authentication System Setup

**Epic:** [Epic 1: Foundation & Core Graph Infrastructure](epic-1-foundation.md)

## User Story

**As a** user,  
**I want** to create an account and login,  
**So that** I can access the application and save my graphs.

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

## Technical Notes

- NextAuth.js v5 with JWT strategy (not database sessions)
- bcrypt for password hashing (salt rounds: 10)
- Middleware for route protection
- Simple email/password validation (email format, password min 8 chars)
- JWT secret in environment variables

## Definition of Done

- [ ] NextAuth.js v5 configured
- [ ] Credentials provider working
- [ ] Login page functional
- [ ] Signup page functional
- [ ] Passwords hashed with bcrypt
- [ ] Successful login redirects to /editor
- [ ] Logout button working
- [ ] Session persistence (7 days)
- [ ] Protected routes redirect properly

## Estimated Effort

**5 points** (2-3 jours)

## Dependencies

- Story 1.1 (project setup)
- Story 1.2 (database for user storage)
