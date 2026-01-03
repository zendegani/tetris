status: 'done'
---

# Story 3.2: Visibility Auto-Pause

## Goal
Implement a system that automatically pauses the game engine when the browser tab loses focus or visibility, ensuring the game doesn't play itself while the user is away.

## Acceptance Criteria
- [x] Listens for `document.visibilitychange` events in `main.ts` or a dedicated `InputManager`.
- [x] Pauses the `TetrisEngine` (sets state to `paused`) when the document becomes hidden.
- [x] *Optionally* resumes when visible, or (safer design) keeps it paused until user explicitly resumes.
- [x] Mutes/suspend the `AudioEngine` context when hidden to be a good browser citizen.
- [x] Shows a "Game Paused" text or overlay when in this state.

## Implementation Notes
- The `TetrisEngine` already has a `state` property ('playing' | 'paused' | 'game-over').
- `AudioContext` has `suspend()` and `resume()` methods.
- We might need a generic `game.pause()` helper in `main.ts` to coordinate both Engine and Audio.
