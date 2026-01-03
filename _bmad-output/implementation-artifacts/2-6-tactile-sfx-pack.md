status: 'done'
---

# Story 2.6: Tactile SFX Pack

## Goal
Implement a set of synthesized sound effects for key game interactions to enhance tactile feedback.

## Acceptance Criteria
- [x] `AudioEngine` extended with a `playSFX(type)` method.
- [x] SFX Type: 'move' (Current: High-pass click/blip).
- [x] SFX Type: 'rotate' (Current: Short resonant sweep).
- [x] SFX Type: 'lock' (Current: Low thud/impact).
- [x] SFX Type: 'line-clear' (Current: Bright, ascending chime).
- [x] All SFX are procedurally generated (using Oscillators/Envelopes) to maintain the "no assets" rule.
- [x] Connect SFX to Game Events in `main.ts`.

## Implementation Notes
- Use `gainNode.gain.exponentialRampToValueAtTime` for envelopes (Attack/Decay).
- 'Lock' sound should have more bass/body.
- 'Line Clear' can use a small chord or arpeggio.
