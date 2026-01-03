---
story_id: '4-1-dashboard-ui-shell'
epic_id: 'epic-4'
title: 'Dashboard UI Shell'
status: 'ready-for-dev'
---

# Story 4.1: Dashboard UI Shell

## Goal
Establish the visual framework for the "Meta-Game". This involves creating a persistent UI layer that sits above the canvas, displaying the "Vibe Dashboard" (Score, Level, Upcoming Milestones).

## Acceptance Criteria
- [ ] Create a static HTML/CSS overlay structure in `index.html`.
- [ ] Use a cyberpunk/glassmorphism aesthetic (consistent with `style.css`).
- [ ] Sections for:
    - [ ] Current Score / High Score.
    - [ ] Current Level.
    - [ ] "Pulse Gauge" (Visual representation of lines until next level).
- [ ] Update `main.ts` to update DOM elements instead of drawing text on Canvas (separation of UI and Game Render).

## Implementation Notes
- Use absolute positioning over the canvas.
- Use CSS variables for neon colors.
- Remove the debug text rendering from `src/main.ts`.
