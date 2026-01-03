status: 'done'
---

# Story 3.3: LocalStorage Sync with Zod

## Goal
Implement a robust state persistence layer that adheres to strict validation rules (using Zod) to prevent corrupted data from crashing the app upon reload.

## Acceptance Criteria
- [x] Install `zod` dependency.
- [x] Define Zod schemas for `GameState`, `GridState`, and `PlayerStats`.
- [x] Create a `PersistenceManager` or `SettingsService` class.
- [x] Implement `saveState(key, data)` that serializes data to LocalStorage.
- [x] Implement `loadState(key, schema)` that retrieves and validates data via Zod.
- [x] If validation fails, it should gracefully fallback to default values (and maybe log the error).

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
