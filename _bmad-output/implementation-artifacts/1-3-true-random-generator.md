status: 'done'
---

# Story 1.3: True Random Generator

## Goal
Implement a "True Random" piece generator specifically rejecting the modern "7-bag" system to maintain mechanical authenticity.

## Acceptance Criteria
- [x] A `RandomGenerator` class or utility exists in `src/logic/random.ts`.
- [x] The generator uses a simple random selection from the 7 piece types.
- [x] No "7-bag" or modern fairness algorithms are present.
- [x] Supports seeding for the "Chronos" time-synced play (Epic 3 hook).
- [x] Unit tests in `src/logic/random.test.ts` verify the uniform distribution over a large sample.

## Implementation Notes
- Use `seedrandom` library for deterministic seeding.
- The default seed should be derived from the current hour/date string for shared parity.
- Adhere to the `kebab-case` for files.
