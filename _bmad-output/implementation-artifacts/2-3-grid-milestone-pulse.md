---
story_id: '2-3-grid-milestone-pulse'
epic_id: 'epic-2'
title: 'Grid Milestone Pulse'
status: 'ready-for-dev'
---

# Story 2.3: Grid Milestone Pulse

## Goal
Implement a dynamic visual effect where the entire grid pulsing in sync with level milestones or major clears (Tetris).

## Acceptance Criteria
- [ ] Logic exists in logic/engine or renderer to detect "Major Event" (Level Up or 4-Line Clear).
- [ ] A `PulseEffect` class or similar mechanism exists in `src/renderer/fx.ts` (new file).
- [ ] The pulse effect overrides/modifies the grid border color or background momentarily.
- [ ] The effect decays over time (e.g., 500ms).
- [ ] The pulse is triggered via the Event Emitter (start decoupling Engine signals).

## Implementation Notes
- Add a basic `EventEmitter` or `Subject` pattern to the engine so the renderer can subscribe to `onLevelUp` or `onLineClear`.
- This ensures the View reacts to the Model without the Model knowing about the View.
