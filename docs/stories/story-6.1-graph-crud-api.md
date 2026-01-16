# Story 6.1: Graph CRUD API Endpoints

**Epic:** [Epic 6: Persistence & Sharing](epic-6-persistence.md)

## User Story

**As a** developer,  
**I want** RESTful API endpoints for graph CRUD operations,  
**So that** the frontend can save, load, update, and delete reasoning graphs.

## Acceptance Criteria

1. POST `/api/graphs` creates new graph with owner from JWT session
2. GET `/api/graphs/:id` retrieves single graph by ID
3. GET `/api/graphs` retrieves all graphs for authenticated user (my graphs)
4. GET `/api/graphs/public` retrieves public graphs (library)
5. PUT `/api/graphs/:id` updates existing graph (owner only)
6. DELETE `/api/graphs/:id` deletes graph (owner only)
7. Authorization: only owner can update/delete their graphs
8. Graph validation: title required, nodes/edges arrays validated with Zod
9. Default values: isPublic=true, tags=[], category='Uncategorized'
10. Response includes validation status computed server-side
11. Error handling: 400 for invalid data, 401 unauthorized, 404 not found, 500 server error
12. Rate limiting: max 100 requests per minute per user

## Technical Notes

- Mongoose schema for ReasoningGraph as per architecture.md
- Zod schemas for request validation
- NextAuth session for user authentication
- Owner verification middleware
- Compute validationStatus before response (valid/invalid/partial)
- Pagination for GET /api/graphs (limit=20 default)
- Include ownerName in response (denormalized for performance)

## Definition of Done

- [ ] POST /api/graphs endpoint functional
- [ ] GET /api/graphs/:id endpoint functional
- [ ] GET /api/graphs (my graphs) functional
- [ ] GET /api/graphs/public functional
- [ ] PUT /api/graphs/:id functional
- [ ] DELETE /api/graphs/:id functional
- [ ] Authorization working correctly
- [ ] Zod validation operational
- [ ] Default values applied
- [ ] Validation status computed
- [ ] Error handling comprehensive
- [ ] Rate limiting implemented
- [ ] API tests with 90%+ coverage

## Estimated Effort

**8 points** (3-4 jours)

## Dependencies

- Story 1.2 (Database setup)
- Story 1.3 (Authentication)
- Story 2.1-2.4 (Node types for schema)
