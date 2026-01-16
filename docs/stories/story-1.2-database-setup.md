# Story 1.2: Database Setup & Connection

**Epic:** [Epic 1: Foundation & Core Graph Infrastructure](epic-1-foundation.md)

## User Story

**As a** developer,  
**I want** a configured and operational MongoDB Atlas connection,  
**So that** I can save and retrieve data in upcoming stories.

## Acceptance Criteria

1. MongoDB Atlas free tier is provisioned and accessible
2. Mongoose is installed and configured with MongoDB connection
3. Environment variables (MONGODB_URI) are documented in `.env.example`
4. A minimal Mongoose schema for `User` is created with fields: email, name, createdAt
5. An API route `/api/health` returns MongoDB connection status (connected: true/false)
6. Connection uses pooling to optimize performance
7. Connection errors are explicitly logged

## Technical Notes

- Use MongoDB Atlas M0 (free tier) - 512MB storage
- Connection string format: `mongodb+srv://...`
- Mongoose connection options for production: maxPoolSize, serverSelectionTimeoutMS
- Create separate connection utility in `packages/` for reusability
- Add `.env.local` to .gitignore

## Definition of Done

- [ ] MongoDB Atlas cluster created and accessible
- [ ] Mongoose connection working successfully
- [ ] Environment variables documented
- [ ] User schema created and tested
- [ ] `/api/health` endpoint returns connection status
- [ ] Connection pooling configured
- [ ] Error logging operational

## Estimated Effort

**2 points** (4-6 heures)

## Dependencies

- Story 1.1 (project setup)
