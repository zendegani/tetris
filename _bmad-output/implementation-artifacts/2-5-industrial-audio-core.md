---
story_id: '2-5-industrial-audio-core'
epic_id: 'epic-2'
title: 'Industrial Audio Core'
status: 'ready-for-dev'
---

# Story 2.5: Industrial Audio Core

## Goal
Establish the audio engine, implementing a basic synthesized background hum or drone and a system for triggering sound effects.

## Acceptance Criteria
- [ ] An `AudioEngine` class exists in `src/audio/engine.ts`.
- [ ] It uses the Web Audio API (`AudioContext`).
- [ ] A "Dark Industrial" drone starts playing when the user interacts (browsers require user gesture).
- [ ] The drone is synthesized using oscillators/filters to avoid large assets.
- [ ] Volume management (Master/Music/SFX) is implemented.

## Implementation Notes
- Use a `Singleton` pattern or pass the engine instance around.
- Web Audio API `AudioContext` starts in suspended state; add a resume handler on first keydown or click.
- Drone Idea: Low frequency Sawtooth wave + Lowpass Filter + LFO on filter cutoff.
