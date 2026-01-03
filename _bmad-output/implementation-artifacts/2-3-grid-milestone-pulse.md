status: 'done'
---

# Story 2.3: Grid Milestone Pulse

## Goal
Implement a dynamic visual effect where the entire grid pulsing in sync with level milestones or major clears (Tetris).

## Acceptance Criteria
- [x] Logic exists in logic/engine or renderer to detect "Major Event" (Level Up or 4-Line Clear).
- [x] A `PulseEffect` class or similar mechanism exists in `src/renderer/fx.ts` (new file).
- [x] The pulse effect overrides/modifies the grid border color or background momentarily.
- [x] The effect decays over time (e.g., 500ms).
- [x] The pulse is triggered via the Event Emitter (start decoupling Engine signals).

## Implementation Notes
- Add a basic `EventEmitter` or `Subject` pattern to the engine so the renderer can subscribe to `onLevelUp` or `onLineClear`.
- This ensures the View reacts to the Model without the Model knowing about the View.
