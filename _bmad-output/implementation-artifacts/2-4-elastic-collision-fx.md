---
story_id: '2-4-elastic-collision-fx'
epic_id: 'epic-2'
title: 'Elastic Collision FX'
status: 'ready-for-dev'
---

# Story 2.4: Elastic Collision FX

## Goal
Implement the "Elastic Physics" visual feedback where the grid or pieces dampen/shake slightly upon locking or hard dropping.

## Acceptance Criteria
- [ ] A `ShakeEffect` class exists in `src/renderer/shake.ts` or part of `fx.ts`.
- [ ] The shake effect applies a small random X/Y offset to the `CanvasRenderer` context.
- [ ] The shake intensity is proportional to the impact (e.g., higher for Hard Drop vs Soft Drop).
- [ ] The effect decays rapidly (short duration, e.g., 200ms).
- [ ] Connected to the `lock` event from the engine.
- [ ] Screen Shake can be disabled via a simple toggle (accessibility).

## Implementation Notes
- Modify `CanvasRenderer` to apply `ctx.translate(shakeX, shakeY)` before drawing and restore after.
- Listen for `lock` event. Maybe later `hard-drop` event if we implement hard drop.
