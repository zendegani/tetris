---
story_id: '2-2-piece-glow-rendering'
epic_id: 'epic-2'
title: 'Piece Glow Rendering'
status: 'ready-for-dev'
---

# Story 2.2: Piece Glow Rendering

## Goal
Implement the Neon Glow rendering system for the grid, active pieces, and ghost pieces.

## Acceptance Criteria
- [ ] A color palette map exists for the 7 piece types (Neon Blue, Purple, Green, etc.).
- [ ] The `CanvasRenderer` can draw the 10x20 grid with subtle cell borders.
- [ ] Logic exists to draw the `currentPiece` at its current `(x, y)` position.
- [ ] Pieces are rendered with a `shadowBlur` or specialized glow effect.
- [ ] A "Ghost Piece" is calculated and rendered to show where the piece will land.
- [ ] Locked blocks on the grid are rendered with the same glow intensity.

## Implementation Notes
- Use `ctx.shadowBlur` and `ctx.shadowColor` for the glow.
- Ghost piece should be semi-transparent (alpha 0.3) and have a distinct outline or fainter glow.
- The grid background should be subtle to not outshine the pieces.
