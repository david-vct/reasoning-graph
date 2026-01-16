# Story 6.3: Shareable URLs for Public Graphs

**Epic:** [Epic 6: Persistence & Sharing](epic-6-persistence.md)

## User Story

**As a** user,  
**I want** to generate shareable URLs for my public graphs,  
**So that** I can share my reasoning with others via simple links.

## Acceptance Criteria

1. Every public graph has a canonical URL: `/graph/[graphId]`
2. "Share" button in editor generates shareable link
3. Click "Share" copies URL to clipboard with success toast
4. Share modal displays: URL, QR code, social media share buttons (Twitter, LinkedIn)
5. Public graph URLs are accessible without authentication
6. Private graphs show "404 Not Found" when accessed via direct URL
7. Graph metadata (title, description) used for Open Graph tags (rich previews)
8. Shareable URL includes owner name in breadcrumb: "By [ownerName]"
9. View-only mode for shared graphs: no edit buttons visible
10. "Fork this graph" button visible on shared public graphs
11. Analytics: track view count for public graphs

## Technical Notes

- Route: `/graph/[graphId]` in Next.js App Router
- Server-side rendering for public graphs (SEO optimization)
- Check graph.isPublic before rendering
- Clipboard API for copy-to-clipboard functionality
- QR code generation: use qrcode library
- Open Graph meta tags: og:title, og:description, og:image
- View count increment on page load (throttled by IP)

## Definition of Done

- [ ] Canonical URLs working
- [ ] Share button functional
- [ ] Copy to clipboard working
- [ ] Share modal with QR code
- [ ] Social media share buttons
- [ ] Public access without auth
- [ ] Private graphs return 404
- [ ] Open Graph tags implemented
- [ ] Owner name in breadcrumb
- [ ] View-only mode working
- [ ] Fork button visible
- [ ] View count tracking
- [ ] E2E test for sharing workflow

## Estimated Effort

**8 points** (3-4 jours)

## Dependencies

- Story 6.1 (Graph CRUD API)
- Story 6.2 (Graph save/load)
