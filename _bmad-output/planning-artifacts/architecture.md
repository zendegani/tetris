---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
  - '_bmad-output/gdd.md'
  - '_bmad-output/epics.md'
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/analysis/brainstorming-session-2026-01-02.md'
workflowType: 'architecture'
project_name: 'bamd'
user_name: 'AZ'
date: '2026-01-03'
lastStep: 8
status: 'complete'
completedAt: '2026-01-03'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

---

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
- High-precision Tetris engine with **True Random** generation and **Strict Rotation (No-Kick)** rules.
- **Chronos Seed** system for time-dependent shared sequences across all players.
- **Elastic Physics** providing tactile weight through screen shakes and block squashes.
- Multi-layered **Industrial Focus Drone** audio that adapts to player progression.
- **Command Center** dashboard for managing shifts and unlocking meta-rewards (Neon Palettes).

**Non-Functional Requirements:**
- **Locked 60fps Performance:** Frame stability is a hard requirement for competitive parity.
- **Sub-500ms Load Time:** Optimized initial payload for "Instant-Play" sessions.
- **Invisible Persistence:** Unbreakable sessions that deep-save to localStorage on tab-blur/visibility change.
- **Mobile-First Accessibility (N/A):** Desktop-only keyboard-first focus simplifies input handling but requires high keyboard responsiveness.

**Scale & Complexity:**
- Primary domain: Web / HTML5 Canvas
- Complexity level: Medium (High-precision constraints + dynamic audio/visual feedback)
- Estimated architectural components: 4 core modules (Engine, Vibe/FX, Persistence/Store, Dashboard)

### Technical Constraints & Dependencies
- **Browser-Native:** Reliance on `requestAnimationFrame`, `localStorage`, and the `Web Audio API`.
- **Clock Dependency:** Players must have reasonably synced system clocks for Seed parity.
- **Vite/TypeScript:** Build tooling choice from the GDD.

### Cross-Cutting Concerns Identified
- **State Lifecycle:** Managing the transition between active play, paused state, and localStorage persistence without losing frame data.
- **Seed Parity:** Ensuring the pseudo-random generator is truly deterministic across platforms given a seed.
- **Asset Buffering:** Ensuring the ~2MB build size doesn't block the instant-load goal.

---

## Starter Template Evaluation

### Primary Technology Domain

**Web Application (Game)** based on project requirements analysis.

### Starter Options Considered

- **create-vite (vanilla-ts):** Lightweight, zero-overhead foundation. Perfect for "Mechanical Purity" and raw Canvas manipulation.
- **create-vite (react-ts):** Added overhead of a virtual DOM. Good for complex UIs but potentially overkill for a purist engine.

### Selected Starter: create-vite (vanilla-ts)

**Rationale for Selection:**
To fulfill the **Mechanical Purity** and **Locked 60fps** pillars, we need direct, unmediated access to the HTML5 Canvas API. React or other frameworks introduce an abstraction layer that is unnecessary for the core game loop and could impact frame consistency.

**Initialization Command:**

```bash
npx create-vite@latest ./ --template vanilla-ts
```

**Architectural Decisions Provided by Starter:**

- **Language & Runtime:** TypeScript (Strict) with Vite's optimized build pipelines.
- **Styling Solution:** Standard CSS/PostCSS for dashboard overlays.
- **Build Tooling:** Vite with HMR for rapid physics tuning.
- **Code Organization:** Flat, performant structure that avoids framework-specific lifecycle overhead.
- **Development Experience:** Sub-second startup and optimized production bundling.

**Note:** Project initialization using this command should be the first implementation story.

---

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- **Seeded PRNG:** Use of a deterministic random number generator (e.g., `seedrandom`) to ensure "Chronos Seed" parity across all players.
- **Fixed Timestep Engine:** Implementation of a high-precision game loop to guarantee 60fps mechanical behavior regardless of monitor refresh rates.

**Important Decisions (Shape Architecture):**
- **Class-Based State:** Using raw TypeScript classes for game state management to avoid the overhead of modern reactive frameworks during 60fps canvas rendering.
- **Zod Validation:** Schema-first validation for the "Invisible Persistence" layer to prevent save data corruption.

### Data Architecture

- **State Schema:** Zod-defined schema for the `GameState` (Grid, Current Piece, Score, Level, Time).
- **Seeded PRNG:** Deterministic sequence generation fueled by the **Chronos Seed** (time-synced).
- **Persistence:** JSON-serialized state stored in `localStorage`, validated by Zod on every "Hot Resume."

### Frontend Architecture

- **Game Loop:** `requestAnimationFrame` with a fixed delta accumulator to decouple physics from rendering.
- **Render Engine:** Direct HTML5 Canvas 2D API for the grid; CSS/SVG for the Command Center dashboard.
- **State Pattern:** Singleton or Class-based `Game` controller managing the lifecycle between active play and persistence.

### Infrastructure & Deployment

- **Hosting:** **Vercel** for globally distributed, low-latency web access.
- **CI/CD:** Automated builds via GitHub Actions on every push to main.

### Decision Impact Analysis

**Implementation Sequence:**
1. Initialize Vite project.
2. Implement Seeded PRNG and Grid Logic classes.
3. Build the Fixed Timestep loop.
4. Integrate persistence and UI overlays.

**Cross-Component Dependencies:**
- The **Seeded PRNG** is a dependency for the **Engine** initialization.
- The **Persistence** layer depends on the **State Schema** (Zod).

---

## Implementation Patterns & Consistency Rules

### Naming Patterns

- **File Naming:** Use **kebab-case** for all source files (e.g., `game-engine.ts`, `render-utils.ts`).
- **Code Naming:** Use **PascalCase** for Classes and **camelCase** for variables, functions, and properties.
- **Coordinate System:** Use `(x, y)` grid units where `(0,0)` is the **Top-Left** of the 10x20 grid.

### Structure Patterns

- **Project Organization:** Code is organized by **Type/Role** (Engine, Logic, Renderer, Store, UI).
- **Test Location:** Tests are co-located with their respective source files using `.test.ts`.

### State & Engine Patterns

- **Mutation Pattern:** **Controlled Direct Mutation** via Class methods. The `GameState` object is modified by methods like `movePiece()` to ensure performance in the 60fps loop.
- **Time Representation:** All temporal logic (Gravity cycles, Lock delays) must be calculated in **Milliseconds** (ms).
- **Separation of Concerns:** The Logic module calculates grid states; the Renderer module translates those states into Canvas draw calls.

### Communication Patterns

- **Event System:** Use a centralized **Event Emitter** for decoupling. Core Logic emits events (e.g., `GRID_CLEAR`), which the Vibe/Audio layers subscribe to.
- **Persistence Hooks:** The `Storage` module listens for `visibilitychange` window events to trigger the "Invisible Persistence" save ritual.

### Process Patterns

- **Validation Timing:** **Schema Validation (Zod)** occurs at every Disk-Read boundary (initial load and resume).
- **Error Handling:** Use custom `TetrisVibeError` classes for engine interruptions; UI notifies the system voice for "Survival Terminated" states.

### Enforcement Guidelines

**All AI Agents MUST:**
- Adhere to the **Strict-Rotation (No-Kick)** rule logic—never implement wall-kicks or SRS behavior.
- Ensure all Canvas draw calls are wrapped in the high-precision fixed timestep accumulator.
- Use the **Event Emitter** for any non-logic feedback (SFX, screen shake, neon pulses).

---

## Project Structure & Boundaries

### Complete Project Directory Structure

```text
tetris-vibe/
├── .github/workflows/ci.yml         # Vercel & Vitest integration
├── public/                          # Static assets
│   ├── sfx/                         # "Thud", "Discharge", "The System" voice
│   └── fonts/                       # "Inter" or custom terminal fonts
├── src/
│   ├── main.ts                      # App entry point & event bus init
│   ├── style.css                    # Global "Dark Tech" styles
│   ├── engine/                      # Core Game Engine
│   │   ├── loop.ts                  # Fixed Timestep (requestAnimationFrame)
│   │   ├── state.ts                 # GameState Class (Mutation methods)
│   │   └── input.ts                 # Keyboard event handling
│   ├── logic/                       # Pure Business Rules
│   │   ├── grid.ts                  # Collision & row detection
│   │   ├── piece.ts                 # Shape definitions & rotation math
│   │   └── random.ts                # Seeded PRNG (seedrandom)
│   ├── renderer/                    # Canvas Output
│   │   ├── canvas.ts                # 2D context management
│   │   └── fx.ts                    # Screen shakes & neon glows
│   ├── store/                       # Data persistence
│   │   ├── persistence.ts           # Zod-validated localStorage sync
│   │   └── schema.ts                # Zod schemas for GameState
│   └── ui/                          # Overlay Dashboards
│       ├── command-center.ts        # SVG/CSS industrial dashboard
│       └── vibe-manager.ts          # Event listening for SFX/Visual cues
├── tests/                           # Unit tests for Logic & PRNG
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### Architectural Boundaries

**API Boundaries:**
- **External:** No public web APIs for V1.
- **Internal:** Standardized `GameEvent` payload for all bus communication.

**Component Boundaries:**
- **Logic ↔ Engine:** Engine ticks, Logic computes.
- **Logic ↔ Renderer:** Logic provides grid/piece data; Renderer translates to pixel maps/effects.

**Service Boundaries:**
- **Persistence:** Isolated from the core loop; lazily synced on state-change/vis-change events.

**Data Boundaries:**
- **Seeded Random:** Isolated utility to ensure piece sequence parity.

### Requirements to Structure Mapping

- **Epic 1 (The Purist Engine):** `src/engine/`, `src/logic/`, `src/renderer/canvas.ts`.
- **Epic 2 (Sensory Vibe):** `src/renderer/fx.ts`, `src/ui/vibe-manager.ts`, `public/sfx/`.
- **Epic 3 (Chronos Persistence):** `src/store/`, `src/logic/random.ts`.
- **Epic 4 (Command Center):** `src/ui/command-center.ts`.

---

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
All primary technology choices (Vite, TypeScript, HTML5 Canvas, Web Audio API) are natively compatible and optimized for high-performance 2D web applications. There are no contradictory decisions.

**Pattern Consistency:**
The "Controlled Direct Mutation" pattern and "Event Emitter" architecture are perfectly aligned with the need for 60fps performance and decoupled "Vibe" feedback.

**Structure Alignment:**
The directory structure explicitly separates core engine logic from visual and auditory rendering, enabling granular performance optimization and easy asset management.

### Requirements Coverage Validation ✅

**Epic/Feature Coverage:**
- **The Purist Engine:** Fully supported by `src/engine/` and `src/logic/`.
- **Sensory Vibe:** Addressed by `src/renderer/fx.ts` and the global `Event Emitter`.
- **Chronos Persistence:** Covered by Zod-validated `src/store/` and Seeded PRNG.
- **Command Center:** Supported by SVG/CSS overlays in `src/ui/`.

**Functional Requirements Coverage:**
- **Strict Rotation:** Hard-coded "No-Kick" logic is enforced as a primary agent guideline.
- **Time-Synced Seeds:** Deterministic implementation via `seedrandom`.

**Non-Functional Requirements Coverage:**
- **Locked 60fps:** Handled by the **Fixed Timestep Engine**.
- **Sub-500ms Load:** Ensured by the **Vanilla-TS** starter and minimal build footprint.

### Implementation Readiness Validation ✅

**Decision Completeness:**
All critical decisions regarding random generation, state lifecycle, and loop timing are documented and ready for coding.

**Structure Completeness:**
The complete directory tree is defined down to the functional module level.

**Pattern Completeness:**
Naming conventions and coordination rules (Logic/Renderer boundary) are established to prevent agent conflicts.

### Gap Analysis Results

- **Critical Gaps:** None.
- **Improved Clarity:** Future iterations may benefit from more detailed Zod schema definitions as the state complexity grows.

### Architecture Completeness Checklist

**✅ Requirements Analysis**
- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed
- [x] Technical constraints identified
- [x] Cross-cutting concerns mapped

**✅ Architectural Decisions**
- [x] Critical decisions documented with versions
- [x] Technology stack fully specified
- [x] Integration patterns defined
- [x] Performance considerations addressed

**✅ Implementation Patterns**
- [x] Naming conventions established
- [x] Structure patterns defined
- [x] Communication patterns specified
- [x] Process patterns documented

**✅ Project Structure**
- [x] Complete directory structure defined
- [x] Component boundaries established
- [x] Integration points mapped
- [x] Requirements to structure mapping complete

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION ✅
**Confidence Level:** HIGH

---

## Architecture Completion Summary

### Workflow Completion

**Architecture Decision Workflow:** COMPLETED ✅
**Total Steps Completed:** 8
**Date Completed:** 2026-01-03
**Document Location:** _bmad-output/planning-artifacts/architecture.md

### Implementation Handoff

**For AI Agents:**
This architecture document is your complete guide for implementing **Tetris-Vibe**. Follow all decisions, patterns, and structures exactly as documented. Never deviate from the **Strict-Rotation (No-Kick)** rule.

**First Implementation Priority:**
Initialize the project using the vanilla-ts starter:
```bash
npx create-vite@latest ./ --template vanilla-ts
```

**Development Sequence:**
1. Initialize project using documented starter template.
2. Implement Seeded PRNG and Logic (Grid/Piece) foundations.
3. Build the Fixed Timestep Engine loop.
4. Integrate the aesthetic "Vibe" layers and dashboards.

---

**Architecture Status:** READY FOR IMPLEMENTATION ✅
