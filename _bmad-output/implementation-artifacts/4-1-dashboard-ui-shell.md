status: 'done'
---

# Story 4.1: Dashboard UI Shell

## Goal
Establish the visual framework for the "Meta-Game". This involves creating a persistent UI layer that sits above the canvas, displaying the "Vibe Dashboard" (Score, Level, Upcoming Milestones).

## Acceptance Criteria
- [x] Create a static HTML/CSS overlay structure in `index.html`.
- [x] Use a cyberpunk/glassmorphism aesthetic (consistent with `style.css`).
- [x] Sections for:
    - [x] Current Score / High Score.
    - [x] Current Level.
    - [x] "Pulse Gauge" (Visual representation of lines until next level).
- [x] Update `main.ts` to update DOM elements instead of drawing text on Canvas (separation of UI and Game Render).

## Implementation Notes
- Use absolute positioning over the canvas.
- Use CSS variables for neon colors.
- Remove the debug text rendering from `src/main.ts`.
