status: 'done'
---

# Story 4.4: Simulation Practice Lab

## Goal
Implement a "Practice Mode" (or Simulation Lab) that allows players to manipulate game parameters for training purposes. This mode must not pollute the main high scores or unlock milestones.

## Acceptance Criteria
- [x] Add "Practice Mode" toggle to the UI (Pause Menu or Main HUD).
- [x] Implement Level Selector (1-20).
- [x] Implement "God Mode" (Invincibility / No Lock) or custom gravity control.
- [x] Update `TetrisEngine` to support parameter overrides.
- [x] **Critical:** Disable Milestone tracking and Score persistence while in Practice Mode.
- [x] visual indicator that Practice Mode is ACTIVE (e.g., "SIMULATION" watermark).

## Implementation Notes
- Modify `GameState` schema to include `gameMode: 'ranked' | 'practice'`.
- `MilestoneManager.check()` should abort if `gameMode === 'practice'`.
- UI: Add a "Lab" panel in the DOM overlays.
