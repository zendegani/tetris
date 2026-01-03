import './style.css';
import { TetrisEngine } from './logic/engine';
import { CanvasRenderer } from './renderer/canvas';
import { GameLoop } from './engine/loop';

// Initialize Systems
const engine = new TetrisEngine();
// We need a wrapper element for the canvas, let's use #app
const renderer = new CanvasRenderer('app');

engine.on('lock', () => {
  // Small shake on piece lock
  renderer.shake.trigger(3, 100);
});

engine.on('level-up', () => {
  renderer.gridPulse.trigger('#ff00ff'); // Magenta pulse for level up
});

engine.on('line-clear', (payload: any) => {
  if (payload.type === 'tetris') {
    renderer.gridPulse.trigger('#00faff'); // Cyan pulse for Tetris
  }
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
  if (engine.state !== 'playing') return;

  switch (e.code) {
    case 'ArrowLeft':
      engine.moveLeft();
      break;
    case 'ArrowRight':
      engine.moveRight();
      break;
    case 'ArrowDown':
      engine.softDrop();
      // Reset gravity accumulator to prevent double-drop feel
      gravityAccumulator = 0;
      break;
    case 'ArrowUp':
      engine.rotate();
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
