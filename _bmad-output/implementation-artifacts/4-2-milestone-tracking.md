status: 'done'
---

# Story 4.2: Milestone Tracking System

## Goal
Implement a system to track user "Milestones" (achievements). These milestones will eventually unlock new color palettes (`Story 4.3`).

## Acceptance Criteria
- [x] Define `Milestone` interface (id, name, description, requirement function, isUnlocked).
- [x] Create `MilestoneManager` in `src/logic/milestones.ts`.
- [x] Implement initial milestones:
    - [x] "First Contact": Clear 1 line.
    - [x] "High Flyer": Reach Level 5.
    - [x] "Tetris Master": Clear 4 lines at once (Tetris).
- [x] Bind `MilestoneManager` to game events (`line-clear`, `level-up`).
- [x] Persist unlocked milestones using `PersistenceManager`.
- [x] Add visual notification (toast/snackbar) via `UIManager` when a milestone is unlocked.

## Implementation Notes
- Milestones should be checked on every relevant event.
- Use `PersistenceManager` to save an array of unlocked IDs.
- Create a `Toast` component in CSS/HTML for the notification.
