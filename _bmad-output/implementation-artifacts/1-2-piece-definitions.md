status: 'done'
---

# Story 1.2: Piece Definitions

## Goal
Implement the 7 classic Tetromino definitions with strict rotation data.

## Acceptance Criteria
- [x] A `Piece` class or type system exists in `src/logic/piece.ts`.
- [x] All 7 standard pieces (I, J, L, O, S, T, Z) are defined.
- [x] Each piece has 4 rotation states (pre-calculated matrices).
- [x] Rotation logic is "Strict": Piece either exists in a state or fails to swap (no kicks).
- [x] Unit tests in `src/logic/piece.test.ts` verify all 7 pieces and their rotation boundaries.

## Implementation Notes
- Use the standard 10x20 grid mapping.
- Pieces should have unique IDs (1-7) for rendering differentiation.
- Adhere to the `kebab-case` for files.
