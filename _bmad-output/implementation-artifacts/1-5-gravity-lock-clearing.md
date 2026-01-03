---
story_id: '1-5-gravity-lock-clearing'
epic_id: 'epic-1'
title: 'Gravity, Lock, and Clearing'
status: 'ready-for-dev'
---

# Story 1.5: Gravity, Lock, and Clearing

## Goal
Implement the core game loop logic: gravity progression, piece locking, and line clearing matching the "Purist" constraints.

## Acceptance Criteria
- [ ] Logic for gravity (automatic downward movement) exists.
- [ ] Logic for locking a piece when it hits the floor or obstacles.
- [ ] Logic for detecting full rows and clearing them from the grid.
- [ ] Logic for shifting remaining rows down after a clear.
- [ ] Unit tests in `src/logic/engine.test.ts` verify the full lock-and-clear cycle.

## Implementation Notes
- Use a `lockDelay` of 500ms (standard classic feel).
- Line clears should update a score variable (standard scoring: 40, 100, 300, 1200).
- Adhere to the `kebab-case` for files.
