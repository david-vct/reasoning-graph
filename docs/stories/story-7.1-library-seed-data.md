# Story 7.1: Library Seed Data & Famous Reasonings

**Epic:** [Epic 7: Public Library & Discovery](epic-7-library.md)

## User Story

**As a** user,  
**I want** the library to be pre-populated with famous reasoning examples,  
**So that** I can learn from classic arguments and use them as templates.

## Acceptance Criteria

1. Seed script creates 15+ famous reasoning graphs in database
2. Examples include classical arguments:
   - "All men are mortal, Socrates is a man, therefore Socrates is mortal" (Syllogism)
   - Modus Ponens example
   - Modus Tollens example
   - Proof by contradiction example
   - Disjunctive syllogism example
   - Mathematical induction example (simple case)
3. Each graph has proper metadata: title, description, category, tags
4. Categories include: "Logic", "Philosophy", "Mathematics", "Science"
5. All seed graphs are public and attributed to "System" or "Reasoning Graph Team"
6. Graphs include annotations explaining each step
7. Graphs demonstrate best practices for node organization and layout
8. Seed script is idempotent: can run multiple times without duplication
9. Seed data includes mix of simple (3-5 nodes) and complex (10-15 nodes) examples
10. npm script: `npm run seed:library` executes seed operation

## Technical Notes

- Create seed script in `scripts/seed-library.ts`
- Use Mongoose to insert seed data
- Check for existing graphs by unique identifier (e.g., slug)
- Structured seed data format: JSON or TypeScript objects
- Include proper node types, connections, and validation
- Automated layout using Dagre for consistent positioning
- Consider versioning: seed data can evolve

## Definition of Done

- [ ] Seed script created
- [ ] 15+ famous examples defined
- [ ] Classical syllogisms included
- [ ] Proper metadata for all graphs
- [ ] Categories assigned correctly
- [ ] System attribution set
- [ ] Annotations added to nodes
- [ ] Best practices demonstrated
- [ ] Script is idempotent
- [ ] Mix of simple and complex examples
- [ ] npm script functional
- [ ] Documentation for adding new seeds

## Estimated Effort

**5 points** (2-3 jours)

## Dependencies

- Story 6.1 (Graph CRUD API - for data model)
- Story 1.2 (Database setup)
