status: 'done'
---

# Story 4.3: Palette Unlock Logic

## Goal
Connect the `MilestoneManager` to the visual system. When specific milestones are unlocked, new color palettes (themes) should become available for the user to select.

## Acceptance Criteria
- [x] Create `ThemeManager` (or `PaletteManager`) in `src/renderer/themes.ts`.
- [x] Define predefined palettes:
    - [x] `Neon` (Default): Cyan/Magenta.
    - [x] `Matrix` (Unlock: First Contact): Green/Black.
    - [x] `Sunset` (Unlock: High Flyer): Orange/Purple.
    - [x] `Royal` (Unlock: Tetris Master): Gold/Blue.
- [x] Update `CanvasRenderer` to use active palette variables instead of hardcoded colors.
- [x] Add `ThemeSelector` UI component (dropdown or buttons) to the Dashboard.
- [x] Integrate persistence: Save selected theme.
- [x] Lock themes in UI if milestone not met.

## Implementation Notes
- Use CSS variables updates on `#app` or `body` to switch themes globally? 
- NO, `CanvasRenderer` uses JS variables. We need to sync them.
- Maybe expose `renderer.setTheme(palette)`.
- UI Selector shows lock icon for unavailable themes.
