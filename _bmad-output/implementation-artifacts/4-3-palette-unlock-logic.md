---
story_id: '4-3-palette-unlock-logic'
epic_id: 'epic-4'
title: 'Palette Unlock Logic'
status: 'ready-for-dev'
---

# Story 4.3: Palette Unlock Logic

## Goal
Connect the `MilestoneManager` to the visual system. When specific milestones are unlocked, new color palettes (themes) should become available for the user to select.

## Acceptance Criteria
- [ ] Create `ThemeManager` (or `PaletteManager`) in `src/renderer/themes.ts`.
- [ ] Define predefined palettes:
    - [ ] `Neon` (Default): Cyan/Magenta.
    - [ ] `Matrix` (Unlock: First Contact): Green/Black.
    - [ ] `Sunset` (Unlock: High Flyer): Orange/Purple.
    - [ ] `Royal` (Unlock: Tetris Master): Gold/Blue.
- [ ] Update `CanvasRenderer` to use active palette variables instead of hardcoded colors.
- [ ] Add `ThemeSelector` UI component (dropdown or buttons) to the Dashboard.
- [ ] Integrate persistence: Save selected theme.
- [ ] Lock themes in UI if milestone not met.

## Implementation Notes
- Use CSS variables updates on `#app` or `body` to switch themes globally? 
- NO, `CanvasRenderer` uses JS variables. We need to sync them.
- Maybe expose `renderer.setTheme(palette)`.
- UI Selector shows lock icon for unavailable themes.
