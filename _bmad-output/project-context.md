---
project_name: 'bamd'
user_name: 'AZ'
date: '2026-01-03'
sections_completed: ['technology_stack', 'language_rules', 'code_quality', 'dont_miss_rules', 'framework_rules', 'testing_rules', 'workflow_rules']
status: 'complete'
rule_count: 14
optimized_for_llm: true
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

- **Build Tool:** Vite (@latest)
- **Language:** TypeScript (Strict Mode)
- **Engine Foundation:** Vanilla-TS (No framework overhead)
- **Rendering:** HTML5 Canvas 2D API
- **Persistence:** LocalStorage + Zod (for schema validation)
- **Infrastructure:** Vercel

## Critical Implementation Rules

### 1. Mechanical Purity (Rotation Rules)
- **Constraint:** ABSOLUTELY NO wall-kicks, floor-kicks, or SRS-style assists.
- **Logic:** If a rotation causes a collision with the grid or another piece, the rotation is simply blocked.

### 2. Coordinate System
- **Grid:** 10x20 standard Tetris grid.
- **Origin (0,0):** The top-left corner of the grid.
- **Orientation:** X increases to the right, Y increases downward.

### 3. High-Precision Engine
- **Loop:** Use `requestAnimationFrame` with a **Fixed Timestep** accumulator.
- **Target:** Locked 60fps physics regardless of display refresh rate.

### 4. Decoupled "Vibe" System
- **Pattern:** Use a centralized **Event Emitter** for all sensory feedback.
- **Flow:** Core logic emits events (e.g., `PIECE_LOCKED`); audio and visual effects (screen shakes, neon pulses) subscribe to these events.
- **Audio:** Use native Web Audio API for industrial generative sound.

### 5. TypeScript & Error Patterns
- **Strictness:** No `any` allowed. Use explicit types for all engine structures.
- **Named Exports:** Do NOT use `export default`. Use named exports for all classes and functions.
- **Errors:** Use custom classes extending `TetrisVibeError`. Never throw raw strings.

### 6. Code Style & Organization
- **Separation:** `src/logic/` is pure math/logic. No `window`, `document`, or `canvas` references allowed.
- **Naming:** kebab-case for files, PascalCase for classes, camelCase for methods/properties.
- **Persistence:** Every Disk-Read from `localStorage` **must** be validated via **Zod** schema before entering the engine state.

### 7. Critical "Don't-Miss" Rules
- **Anti-Pattern:** Never use `Math.random()` in core logic. Always use the `SeededPRNG` utility.
- **Edge Case:** Listen for `visibilitychange`. On `hidden`, the game must instantly pause and trigger a survival auto-save ritual to `localStorage`.
- **Performance:** All Canvas draw calls must be wrapped in the high-precision fixed timestep accumulator to prevent jitter.

---

## Usage Guidelines

**For AI Agents:**

- Read this file before implementing any code.
- Follow ALL rules exactly as documented.
- When in doubt, prefer the more restrictive option (e.g., block the rotation).
- Update this file if new patterns emerge during implementation.

**For Humans:**

- Keep this file lean and focused on agent needs.
- Update when technology stack changes.
- Review quarterly for outdated rules.
- Remove rules that become obvious over time.

_Last Updated: 2026-01-03_
