# Implementation Plan - Tetris-Vibe (Purist-Classic)

This plan outlines the development of a premium, high-performance Tetris application with a **Dark Tech / Cyberpunk** aesthetic and a **Purist-Classic** mechanical core.

## 🛠️ Tech Stack
- **Build Tool:** Vite
- **Language:** TypeScript (Strict)
- **Styling:** Tailwind CSS (for UI) + HTML5 Canvas (for game board)
- **State Management:** Functional Core with Local Storage Persistence
- **Deployment:** Vercel

## 🟦 Phase 1: Project Foundation & Core Engine
- [ ] Initialize Vite project in `tetris-vibe/`.
- [ ] Implement `SeedRandomizer`: A deterministic PRNG using the current date.
- [ ] Implement `TetrisEngine`:
    - Define 10x20 grid system.
    - Implement strict rotation matrices for all 7 Tetrominoes.
    - Implement collision detection (no wall-kicks).
    - Implement the Game Loop (Stepped gravity & Lock Delay).

## 🟨 Phase 2: Persistence & Infrastructure
- [ ] Create `StorageService`:
    - JSON serialization of the full game state.
    - `onVisibilityChange` auto-save logic.
- [ ] Build `SplashLauncher`:
    - High-contrast "Vibe" start screen.
    - Resume vs. New Game branching logic.

## 🟩 Phase 3: Visual Identity & "Dark Tech" Renderer
- [ ] Set up `CanvasRenderer`:
    - Neon glow effects (`shadowBlur`).
    - Pulsing grid animation (subtle CSS + Canvas overlay).
    - **Elastic Physics:** Screen-shake and block-squash on landing.
- [ ] Integrate Synth-Tech Audio:
    - Web Audio API for industrial thuds.
    - Pitch-shifting based on current level.

## 🟥 Phase 4: UI & Polish
- [ ] **Standard UX Layout:** Professional, clean dashboard with stats.
- [ ] **Session Timeline:** End-of-game performance visualization.
- [ ] CI/CD Setup: Configure Vercel for instant deployment on push.

## 🧪 Testing Strategy
- Unit tests for `isValidMove` and `rotate` logic using Vitest.
- Visual regression check for the neon aesthetic.

## 🚀 Constraints & Rules
- **No Glassmorphism:** Deep blacks (#050505) and neon contrast only.
- **Classic Feel:** True Random + No Wall-Kicks.
- **Persistence:** Game must resume exactly where it left off.
