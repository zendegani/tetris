---
story_id: '4-2-milestone-tracking'
epic_id: 'epic-4'
title: 'Milestone Tracking'
status: 'ready-for-dev'
---

# Story 4.2: Milestone Tracking System

## Goal
Implement a system to track user "Milestones" (achievements). These milestones will eventually unlock new color palettes (`Story 4.3`).

## Acceptance Criteria
- [ ] Define `Milestone` interface (id, name, description, requirement function, isUnlocked).
- [ ] Create `MilestoneManager` in `src/logic/milestones.ts`.
- [ ] Implement initial milestones:
    - [ ] "First Contact": Clear 1 line.
    - [ ] "High Flyer": Reach Level 5.
    - [ ] "Tetris Master": Clear 4 lines at once (Tetris).
- [ ] Bind `MilestoneManager` to game events (`line-clear`, `level-up`).
- [ ] Persist unlocked milestones using `PersistenceManager`.
- [ ] Add visual notification (toast/snackbar) via `UIManager` when a milestone is unlocked.

## Implementation Notes
- Milestones should be checked on every relevant event.
- Use `PersistenceManager` to save an array of unlocked IDs.
- Create a `Toast` component in CSS/HTML for the notification.
