status: 'done'
---

# Story 2.4: Elastic Collision FX

## Goal
Implement the "Elastic Physics" visual feedback where the grid or pieces dampen/shake slightly upon locking or hard dropping.

## Acceptance Criteria
- [x] A `ShakeEffect` class exists in `src/renderer/shake.ts` or part of `fx.ts`.
- [x] The shake effect applies a small random X/Y offset to the `CanvasRenderer` context.
- [x] The shake intensity is proportional to the impact (e.g., higher for Hard Drop vs Soft Drop).
- [x] The effect decays rapidly (short duration, e.g., 200ms).
- [x] Connected to the `lock` event from the engine.
- [x] Screen Shake can be disabled via a simple toggle (accessibility).

## Implementation Notes
- Modify `CanvasRenderer` to apply `ctx.translate(shakeX, shakeY)` before drawing and restore after.
- Listen for `lock` event. Maybe later `hard-drop` event if we implement hard drop.
