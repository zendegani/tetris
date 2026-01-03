---
stepsCompleted: ['step-01-init', 'step-02-context', 'step-03-platforms', 'step-04-vision', 'step-05-core-gameplay', 'step-06-mechanics', 'step-07-game-type', 'step-08-progression', 'step-09-levels', 'step-10-art-audio', 'step-11-technical', 'step-12-epics', 'step-13-metrics', 'step-14-complete']
inputDocuments: ['_bmad-output/analysis/brainstorming-session-2026-01-02.md']
documentCounts:
  briefs: 0
  research: 0
  brainstorming: 1
  projectDocs: 0
workflowType: 'gdd'
lastStep: 0
project_name: 'bamd'
user_name: 'AZ'
date: '2026-01-02'
game_type: 'puzzle'
game_name: 'Tetris-Vibe'
---

# Tetris-Vibe - Game Design Document

**Author:** AZ
**Game Type:** Puzzle
**Target Platform(s):** Web Browser (Keyboard-first)

---

## Executive Summary

### Game Name

Tetris-Vibe

### Core Concept

Tetris-Vibe is a "Purist-Classic" tactical puzzle game designed for players who crave high-precision gameplay wrapped in a premium, modern aesthetic. At its heart is a commitment to the "Classic" ruleset—featuring True Random piece generation and strict rotation without modern "wall-kicks"—ensuring that every successful clear is a testament to the player's skill rather than the engine's assistance.

The game is centered around a "Daily Challenge" experience. Every 24 hours, a global "Daily Seed" is generated, providing every player with the exact same sequence of pieces. This creates a shared competitive landscape where players can compare their strategies and survival times on a perfectly level playing field.

Visually, the game departs from traditional "glassmorphism" in favor of a "Dark Tech" or "Cyberpunk" identity. Deep charcoal backgrounds contrast with high-intensity neon blocks, while a pulsing grid and "Elastic Physics"—subtle screen shakes and block squashes on landing—provide a tactile, heavy sense of impact that makes the digital bricks feel physical.

### Game Type

**Type:** Puzzle (puzzle)
**Framework:** This GDD uses the puzzle template with type-specific sections for Core Puzzle Mechanics, Puzzle Progression, and Daily/Challenge modes.

### Target Audience

Core puzzle enthusiasts who appreciate minimalist, high-fidelity design and "one-more-try" gameplay loops.

**Demographics:** Core puzzle enthusiasts.
**Experience Level:** Pure "Core" - familiar with genre but seeking premium execution.
**Session Length:** 5-10 minute optimized "daily runs."

### Unique Selling Points (USPs)

- **Dark Tech Aesthetic:** Distinctive, high-impact neon visuals on deep black #050505 backgrounds. No glassmorphism.
- **Elastic Physics:** Tactile weight and impact through subtle screen-shakes and block-squashes.
- **True Random / Daily Seed:** A global sequence daily that creates a shared competitive loop.
- **Invisible Persistence:** Unbreakable sessions that resume exactly where the user left off.

---

## Goals and Context

### Project Goals

- **Aesthetic Immersion:** Reinvent the Tetris "vibe" to feel heavy, industrial, and immersive.
- **Technical Precision:** Sub-500ms load times and perfect 60fps input response.
- **Mechanical Purity:** Maintain a strict "Purist-Classic" engine (True Random, Strict Rotation).

### Background and Rationale

Tetris-Vibe fills the gap between casual retro clones and help-assisted modern versions. It brings back the unforgiving skill requirement of the classic era but wraps it in a state-of-the-art "Dark Tech" sensory experience, making every line clear feel tactile and permanent.
---

## Core Gameplay

### Game Pillars

- **Mechanical Purity:** Skill > Assistance. No wall-kicks or easy rotation assists. Precision mastery is the only way to survive.
- **Tactile Impact:** Every block feels physical. Visuals and audio must emphasize weight, heavy thuds, and elastic "squash" frames on landing.
- **Atmospheric Tension:** The game is a high-stakes simulation. The industrial, tech-noir environment must maintain a sense of focused, high-intensity pressure.

**Pillar Prioritization:**
1. Mechanical Purity (Core engine behavior)
2. Tactile Impact (Visual/Audio feedback)
3. Atmospheric Tension (Tone and Setting)

### Core Gameplay Loop

The loop is a high-speed cycle of analysis and execution against a ticking clock.

**Loop Visualization:**
[SEED-GENERATED PIECE] -> [ANALYZE GRID] -> [PRECISION ROTATION/MOVEMENT] -> [TACTILE LANDING/CLEAR] -> [COUNTDOWN TO SURVIVAL]

**Loop Timing:** ~1-3 seconds per piece action; 5-10 minutes per total session.

**Loop Variation:** Difficulty scales via stepped gravity (increasing speed) and the pressure of the survival timer.

### Win/Loss Conditions

#### Victory Conditions
Success is defined as **"Shift Completion."** Players win by surviving the entire duration of a given time-dependent seed without topping out. Success is also measured by high scores and survival "timelines."

#### Failure Conditions
- **Top Out:** If blocks reach the top of the grid before the survival timer expires, the session terminates immediately.

#### Failure Recovery
Players can immediately restart the current active time-dependent seed to attempt the survival run again. Performance from previous attempts is captured in the **Session Timeline** for comparison.
---

## Game Mechanics

### Primary Mechanics

- **Precision Rotation (No-Kick):** Supporting the **Mechanical Purity** pillar, the rotation engine is strictly classic. Pieces will not rotate if blocked by walls or other blocks. This rewards high-skill spatial planning.
- **Dynamic Lock Delay:** A half-second "breather" after a piece makes contact before it permanently locks. This delay allows for last-second adjustments, crucial for the high-intensity survival missions.
- **Kinetic Impact (The "Thud"):** Supporting the **Tactile Impact** pillar. Every piece landing triggers a 50ms screen-shake and a "squash" frame. The intensity of this effect stays subtle at early levels to maintain focus but increases as gravity and levels rise.
- **Chronos Seed Synchronization:** The engine pulls a time-dependent seed (Hourly/Daily) to ensure every player in that window experiences the exact same block sequence, enabling fair survival comparisons.
- **State-Sync Persistence:** The game utilizes a background "visibility" hook to snap-save the complete game state on tab-blur, ensuring an unbreakable session.

### Mechanic Interactions

The **Precision Rotation** and **Dynamic Lock Delay** create a high-stakes "Last Second" mastery loop. Players must use the lock delay to slide pieces into place that wouldn't normally fit via rotation kicks.

---

## Controls and Input

### Control Scheme (Web Browser)

| Action | Keyboard Input |
| :--- | :--- |
| **Move Left/Right** | Left / Right Arrow Keys |
| **Rotate Clockwise** | Up Arrow Key / X |
| **Rotate Counter-Clockwise** | Z |
| **Soft Drop** | Down Arrow Key |
| **Hard Drop** | Space Bar (Tactile Trigger) |
| **Pause / Menu** | Esc / P |

### Input Feel

- **Precision First:** Controls are frame-perfect with zero input lag. 
- **Discrete Movement:** Piecing moving is "clicky" and grid-snapped, avoiding any floatiness.
- **Scaling Impact:** The kinetic "Thud" intensity (screen shake and audio volume) scales linearly with the game level/gravity.
---

## Puzzle Specific Design

### Core Puzzle Mechanics

- **Risk Management System:** The interaction between True Random piece generation and Strict Rotation (no wall-kicks) is the primary tactical challenge. Players must maintain a clean field and avoid deep "wells" or narrow gaps, as certain piece sequences can become mechanically impossible to solve if the board state is mismanaged.
- **Constraint System:** There are no artificial constraints. The challenge is purely the intersection of the Seed, the Grid, and the Gravity.

### Puzzle Progression

- **Survival Timer:** Each shift has a fixed duration (e.g., 5 or 10 minutes). The player wins the shift by reaching the end of the timer without topping out.
- **Gravity Scaling:** The primary pacing mechanic is "Stepped Gravity." At fixed difficulty milestones (Line Clear thresholds or Time intervals), the block fall-speed increases significantly.
- **Visual Intensity:** As difficulty milestones are hit, the "Pulsing Grid" and "Thud" intensity increase to raise the atmospheric tension.

### Level Structure & Unlocks

- **Multi-Shift Schedule:** The game operates on a three-shift daily cycle:
    - **Alpha Shift (Morning Seed)**
    - **Beta Shift (Afternoon Seed)**
    - **Gamma Shift (Night Seed)**
- **Meta-Rewards:** Completing shifts and high-score line counts unlocks new **Neon Palettes** (e.g., "Solar Wind," "Deep Space," "Radon") to customize the visual experience.

### Player Assistance

- **Strict Rotation Training:** An interactive practice mode is provided. This allows core players to learn the nuances of no-kick rotations in a stress-free environment before attempting their daily shifts.
- **Zero Assistance:** To maintain the "Mechanical Purity," there are no hints, undos, or skip features. The player is alone with the machine.

### Replayability

- **Line Clear Optimization:** Since the survival duration is fixed, the primary replay goal for any given seed is to optimize play to clear more lines (and thus achieve a higher score) than previous attempts.
- **Session Timeline:** Every run is recorded in a visual timeline, allowing players to see exactly where their "flow" broke down compared to their best attempts on that specific shift's seed.


---

## Progression and Balance

### Player Progression

Progression in Tetris-Vibe is focused on individual skill mastery and the "ritual" of shifting. Players progress through three distinct layers:

- **Mechanical Mastery:** The core of the game. Players develop a deep understanding of the "no-kick" rotation constraints and "true random" risk management.
- **Milestone Unlocks:** A direct progression system where total "Career Line Clears" and "Perfect Survivals" unlock permanent cosmetic upgrades.
- **Timeline Prestige:** A social-competitive layer where players improve their standing on the specific seed's survival timeline.

#### Progression Pacing

- **Short-Term:** Every shift completion provides immediate feedback through the Session Timeline.
- **Mid-Term:** New **Neon Palettes** are unlocked every 500 lines cleared (~5-10 successful shifts).
- **Long-Term:** Reaching "Mastery" statuses (e.g., clear 10,000 lines) unlocks the most intense "Deep Tech" visual themes.

### Difficulty Curve

Tetris-Vibe uses a **Stepped Vertical** difficulty curve designed to create peak tension within the fixed 5-10 minute shift duration.

#### Challenge Scaling

- **Base Gravity:** Starts at Level 01 (0.5s drop speed).
- **Step Jumps:** Gravity increases significantly every 10 lines. 
- **The "Pressure Zone":** At the final 60 seconds of a shift, gravity hits a "Master Speed" regardless of line count, testing pure reaction and board management under maximal pressure.

#### Difficulty Options

To maintain the **Mechanical Purity** pillar, all players play on the same difficulty parameters for a given shift. There are no "easy" modes; the only path to survival is through practice in the Training Mode.

### Economy and Resources

_This game does not feature an in-game currency economy. All rewards (Neon Palettes) are earned through direct gameplay milestones, emphasizing skill and time investment over resource management._



---

## Level Design Framework

### Structure Type

Tetris-Vibe uses a **Temporal Seeded Arena** structure. The gameplay space is a single, consistent grid, but the content is generated via time-dependent seeds, creating a global "shift" schedule that all players participate in simultaneously.

### Level Types

- **Standard Daily Shifts:** 
    - **Alpha (Morning):** 5-minute survival, medium gravity ramp.
    - **Beta (Afternoon):** 5-minute survival, variable gravity spikes.
    - **Gamma (Night):** 10-minute endurance, steep "Kill Screen" finish.
- **Emergency Shifts (Status: Gated):** Rare, high-intensity seeds (e.g., "The Radon Void") that appear only when a player has completed a 3-shift survival streak.
- **The Simulation Lab:** An interactive training room for mastering strict-rotation and "no-kick" placements without top-out penalties.

#### Tutorial Integration

The game uses **"The Simulation Lab"**—a narrative-lite prologue that teaches players the "Purist" constraints. It skips text-heavy tutorials in favor of goal-based rooms (e.g., "Place 5 pieces without using wall-kicks").

### Level Progression

#### Progression Model: Temporal Access

Progression is not a linear "Level 1 to Level 20" path. Instead:
- **Shift Cycle:** New content is unlocked by real-world time.
- **Milestone Select:** Completed "Perfect Survivals" unlock the specific seed for revisit/speedrunning in a private "Archive" mode.

#### Unlock System

- **Visual identity is the real level progression.** While the blocks are always the same, the **Neon Palettes** and **Audio Profiles** are the primary rewards for reaching high-level shift milestones.

### Level Design Principles

- **The Sacred Grid:** No background effect or "vibe" pulse may ever obscure a single pixel of a falling block or the ghost-piece.
- **Rhythmic Escalation:** Visual and audio tempo must synchronize perfectly with the current piece-drop frequency.
- **Spatial Honesty:** The 10x20 grid must be presented with high-definition clarity (no isometric tilts or lens distortion) to respect the **Mechanical Purity** pillar.
---

## Art and Audio Direction

### Art Style

Tetris-Vibe utilizes a **High-Fidelity "Dark Tech"** visual style. It rejects standard 8-bit retro aesthetics in favor of a crisp, vector-based Cyberpunk look that feels like a professional terminal simulation.

#### Visual References
- **Blade Runner 2049:** For the lighting and "industrial haze" mood.
- **TRON: Legacy:** For the clean neon-on-black contrast.
- **Ghost in the Shell:** For the digital "glitch" and data-heavy UI.

#### Color Palette
- **Background:** Deep Charcoal (#050505) with a subtle #0a0a0a pulsing grid.
- **Active Pieces:** Hyper-vibrant Neons (Cyan, Magenta, Lime, Amber, Electric Blue, Bright Purple, Safety Orange).
- **Ghost Piece:** Low-opacity (0.1) white outline.

#### Camera and Perspective
Fixed 2D Front-View (Total Orthographic). No perspective tilts or lens distortion to ensure the **Mechanical Purity** of the grid is never compromised.

### Audio and Music

#### Music Style
**Industrial Focus Drone:** The OST is a generative ambient-techno track that adapts to gameplay. It starts as a low-frequency focus drone and adds rhythmic layers of industrial percussion and analog synth bass as levels and gravity increase.

#### Sound Design
- **Impacts:** Heavy, low-mid "thuds" for block landings.
- **Line Clears:** High-voltage discharge sounds followed by a brief "digital vacuum" silence.
- **BPM Sync:** All visual pulses and UI sounds are synchronized to the active music tempo.

#### Voice/Dialogue
**The System Voice:** A cold, minimalist AI voice provides critical status updates ("Shift Initialized," "Pressure Critical," "Survival Terminated").

### Aesthetic Goals
The Art and Audio are unified to serve the **Atmospheric Tension** pillar. Every visual pulse and audio thud reinforces the sense that the player is operating a heavy, industrial machine under extreme pressure.



---

## Technical Specifications

### Performance Requirements

Tetris-Vibe requires high-precision performance to respect the **Mechanical Purity** pillar. Frame stability is prioritized over complex post-processing effects that might introduce input lag.

#### Frame Rate Target
Locked **60fps**. The engine must utilize `requestAnimationFrame` and high-precision timers to ensure piece movement and rotation are frame-perfect with zero perceptible input lag.

#### Resolution Support
Responsive Web Canvas. The game targets standard Desktop resolutions (1080p, 1440p, 4K). Rendering must be crisp to maintain grid clarity under all scaling scenarios.

#### Load Times
Under **500ms**. The initial payload must be highly optimized to allow for "Instant-Play" sessions, minimizing the barrier between the player and the "Daily Shift."

### Platform-Specific Details

#### Web Browser (Desktop)
- **Target Browsers:** Modern Evergreen browsers (Chrome, Firefox, Safari, Edge).
- **Persistence:** Reliable `localStorage` implementation for "Invisible Persistence" (session state, scores, unlocked palettes).
- **Visibility Hook:** Integration with the `visibilitychange` event to auto-pause and deep-save the session state when the player switches tabs or minimizes the window.
- **Input:** Native Keyboard Event handling (Arrows, Space, Z, X). No mobile or touch support for V1.

### Asset Requirements

#### Art Assets
- **The Block Atlas:** 7 high-definition neon block sprites with accompanying Glow/Shadow depth maps.
- **The Grid:** Dynamic grid with pulsing opacity triggers based on gravity and level milestones.
- **UI Architecture:** SVG and CSS-based industrial dashboard elements (The Command Center).

#### Audio Assets
- **Generative OST:** Multi-layered tracks for the adaptive Industrial Focus drone.
- **SFX Pack:** 15-20 discrete sound effects including the "Thud" (Impact), "Discharge" (Line Clear), and "The System Voice" status updates.

### Technical Constraints
- **Connectivity:** The game must support **Offline Play** via Service Workers to ensure the session is truly "unbreakable" regardless of current network status.
- **Max Build Size:** Targeting < 2MB initial load.



---

## Development Epics

### Epic Overview

| # | Epic Name | Scope | Dependencies | Est. Stories |
| :--- | :--- | :--- | :--- | :--- |
| 1 | **The Purist Engine** | Core 10x20 grid, True Random, Strict Rotation, Linear Gravity | None | 6 |
| 2 | **Sensory Vibe** | Neon visuals, "Thud" physics, Industrial Dynamic Audio | Epic 1 | 8 |
| 3 | **Chronos Persistence** | Seeded sequence gen, Page-visibility auto-save/resume | Epic 2 | 5 |
| 4 | **Command Center** | Dashboard UI, Milestone Unlocks, Simulation Lab Training | Epic 3 | 7 |

### Recommended Sequence

1. **Epic 1 (Foundation):** Establish the core "No-Kick" constraints first.
2. **Epic 2 (Aesthetic):** Apply the high-fidelity skin once mechanics are solid.
3. **Epic 3 (Session):** Implement the time-synced persistence.
4. **Epic 4 (Meta):** Wrap the experience in the reward and dashboard layers.

### Vertical Slice

**The first playable milestone:** Epic 1 (The Purist Engine). This provides a fully playable, albeit visually simple, Tetris game that validates the skill-based constraints of the design.
---

## Success Metrics

### Technical Metrics

Technical success is defined by invisible reliability. The game must feel like a dedicated machine rather than a browser tab.

#### Key Technical KPIs

| Metric | Target | Measurement Method |
| :--- | :--- | :--- |
| **FPS Stability** | 60fps (99th percentile) | Internal Frame-timing log |
| **Initial Load** | < 500ms | Performance API (LCP) |
| **State Integrity** | 0% data loss on blur | LocalStorage checksum validation |
| **Build Size** | < 2MB (Gzipped) | Post-build CI report |

### Gameplay Metrics

We measure success through "Ritual Engagement"—how consistently players return for their daily shifts.

#### Key Gameplay KPIs

| Metric | Target | Measurement Method |
| :--- | :--- | :--- |
| **Daily Retention** | 40% (Day 30) | Unique daily shift starts |
| **Mastery Delta** | +15% line clear avg | Month-over-month user avg |
| **Shift Completion** | 15% (Gamma Shift) | Success trigger on survival timer |
| **Palette Diversity** | 60% active usage | Setting state check on session start |

### Qualitative Success Criteria

- **The "Vibe" Test:** Player feedback consistently uses words like "Heavy," "Weighty," "Industrial," or "Tactile."
- **Social Proof:** Users share screenshots or recordings of their **Session Timelines** to compare survival durations.
- **Skill Recognition:** Core puzzle influencers highlight the **"No-Kick"** constraint as a badge of honor for high-tier play.

### Metric Review Cadence
Metrics will be reviewed weekly during the initial launch month to tune the "Stepped Gravity" jumps and ensure the Night Shift survival rate remains challenging but achievable.
---

## Out of Scope

- **Multiplayer:** Tetris-Vibe v1.0 is a strictly local, solo competitive experience centered on shared seeds.
- **Level/Seed Editor:** Players cannot create their own seeds; the experience is controlled by the "Chronos" daily cycle.
- **Mobile/Touch Support:** The game is hard-coded for keyboard precision and desktop browser environments.
- **Localization:** Initial release is English-only, utilizing minimalist universal icons where possible.
- **Experimental Rotations:** Modern features like wall-kicks, floor-kicks, and infinite-spin are explicitly excluded to maintain **Mechanical Purity**.

### Deferred to Post-Launch
- **"Archive" Mode:** Replaying previous daily seeds (planned for v1.1).
- **Global Leaderboards:** Integration with a centralized server for persistent global rankings.

---

## Assumptions and Dependencies

### Key Assumptions
- **Technical Integrity:** Modern browsers maintain consistent 60fps rendering via `requestAnimationFrame` with sub-16ms input polling.
- **User Preference:** There exists a core segment of players who prefer "unforgiving" classic rules over modern gameplay assists.
- **Global Clock:** Users' system clocks are synchronized enough (within +/- 5 minutes) to ensure shared hourly/daily seed parity.

### External Dependencies
- **Development Stack:** Vite + TypeScript for build tooling.
- **Hosting:** Vercel/Netlify for low-latency web delivery.
- **Persistence:** Browser `localStorage` availability and stability.

### Risk Factors
- **Rule Polarization:** The lack of wall-kicks may be perceived as a bug by players accustomed only to modern "SRS" Tetris variants.
- **Seed Drift:** Inaccurate system clocks could result in players seeing different piece sequences for the "Alpha/Beta/Gamma" shifts.

---

## Document Information

**Document:** Tetris-Vibe - Game Design Document
**Version:** 1.0
**Created:** 2026-01-03
**Author:** AZ
**Status:** Complete

### Change Log

| Version | Date | Changes |
| :--- | :--- | :--- |
| 1.0 | 2026-01-03 | Initial GDD complete |
