import './style.css';
import { TetrisEngine } from './logic/engine';
import { CanvasRenderer } from './renderer/canvas';
import { GameLoop } from './engine/loop';
import { AudioEngine } from './audio/engine';
import { PersistenceManager } from './logic/persistence';
import { GameStateSchema } from './logic/schema';
import { UIManager } from './ui/manager';
import { MilestoneManager } from './logic/milestones';
import { ThemeManager } from './renderer/themes';
import { z } from 'zod';

// Initialize Systems
const engine = new TetrisEngine();
const audio = new AudioEngine();
const persistence = new PersistenceManager();
const ui = new UIManager();
const milestones = new MilestoneManager();
const themeManager = new ThemeManager();

// Renderer needs ThemeManager
const renderer = new CanvasRenderer('app', themeManager);

let audioStarted = false;

const savedMilestones = persistence.load('milestones', z.array(z.string()));
if (savedMilestones) {
  milestones.loadUnlockedIds(savedMilestones);
}

// Bind UI
ui.bindThemeSelector(themeManager, milestones.getUnlockedIds());
ui.bindSimControls({
  onToggleMode: (isPractice) => {
    const mode = isPractice ? 'practice' : 'ranked';
    engine.setGameMode(mode);
    // Reset game on mode switch to apply cleanly? for now just set mode
    // Ideally we should restart the game or clear the grid to prevent cheating
    // But for "Practice Lab" it's fine to switch on the fly for now
  },
  onLevelChange: (level) => {
    engine.setLevel(level);
  }
});

ui.bindRestartAction(() => {
  persistence.clear('gamestate');
  window.location.reload();
});

// Load Theme
const savedTheme = persistence.load('theme', z.string());
if (savedTheme) {
  themeManager.setTheme(savedTheme);
  // Force UI sync if needed, but bindThemeSelector sets initial value
  // Re-bind to ensure UI reflects loaded theme
  ui.bindThemeSelector(themeManager, milestones.getUnlockedIds());
}

// Listen for Theme Changes from UI
window.addEventListener('theme-change', ((e: CustomEvent) => {
  persistence.save('theme', e.detail);
}) as EventListener);

// Attempt Hot-Resume
const savedState = persistence.load('gamestate', GameStateSchema);
if (savedState) {
  console.log('Resuming Saved Session...');
  engine.deserialize(savedState);
  engine.pause();
  engine.pause();
  ui.updateStats(engine.score, engine.level, engine.linesCleared);
  // Restore time? V1 doesn't support persisting time yet, reset to 0 or ideally save it in gamestate.
  // For now, let's start at 0 or add TODO.
  // actually, if we want "Persistent Session", we should restore time.
  // But serialized state doesn't have it. Task said "Implement Timer Display", not "Persist Timer".
  ui.togglePause(true);
} else {
  ui.updateStats(engine.score, engine.level, engine.linesCleared);
}

// Auto-Save Bindings
const saveGame = () => {
  persistence.save('gamestate', engine.serialize());
};

const checkMilestones = (lastLineClearCount: number) => {
  const unlocked = milestones.check({
    score: engine.score,
    level: engine.level,
    linesCleared: engine.linesCleared,
    lastLineClearCount,
    gameMode: engine.gameMode
  });

  if (unlocked.length > 0) {
    unlocked.forEach(m => {
      ui.showToast('MILESTONE UNLOCKED', m.name);
      audio.playSFX('level-up');
    });
    persistence.save('milestones', milestones.getUnlockedIds());

    // Refresh Palette Options
    ui.bindThemeSelector(themeManager, milestones.getUnlockedIds());
  }
};

engine.on('lock', () => {
  // Small shake on piece lock
  renderer.shake.trigger(3, 100);
  audio.playSFX('lock');
  checkMilestones(0);
  saveGame();
});

engine.on('level-up', () => {
  renderer.gridPulse.trigger('#ff00ff'); // Magenta pulse for level up
  audio.playSFX('level-up');
  ui.updateStats(engine.score, engine.level, engine.linesCleared);
  checkMilestones(0);
  saveGame();
});

engine.on('state-change', (newState) => {
  if (newState === 'paused') {
    ui.showPause();
  } else if (newState === 'playing') {
    ui.hidePause();
  }
  saveGame();
});

engine.on('line-clear', (payload: any) => {
  if (payload.type === 'tetris') {
    renderer.gridPulse.trigger('#00faff'); // Cyan pulse for Tetris
    audio.playSFX('tetris');
  } else {
    audio.playSFX('line-clear');
  }
  ui.updateStats(engine.score, engine.level, engine.linesCleared);
  checkMilestones(payload.count);
  saveGame(); // Ensure score is saved
});

engine.on('game-over', () => {
  audio.playSFX('game-over');
  ui.showGameOver(engine.score);
  persistence.clear('gamestate'); // Prevent reloading into dead state
});

const update = (deltaTime: number) => {
  // Update visual effects
  renderer.gridPulse.update(deltaTime);
  renderer.shake.update(deltaTime);

  handleGravity(deltaTime);

  // Timer Logic
  if (engine.state === 'playing') {
    timeAccumulator += deltaTime;
    if (timeAccumulator >= 1000) {
      elapsedTime += 1;
      timeAccumulator -= 1000;
      ui.updateTime(elapsedTime);
    }
  }
};

const render = (_interpolation: number) => {
  renderer.render(engine);
  // Debug text removed - handled by UI Manager
};

// Input Handling
window.addEventListener('keydown', (e) => {
  if (!audioStarted) {
    audio.start();
    audioStarted = true;
  }

  if (engine.state !== 'playing') return;

  switch (e.code) {
    case 'ArrowLeft':
      if (engine.moveLeft()) {
        audio.playSFX('move');
      }
      break;
    case 'ArrowRight':
      if (engine.moveRight()) {
        audio.playSFX('move');
      }
      break;
    case 'ArrowDown':
      if (engine.softDrop()) {
        audio.playSFX('move');
      }
      // Reset gravity accumulator to prevent double-drop feel
      gravityAccumulator = 0;
      break;
    case 'ArrowUp':
      if (engine.rotate()) {
        audio.playSFX('rotate');
      }
      break;
    case 'Space':
      if (engine.hardDrop()) {
        audio.playSFX('lock'); // Hard drop ends in lock
        renderer.shake.trigger(5, 150); // Harder shake
      }
      break;
    case 'KeyR':
      // Hard Reset
      persistence.clear('gamestate');
      window.location.reload();
      break;
  }
});

// Gravity Logic (Simple version for V1)
let gravityAccumulator = 0;
const gravityThreshold = 500; // ms per drop (standard speed for now)

// Timer Logic
let elapsedTime = 0;
let timeAccumulator = 0;

function handleGravity(dt: number) {
  gravityAccumulator += dt;
  if (gravityAccumulator >= gravityThreshold) {
    engine.tick();
    gravityAccumulator = 0;
  }
}

const loop = new GameLoop(update, render);
loop.start();

// Visibility / Auto-Pause
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    engine.pause();
    audio.suspend();
  } else {
    // Optional: we can choosing NOT to auto-resume to be safe, 
    // or auto-resume if it was playing before. 
    // For now, let's keep it paused so the user has to click/press key.
  }
});

// Resume on interaction if paused (simple toggle approach)
window.addEventListener('keydown', (e) => {
  if (e.code === 'Escape') {
    if (engine.state === 'playing') {
      engine.pause();
      audio.suspend();
    } else if (engine.state === 'paused') {
      engine.resume();
      audio.resume();
    }
  }
});

console.log('Tetris-Vibe | Visual Systems Online');
