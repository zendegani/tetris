---
story_id: '1-1-grid-initialization'
epic_id: 'epic-1'
title: 'Grid Initialization'
status: 'ready-for-dev'
---

# Story 1.1: Grid Initialization

## Goal
Establish the core 10x20 grid state management system.

## Acceptance Criteria
- [ ] A `Grid` class exists in `src/logic/grid.ts`.
- [ ] The grid is represented by a 2D array (10 columns, 20 rows).
- [ ] Methods exist to reset the grid to an empty state (0).
- [ ] Methods exist to set a cell value at `(x, y)`.
- [ ] The coordinate system follows the top-left (0,0) origin defined in the project context.
- [ ] Unit tests in `src/logic/grid.test.ts` verify grid creation and cell manipulation.

## Implementation Notes
- Use `number[][]` for the grid. 0 = empty, >0 = block types.
- Strict TypeScript: No `any`.
- Adhere to the `kebab-case` for files.
