import { TetrisEngine } from '../logic/engine';
import { CELL_SIZE, GRID_HEIGHT, GRID_WIDTH, NEON_PALETTE, GHOST_ALPHA, GLOW_BLUR } from './constants';
import { PulseEffect, ShakeEffect } from './fx';

export class CanvasRenderer {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private container: HTMLElement;
    private offsetX: number = 0;
    private offsetY: number = 0;

    public gridPulse: PulseEffect;
    public shake: ShakeEffect;

    constructor(containerId: string) {
        this.gridPulse = new PulseEffect();
        this.shake = new ShakeEffect();
        const container = document.getElementById(containerId);
        if (!container) {
            throw new Error(`Container element #${containerId} not found`);
        }
        this.container = container;

        // clear container
        this.container.innerHTML = '';

        this.canvas = document.createElement('canvas');
        this.container.appendChild(this.canvas);

        const context = this.canvas.getContext('2d');
        if (!context) {
            throw new Error('Could not get 2D context');
        }
        this.ctx = context;

        this.resize = this.resize.bind(this);
        window.addEventListener('resize', this.resize);
        this.resize();
    }

    private resize(): void {
        const { clientWidth, clientHeight } = this.container;
        const dpr = window.devicePixelRatio || 1;

        this.canvas.width = clientWidth * dpr;
        this.canvas.height = clientHeight * dpr;

        this.ctx.scale(dpr, dpr);

        this.canvas.style.width = `${clientWidth}px`;
        this.canvas.style.height = `${clientHeight}px`;

        // Calculate centering offsets
        this.offsetX = Math.floor((clientWidth - GRID_WIDTH * CELL_SIZE) / 2);
        this.offsetY = Math.floor((clientHeight - GRID_HEIGHT * CELL_SIZE) / 2);
    }

    public clear(): void {
        this.ctx.fillStyle = '#050505';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public render(engine: TetrisEngine): void {
        this.clear();

        const shakeOffset = this.shake.getOffset();
        this.ctx.save();
        this.ctx.translate(shakeOffset.x, shakeOffset.y);

        this.drawGridBoundaries();
        this.drawLockedBlocks(engine);
        this.drawGhostPiece(engine);
        this.drawCurrentPiece(engine);

        this.ctx.restore();
    }

    private drawGridBoundaries(): void {
        this.ctx.lineWidth = 2;

        if (this.gridPulse.isActive()) {
            this.ctx.strokeStyle = this.gridPulse.getColor();
            this.ctx.shadowBlur = 20;
            this.ctx.shadowColor = this.gridPulse.getColor();
            this.ctx.globalAlpha = this.gridPulse.getAlpha();
        } else {
            this.ctx.strokeStyle = '#1a1a1a';
            this.ctx.shadowBlur = 0;
            this.ctx.globalAlpha = 1.0;
        }

        this.ctx.strokeRect(
            this.offsetX - 2,
            this.offsetY - 2,
            GRID_WIDTH * CELL_SIZE + 4,
            GRID_HEIGHT * CELL_SIZE + 4
        );

        // Reset
        this.ctx.shadowBlur = 0;
        this.ctx.globalAlpha = 1.0;
    }

    private drawLockedBlocks(engine: TetrisEngine): void {
        const gridData = engine.grid.getRawGrid();
        for (let y = 0; y < GRID_HEIGHT; y++) {
            for (let x = 0; x < GRID_WIDTH; x++) {
                const cellValue = gridData[y][x];
                if (cellValue > 0) {
                    const color = NEON_PALETTE[cellValue as keyof typeof NEON_PALETTE];
                    this.drawBlock(x, y, color);
                }
            }
        }
    }

    private drawCurrentPiece(engine: TetrisEngine): void {
        if (!engine.currentPiece) return;

        const color = NEON_PALETTE[engine.currentPiece.type];
        const blocks = engine.currentPiece.getBlocks();

        blocks.forEach(block => {
            // Only draw if visible (y >= 0)
            if (block.y >= 0) {
                this.drawBlock(block.x, block.y, color, true);
            }
        });
    }

    private drawGhostPiece(engine: TetrisEngine): void {
        if (!engine.currentPiece) return;

        const ghostY = engine.getGhostY();
        const blocks = engine.currentPiece.getBlocks();
        const color = NEON_PALETTE[engine.currentPiece.type];

        // Calculate delta Y to shift blocks
        const deltaY = ghostY - engine.currentPiece.y;

        this.ctx.globalAlpha = GHOST_ALPHA;
        blocks.forEach(block => {
            const y = block.y + deltaY;
            if (y >= 0) {
                this.drawBlock(block.x, y, color, false);
            }
        });
        this.ctx.globalAlpha = 1.0;
    }

    private drawBlock(x: number, y: number, color: string, glow: boolean = false): void {
        const px = this.offsetX + x * CELL_SIZE;
        const py = this.offsetY + y * CELL_SIZE;

        if (glow) {
            this.ctx.shadowBlur = GLOW_BLUR;
            this.ctx.shadowColor = color;
        } else {
            this.ctx.shadowBlur = 0;
        }

        this.ctx.fillStyle = color;
        this.ctx.fillRect(px + 1, py + 1, CELL_SIZE - 2, CELL_SIZE - 2);

        // Add a light inner border/reflection for that "glassy" look
        this.ctx.shadowBlur = 0; // Reset for inner rect
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        this.ctx.fillRect(px + 1, py + 1, CELL_SIZE - 2, 4); // Top highlight
    }

    public getContext(): CanvasRenderingContext2D {
        return this.ctx;
    }
}
