status: 'done'
---

# Story 3.1: Seeded PRNG Utility

## Goal
Implement a robust, seeded pseudo-random number generator (PRNG) to ensure game determinism. This is crucial for validation and replays.

## Acceptance Criteria
- [x] A `SeededRandom` (implemented as `RandomGenerator` refactor) class exists in `src/logic/random.ts`.
- [x] Uses a standard algorithm (Mulberry32) for better distribution than `Math.random()`.
- [x] Must accept a string or number seed.
- [x] Must produce the exact same sequence of numbers for the same seed.
- [x] Update `TetrisEngine` to strictly use this new PRNG for piece generation.

## Implementation Notes
- The current `RandomGenerator` might wrap `Math.random` or use a simple seed. Refactor it to implementing Mulberry32.
- `mulberry32(seed)`: Returns a function that generates numbers between 0-1.
- Ensure state can be saved/restored if needed (passed as serializable data).
