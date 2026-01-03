status: 'done'
---

# Story 2.2: Piece Glow Rendering

## Goal
Implement the Neon Glow rendering system for the grid, active pieces, and ghost pieces.

## Acceptance Criteria
- [x] A color palette map exists for the 7 piece types (Neon Blue, Purple, Green, etc.).
- [x] The `CanvasRenderer` can draw the 10x20 grid with subtle cell borders.
- [x] Logic exists to draw the `currentPiece` at its current `(x, y)` position.
- [x] Pieces are rendered with a `shadowBlur` or specialized glow effect.
- [x] A "Ghost Piece" is calculated and rendered to show where the piece will land.
- [x] Locked blocks on the grid are rendered with the same glow intensity.

## Implementation Notes
- Use `ctx.shadowBlur` and `ctx.shadowColor` for the glow.
- Ghost piece should be semi-transparent (alpha 0.3) and have a distinct outline or fainter glow.
- The grid background should be subtle to not outshine the pieces.
