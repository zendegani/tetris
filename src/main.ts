import './style.css';

const app = document.querySelector<HTMLDivElement>('#app')!;
app.innerHTML = `
  <div class="system-box">
    <h1>Tetris-Vibe V1.0</h1>
    <p>Status: Initializing Systems...</p>
    <p>Mechanical Purity: Active</p>
    <p>Sensory Vibe: Calibrating</p>
  </div>
`;

console.log('Tetris-Vibe | System Initialization Complete');
