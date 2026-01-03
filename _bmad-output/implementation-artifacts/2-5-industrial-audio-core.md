status: 'done'
---

# Story 2.5: Industrial Audio Core

## Goal
Establish the audio engine, implementing a basic synthesized background hum or drone and a system for triggering sound effects.

## Acceptance Criteria
- [x] An `AudioEngine` class exists in `src/audio/engine.ts`.
- [x] It uses the Web Audio API (`AudioContext`).
- [x] A "Dark Industrial" drone starts playing when the user interacts (browsers require user gesture).
- [x] The drone is synthesized using oscillators/filters to avoid large assets.
- [x] Volume management (Master/Music/SFX) is implemented.

## Implementation Notes
- Use a `Singleton` pattern or pass the engine instance around.
- Web Audio API `AudioContext` starts in suspended state; add a resume handler on first keydown or click.
- Drone Idea: Low frequency Sawtooth wave + Lowpass Filter + LFO on filter cutoff.
