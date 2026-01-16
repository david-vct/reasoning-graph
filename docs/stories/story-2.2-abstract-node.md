# Story 2.2: Abstract Node Base Class & Type System

**Epic:** [Epic 2: Node Types & Logic System](epic-2-node-types.md)

## User Story

**As a** developer,  
**I want** an abstract class architecture for nodes with inheritance,  
**So that** I can easily define new logic node types with type-safety.

## Acceptance Criteria

1. An abstract class `LogicNode` is defined in `packages/graph-engine/src/nodes/` with: id, type, position, premises[], conclusions[], abstract methods getInputCount(), getOutputCount(), validate(), annotation?
2. A base Zod schema `LogicNodeSchema` defines common fields
3. A `NodeTypeDefinition` interface defines metadata
4. A `nodeTypeRegistry.ts` file maintains a mapping of definitions
5. TypeScript utility types allow inference
6. A factory function `createNode(type, data)` instantiates the correct node type
7. Exports are organized for easy import

## Technical Notes

- Abstract class LogicNode with template method pattern
- Zod base schema with inheritance
- Registry pattern for node type definitions
- Factory pattern for node instantiation
- TypeScript generics for type inference

## Definition of Done

- [ ] LogicNode abstract class defined
- [ ] LogicNodeSchema Zod base schema created
- [ ] NodeTypeDefinition interface defined
- [ ] nodeTypeRegistry.ts with registry
- [ ] Utility types for TypeScript inference
- [ ] createNode factory function implemented
- [ ] Clean export structure
- [ ] Unit tests for base functionality

## Estimated Effort

**5 points** (2-3 jours)

## Dependencies

- Story 2.1 (proposition system)
