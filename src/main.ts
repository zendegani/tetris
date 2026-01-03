import './style.css';
import { TetrisEngine } from './logic/engine';
import { CanvasRenderer } from './renderer/canvas';
import { GameLoop } from './engine/loop';
import { AudioEngine } from './audio/engine';
import { PersistenceManager } from './logic/persistence';
import { GameStateSchema } from './logic/schema';

// Initialize Systems
const engine = new TetrisEngine();
const renderer = new CanvasRenderer('app');
const audio = new AudioEngine();
const persistence = new PersistenceManager();

let audioStarted = false;

// Attempt Hot-Resume
const savedState = persistence.load('gamestate', GameStateSchema);
if (savedState) {
  console.log('Resuming Saved Session...');
  engine.deserialize(savedState);
  engine.pause();
}

// Auto-Save Bindings
const saveGame = () => {
  persistence.save('gamestate', engine.serialize());
};

engine.on('lock', () => {
  // Small shake on piece lock
  renderer.shake.trigger(3, 100);
  audio.playSFX('lock');
  saveGame();
});

engine.on('level-up', () => {
  renderer.gridPulse.trigger('#ff00ff'); // Magenta pulse for level up
  audio.playSFX('level-up');
  saveGame();
});

engine.on('state-change', () => {
  saveGame();
});

engine.on('line-clear', (payload: any) => {
  if (payload.type === 'tetris') {
    renderer.gridPulse.trigger('#00faff'); // Cyan pulse for Tetris
    audio.playSFX('tetris');
  } else {
    audio.playSFX('line-clear');
  }
});

engine.on('game-over', () => {
  audio.playSFX('game-over');
});

const update = (deltaTime: number) => {
  // Update visual effects
  renderer.gridPulse.update(deltaTime);
  renderer.shake.update(deltaTime);

  handleGravity(deltaTime);
};

const render = (_interpolation: number) => {
  renderer.render(engine);

  // Debug text overlay
  const ctx = renderer.getContext();
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#00faff';
  ctx.font = '16px "Courier New"';
  ctx.fillText(`Score: ${engine.score}`, 20, 30);
  ctx.fillText(`Level: ${engine.level}`, 20, 50);
  ctx.fillText(`Lines: ${engine.linesCleared}`, 20, 70);

  if (engine.state === 'paused') {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = '#ffffff';
    ctx.font = '30px "Courier New"';
    ctx.textAlign = 'center';
    ctx.fillText('PAUSED', ctx.canvas.width / 2, ctx.canvas.height / 2);
    ctx.textAlign = 'left'; // Reset
  } else if (engine.state === 'game-over') {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = '#ff0055';
    ctx.font = '40px "Courier New"';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', ctx.canvas.width / 2, ctx.canvas.height / 2);
    ctx.font = '20px "Courier New"';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`Final Score: ${engine.score}`, ctx.canvas.width / 2, ctx.canvas.height / 2 + 40);
    ctx.textAlign = 'left';
  }
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
