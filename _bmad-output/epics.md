# Tetris-Vibe - Development Epics

## Epic Overview

| # | Epic Name | Scope | Dependencies | Est. Stories |
| :--- | :--- | :--- | :--- | :--- |
| 1 | **The Purist Engine** | Core 10x20 grid, True Random, Strict Rotation, Linear Gravity | None | 6 |
| 2 | **Sensory Vibe** | Neon visuals, "Thud" physics, Industrial Dynamic Audio | Epic 1 | 8 |
| 3 | **Chronos Persistence** | Seeded sequence gen, Page-visibility auto-save/resume | Epic 2 | 5 |
| 4 | **Command Center** | Dashboard UI, Milestone Unlocks, Simulation Lab Training | Epic 3 | 7 |

---

## Epic 1: The Purist Engine (Vertical Slice)

### Goal
Establish the non-negotiable "Mechanical Purity" of the classic engine.

### Scope
**Includes:**
- 10x20 Grid state management.
- 7 classic piece definitions (I, J, L, O, S, T, Z).
- True Random piece generator (no 7-bag).
- Strict Rotation logic (Rotation fails if blocked by walls/pieces).
- Movement and collision detection.
- Soft/Hard Drop logic.

**Excludes:**
- Neon aesthetics, glow effects, or complex UI.
- Sound effects and music.

### Dependencies
None.

### Deliverable
A functional, "grey-box" Tetris that satisfies all "Purist" constraints and proves the core gameplay loop.

---

## Epic 2: Sensory Vibe

### Goal
Implement the "Dark Tech" aesthetic and tactile weight to fulfill the "Tactile Impact" pillar.

### Scope
**Includes:**
- High-fidelity Neon rendering (HTML5 Canvas).
- "Elastic Physics" (50ms screen shake and frame squash on landing).
- Pulsing grid visuals based on level.
- Multi-layered Industrial OST and impactful sound effects (thuds, clears).

**Excludes:**
- Menus, persistence, or seeded play.

### Dependencies
Epic 1: The Purist Engine.

### Deliverable
High-fidelity gameplay where every placement has sensory weight and immersion.

---

## Epic 3: Chronos Persistence

### Goal
Create the "Unbreakable Session" and time-linked seeded competitive loop.

### Scope
**Includes:**
- Chronos Seed Synced generator (Seed changes based on system time).
- `visibilitychange` auto-save implementation.
- `localStorage` state synchronization (Piece, Grid, Score, Seed, Time).
- Session "Hot Resume" logic.

**Excludes:**
- Palette unlocks or advanced UI.

### Dependencies
Epic 2: Sensory Vibe.

### Deliverable
A web session that can be closed and resumed instantly, with all players synced to the same chronological seed.

---

## Epic 4: Command Center & Mastery

### Goal
Wrap the engine in a premium meta-progression layer for long-term engagement.

### Scope
**Includes:**
- The Command Center (Main Dashboard UI).
- Career Milestone tracking (Total lines, Shift survival streaks).
- Neon Palette selection and unlock logic.
- The Simulation Lab (interactive strict-rotation practice rooms).

**Excludes:**
- Features outside the "V1" browser target.

### Dependencies
Epic 3: Chronos Persistence.

### Deliverable
The final commercial-grade application with full progression and reward loops.
