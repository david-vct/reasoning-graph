# Story 7.3: Library Search & Filtering

**Epic:** [Epic 7: Public Library & Discovery](epic-7-library.md)

## User Story

**As a** user,  
**I want** to search and filter the library by keywords, categories, and tags,  
**So that** I can quickly find relevant reasoning examples.

## Acceptance Criteria

1. Search bar at top of library page accepts text input
2. Search executes on Enter key or click search icon
3. Search queries graph title, description, and tags (full-text search)
4. Search results display with matching text highlighted
5. Filter by multiple tags: tag pills below search bar (click to add/remove)
6. Combined filters: search + category + tags work together (AND logic)
7. URL reflects current filters: `/library?q=socrates&category=philosophy&tags=logic`
8. Clear all filters button resets to default view
9. Search debouncing: 300ms delay before executing search
10. "No results" message with suggestions when search returns empty
11. Search result count: "Found 12 graphs matching 'socrates'"
12. Recent searches dropdown (optional, stores last 5 in localStorage)

## Technical Notes

- Implement search backend: MongoDB text index on title, description, tags
- Alternative: Use MongoDB Atlas Search (free tier)
- Query parameters for shareable filtered views
- Debounce search input with useDebounce hook
- Tag component: TagPill for visual representation
- Highlight matching text: use mark.js or custom highlighting
- Performance: index optimization for search queries

## Definition of Done

- [ ] Search bar functional
- [ ] Search on Enter/click working
- [ ] Full-text search operational
- [ ] Matching text highlighted
- [ ] Tag filters working
- [ ] Combined filters functional
- [ ] URL reflects filters
- [ ] Clear filters button working
- [ ] Search debouncing implemented
- [ ] No results message shown
- [ ] Result count displayed
- [ ] Recent searches dropdown (optional)
- [ ] MongoDB text index created
- [ ] E2E test for search scenarios

## Estimated Effort

**8 points** (3-4 jours)

## Dependencies

- Story 6.1 (Graph CRUD API - search endpoint)
- Story 7.2 (Library UI - base page)
