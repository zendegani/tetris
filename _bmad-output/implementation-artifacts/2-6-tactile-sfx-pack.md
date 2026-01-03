---
story_id: '2-6-tactile-sfx-pack'
epic_id: 'epic-2'
title: 'Tactile SFX Pack'
status: 'ready-for-dev'
---

# Story 2.6: Tactile SFX Pack

## Goal
Implement a set of synthesized sound effects for key game interactions to enhance tactile feedback.

## Acceptance Criteria
- [ ] `AudioEngine` extended with a `playSFX(type)` method.
- [ ] SFX Type: 'move' (Current: High-pass click/blip).
- [ ] SFX Type: 'rotate' (Current: Short resonant sweep).
- [ ] SFX Type: 'lock' (Current: Low thud/impact).
- [ ] SFX Type: 'line-clear' (Current: Bright, ascending chime).
- [ ] All SFX are procedurally generated (using Oscillators/Envelopes) to maintain the "no assets" rule.
- [ ] Connect SFX to Game Events in `main.ts`.

## Implementation Notes
- Use `gainNode.gain.exponentialRampToValueAtTime` for envelopes (Attack/Decay).
- 'Lock' sound should have more bass/body.
- 'Line Clear' can use a small chord or arpeggio.
