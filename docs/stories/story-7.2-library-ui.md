# Story 7.2: Public Library UI & Discovery

**Epic:** [Epic 7: Public Library & Discovery](epic-7-library.md)

## User Story

**As a** user,  
**I want** to browse the public library of reasoning graphs,  
**So that** I can discover and learn from examples created by others.

## Acceptance Criteria

1. "/library" route displays public library page
2. Library shows grid of graph cards (responsive: 3 columns desktop, 2 tablet, 1 mobile)
3. **Skeleton loaders** displayed while library data is loading
4. Each card displays: thumbnail/preview, title, author, category badge, fork count, view count
5. Hover on card shows description tooltip
6. Click card navigates to graph detail page: `/graph/[id]`
7. "Featured" section at top shows curated/popular graphs (3-4 featured cards)
8. Category filter tabs: "All", "Logic", "Philosophy", "Mathematics", "Science"
9. Sort dropdown: "Most Recent", "Most Popular" (by views), "Most Forked"
10. Pagination: 20 graphs per page with page numbers
11. Empty state when no graphs: "No graphs found. Be the first to create one!"
12. **Loading skeleton transitions smoothly** to actual cards when data loads
13. "Create New Graph" button in header navigates to `/editor`

## Technical Notes

- Use GET /api/graphs/public endpoint (from Story 6.1)
- Server-side rendering for initial page load (SEO)
- Client-side filtering and sorting for better UX
- Skeleton loader component from shadcn/ui for consistent loading UX
- Card component: GraphCard with thumbnail, metadata
- Thumbnail: generate from graph data or use placeholder
- Category colors: consistent with design system
- Infinite scroll consideration (future enhancement)
- Loading state managed in Zustand store (isLoadingLibrary flag)

## Definition of Done

- [ ] /library route working
- [ ] Grid layout responsive
- [ ] Cards display all metadata
- [ ] Hover tooltips functional
- [ ] Card click navigation working
- [ ] Featured section visible
- [ ] Category filters working
- [ ] Sort dropdown functional
- [ ] Pagination working
- [ ] Empty state displayed
- [ ] Loading skeleton shown
- [ ] Create button present
- [ ] E2E test for library browsing

## Estimated Effort

**8 points** (3-4 jours)

## Dependencies

- Story 6.1 (Graph CRUD API - public endpoint)
- Story 7.1 (Seed data - for content)
