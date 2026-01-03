status: 'done'
---

# Story 1.5: Gravity, Lock, and Clearing

## Goal
Implement the core game loop logic: gravity progression, piece locking, and line clearing matching the "Purist" constraints.

## Acceptance Criteria
- [x] Logic for gravity (automatic downward movement) exists.
- [x] Logic for locking a piece when it hits the floor or obstacles.
- [x] Logic for detecting full rows and clearing them from the grid.
- [x] Logic for shifting remaining rows down after a clear.
- [x] Unit tests in `src/logic/engine.test.ts` verify the full lock-and-clear cycle.

## Implementation Notes
- Use a `lockDelay` of 500ms (standard classic feel).
- Line clears should update a score variable (standard scoring: 40, 100, 300, 1200).
- Adhere to the `kebab-case` for files.
