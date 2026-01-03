---
story_id: '3-4-session-hot-resume'
epic_id: 'epic-3'
title: 'Session Hot-Resume'
status: 'ready-for-dev'
---

# Story 3.4: Session Hot-Resume

## Goal
Implement functionality to automatically save the game state on every change (or periodically) and restore it exactly when the session resumes, allowing players to close the browser and continue later seamlessly.

## Acceptance Criteria
- [ ] Bind `PersistenceManager.save()` to the `TetrisEngine` state changes (lock, level-up, or debounced update).
- [ ] Update `main.ts` to check `PersistenceManager.load()` on initialization.
- [ ] If save part exists, restore the `TetrisEngine` state (grid, score, pieces, seed).
- [ ] Ensure the game resumes in `paused` state to avoid instant death.
- [ ] Add a "Reset Game" button (keyboard shortcut 'R' or UI) to clear save and start fresh.

## Implementation Notes
- Engine needs `serialize()` and `deserialize(state)` methods.
- Save operations should be debounced or only happen on "meaningful" events (piece lock) to avoid localstorage thrashing (though LS is synchronous and fast).
- `AudioEngine` state doesn't need to be saved, just volume preferences (optional).
