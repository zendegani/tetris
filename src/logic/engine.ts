import { Grid } from './grid';
import { Piece, PieceType } from './piece';
import { canMove, canRotate } from './movement';
import { RandomGenerator } from './random';
import { EventEmitter } from './events';

import { SerializedGameState } from './schema';

export type GameState = 'playing' | 'paused' | 'game-over';
export type GameMode = 'ranked' | 'practice';

export class TetrisEngine extends EventEmitter {
    public grid: Grid;
    public currentPiece: Piece | null = null;
    public nextPieceType: PieceType;
    public score: number = 0;
    public linesCleared: number = 0;
    public level: number = 1;
    public state: GameState = 'playing';
    public gameMode: GameMode = 'ranked';

    private randomGen: RandomGenerator;

    constructor(seed?: string) {
        super();
        this.grid = new Grid();
        this.randomGen = new RandomGenerator(seed);
        this.nextPieceType = this.randomGen.next();
        this.spawnPiece();
    }

    public setLevel(level: number) {
        // Clamp 1-20
        if (level < 1) level = 1;
        if (level > 20) level = 20;
        this.level = level;
    }

    public setGameMode(mode: GameMode) {
        this.gameMode = mode;
        if (mode === 'practice') {
            // Reset score to 0 to avoid confusion
            this.score = 0;
            this.linesCleared = 0;
        }
    }

    // ... existing methods ...

    public serialize(): SerializedGameState {
        return {
            score: this.score,
            level: this.level,
            linesCleared: this.linesCleared,
            grid: this.grid.getRawGrid(),
            currentPiece: this.currentPiece ? {
                type: this.currentPiece.type,
                x: this.currentPiece.x,
                y: this.currentPiece.y,
                rotation: this.currentPiece.getRotation(),
            } : null,
            nextPieceType: this.nextPieceType,
            seed: this.randomGen.getState(),
            prngState: this.randomGen.getState(),
        };
    }

    public deserialize(data: SerializedGameState): void {
        this.score = data.score;
        this.level = data.level;
        this.linesCleared = data.linesCleared;

        // Restore Grid
        this.grid.reset();
        for (let y = 0; y < this.grid.getHeight(); y++) {
            for (let x = 0; x < this.grid.getWidth(); x++) {
                if (data.grid[y] && data.grid[y][x]) {
                    this.grid.setCell(x, y, data.grid[y][x]);
                }
            }
        }

        // Restore PRNG
        if (data.seed !== undefined) {
            // If we have a stored internal state, might just want to restore that directly
            // But reseed(seed) is safer if we don't expose internal state setter
            // Wait, RandomGenerator has setState/getState now using 'seed' property as state
            if (typeof data.seed === 'number') {
                this.randomGen.setState(data.seed);
            } else {
                this.randomGen.reseed(data.seed);
            }
        }

        // Restore Pieces
        this.nextPieceType = data.nextPieceType;

        if (data.currentPiece) {
            this.currentPiece = new Piece(
                data.currentPiece.type,
                data.currentPiece.x,
                data.currentPiece.y
            );
            this.currentPiece.setRotation(data.currentPiece.rotation);
        } else {
            this.currentPiece = null;
        }
    }

    public spawnPiece(): boolean {
        const type = this.nextPieceType;
        this.nextPieceType = this.randomGen.next();

        // Spawn at top-middle
        const startX = Math.floor((this.grid.getWidth() - 4) / 2);
        const startY = -1; // Spawn slightly above visible grid

        this.currentPiece = new Piece(type, startX, startY);

        // If spawn position is blocked immediately, it's Game Over
        if (!canMove(this.grid, this.currentPiece, 0, 0)) {
            // Try spawning at Y=0 as a fallback before declaring death
            this.currentPiece.y = 0;
            if (!canMove(this.grid, this.currentPiece, 0, 0)) {
                if (this.gameMode === 'practice') {
                    // God Mode: Reset grid to keep playing
                    this.grid.reset();
                    // No need to spawn again, currentPiece is already there and now valid since grid is empty
                } else {
                    this.triggerGameOver();
                    return false;
                }
            }
        }
        return true;
    }

    public pause(): void {
        if (this.state === 'playing') {
            this.state = 'paused';
            this.emit('state-change', this.state);
        }
    }

    public resume(): void {
        if (this.state === 'paused') {
            this.state = 'playing';
            this.emit('state-change', this.state);
        }
    }

    public tick(): void {
        if (this.state !== 'playing' || !this.currentPiece) return;

        if (canMove(this.grid, this.currentPiece, 0, 1)) {
            this.currentPiece.y += 1;
        } else {
            this.lockPiece();
        }
    }

    public lockPiece(): void {
        if (!this.currentPiece) return;

        const blocks = this.currentPiece.getBlocks();
        const validBlocks = blocks.filter(b => b.y >= 0);

        // LOCK OUT CONDITION:
        // "Lock Out": The piece locked completely above the visible playfield.
        // If EVERY block is off-screen (y < 0), it's a game over.
        // Partial lock above screen is valid in many guidelines (e.g. infinite spin at top).
        if (blocks.every(b => b.y < 0)) {
            this.triggerGameOver();
            return;
        }

        validBlocks.forEach(block => {
            this.grid.setCell(block.x, block.y, this.currentPiece!.type);
        });

        this.emit('lock');
        this.clearLines();
        this.spawnPiece();
    }

    private clearLines(): void {
        const rawGrid = this.grid.getRawGrid();
        let linesFound: number[] = [];

        for (let y = 0; y < this.grid.getHeight(); y++) {
            if (rawGrid[y].every(cell => cell > 0)) {
                linesFound.push(y);
            }
        }

        if (linesFound.length > 0) {
            this.applyScoring(linesFound.length);

            // Remove lines and shift down
            const newGrid = this.grid.getRawGrid();
            linesFound.forEach(y => {
                newGrid.splice(y, 1);
                newGrid.unshift(new Array(this.grid.getWidth()).fill(0));
            });

            // Update the grid state
            this.grid.reset();
            for (let y = 0; y < this.grid.getHeight(); y++) {
                for (let x = 0; x < this.grid.getWidth(); x++) {
                    this.grid.setCell(x, y, newGrid[y][x]);
                }
            }
        }
    }

    private applyScoring(count: number): void {
        const basePoints = [0, 40, 100, 300, 1200];
        this.score += basePoints[count] * this.level;
        this.linesCleared += count;

        this.emit('line-clear', { count, type: count === 4 ? 'tetris' : 'normal' });

        // Level up every 10 lines
        const newLevel = Math.floor(this.linesCleared / 10) + 1;
        if (newLevel > this.level) {
            this.level = newLevel;
            this.emit('level-up', this.level);
        }
    }

    public moveLeft(): boolean {
        if (this.state === 'playing' && this.currentPiece && canMove(this.grid, this.currentPiece, -1, 0)) {
            this.currentPiece.x -= 1;
            return true;
        }
        return false;
    }

    public moveRight(): boolean {
        if (this.state === 'playing' && this.currentPiece && canMove(this.grid, this.currentPiece, 1, 0)) {
            this.currentPiece.x += 1;
            return true;
        }
        return false;
    }

    public softDrop(): boolean {
        if (this.state === 'playing' && this.currentPiece && canMove(this.grid, this.currentPiece, 0, 1)) {
            this.currentPiece.y += 1;
            return true;
        }
        return false;
    }

    public hardDrop(): boolean {
        if (this.state !== 'playing' || !this.currentPiece) return false;

        const ghostY = this.getGhostY();
        const distance = ghostY - this.currentPiece.y;

        if (distance >= 0) {
            this.currentPiece.y = ghostY;
            this.score += distance * 2;
            this.lockPiece();
            return true;
        }
        return false;
    }

    public rotate(): boolean {
        if (this.state === 'playing' && this.currentPiece && canRotate(this.grid, this.currentPiece)) {
            this.currentPiece.rotate();
            return true;
        }
        return false;
    }

    public getGhostY(): number {
        if (!this.currentPiece) return -1;

        // Clone the piece to simulate drop
        const ghost = new Piece(this.currentPiece.type, this.currentPiece.x, this.currentPiece.y);
        ghost.setRotation(this.currentPiece.getRotation());

        while (canMove(this.grid, ghost, 0, 1)) {
            ghost.y += 1;
        }
        return ghost.y;
    }

    private triggerGameOver(): void {
        this.state = 'game-over';
        this.emit('game-over');
    }
}
