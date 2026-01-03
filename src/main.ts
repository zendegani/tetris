import './style.css';
import { TetrisEngine } from './logic/engine';
import { CanvasRenderer } from './renderer/canvas';
import { GameLoop } from './engine/loop';
import { AudioEngine } from './audio/engine';

// Initialize Systems
const engine = new TetrisEngine();
// We need a wrapper element for the canvas, let's use #app
const renderer = new CanvasRenderer('app');
const audio = new AudioEngine();

let audioStarted = false;

engine.on('lock', () => {
  // Small shake on piece lock
  renderer.shake.trigger(3, 100);
  audio.playSFX('lock');
});

engine.on('level-up', () => {
  renderer.gridPulse.trigger('#ff00ff'); // Magenta pulse for level up
  audio.playSFX('level-up');
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

console.log('Tetris-Vibe | Visual Systems Online');
