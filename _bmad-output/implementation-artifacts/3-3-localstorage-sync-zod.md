---
story_id: '3-3-localstorage-sync-zod'
epic_id: 'epic-3'
title: 'LocalStorage Sync with Zod'
status: 'ready-for-dev'
---

# Story 3.3: LocalStorage Sync with Zod

## Goal
Implement a robust state persistence layer that adheres to strict validation rules (using Zod) to prevent corrupted data from crashing the app upon reload.

## Acceptance Criteria
- [ ] Install `zod` dependency.
- [ ] Define Zod schemas for `GameState`, `GridState`, and `PlayerStats`.
- [ ] Create a `PersistenceManager` or `SettingsService` class.
- [ ] Implement `saveState(key, data)` that serializes data to LocalStorage.
- [ ] Implement `loadState(key, schema)` that retrieves and validates data via Zod.
- [ ] If validation fails, it should gracefully fallback to default values (and maybe log the error).

## Implementation Notes
- Do not blindly trust `JSON.parse`.
- Schema example:
  ```typescript
  const GameStateSchema = z.object({
    score: z.number().min(0),
    level: z.number().min(1),
    linesCleared: z.number().min(0),
    seed: z.number(), // Important for PRNG hot-resume
    // ...
  });
  ```
