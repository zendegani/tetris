import './style.css';
import { TetrisEngine } from './logic/engine';
import { CanvasRenderer } from './renderer/canvas';
import { GameLoop } from './engine/loop';

// Initialize Systems
const engine = new TetrisEngine();
// We need a wrapper element for the canvas, let's use #app
const renderer = new CanvasRenderer('app');

// Game Loop Wiring
const update = (_deltaTime: number) => {
  // We process engine ticks based on time. 
  // For now, let's just simple-tick the engine.
  // In a real game, we'd accumulate time for the specific drop speed.
  // But engine.tick() moves the piece down by one step.
  // We shouldn't call engine.tick() every 16ms (60fps), that's too fast!
  // We need a separate accumulator for gravity.

  handleGravity(_deltaTime);
};

const render = (_interpolation: number) => {
  renderer.clear();
  // TODO: Draw grid and pieces (Story 2.2)

  // Debug text
  const ctx = renderer.getContext();
  ctx.fillStyle = '#00faff';
  ctx.font = '20px "Courier New"';
  ctx.fillText(`Score: ${engine.score}`, 20, 40);
  ctx.fillText(`Level: ${engine.level}`, 20, 70);
  ctx.fillText(`Lines: ${engine.linesCleared}`, 20, 100);
};

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
