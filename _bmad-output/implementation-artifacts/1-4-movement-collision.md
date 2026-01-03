---
story_id: '1-4-movement-collision'
epic_id: 'epic-1'
title: 'Movement and Collision'
status: 'ready-for-dev'
---

# Story 1.4: Movement and Collision

## Goal
Implement piece movement logic and high-precision collision detection against the grid boundaries and existing blocks.

## Acceptance Criteria
- [ ] Logic for moving pieces (left, right, down) exists.
- [ ] Collision detection prevents pieces from moving through walls or floor.
- [ ] Collision detection prevents pieces from overlapping with blocks already on the grid.
- [ ] Collision detection is used to validate rotations (supporting the "No-Kick" rule).
- [ ] Unit tests in `src/logic/movement.test.ts` verify all movement and collision scenarios.

## Implementation Notes
- This logic should be decoupled from the rendering loop. 
- The collision check should take a `Grid` and a `Piece` (or its blocks) as input.
- Adhere to the `kebab-case` for files.
