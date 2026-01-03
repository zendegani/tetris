import { Grid } from './grid';
import { Piece, PieceType } from './piece';
import { canMove, canRotate } from './movement';
import { RandomGenerator } from './random';

export type GameState = 'playing' | 'paused' | 'game-over';

export class TetrisEngine {
    public grid: Grid;
    public currentPiece: Piece | null = null;
    public nextPieceType: PieceType;
    public score: number = 0;
    public linesCleared: number = 0;
    public level: number = 1;
    public state: GameState = 'playing';

    private randomGen: RandomGenerator;

    constructor(seed?: string) {
        this.grid = new Grid();
        this.randomGen = new RandomGenerator(seed);
        this.nextPieceType = this.randomGen.next();
        this.spawnPiece();
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
                this.state = 'game-over';
                return false;
            }
        }
        return true;
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
        blocks.forEach(block => {
            if (block.y >= 0) {
                this.grid.setCell(block.x, block.y, this.currentPiece!.type);
            }
        });

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

        // Level up every 10 lines
        this.level = Math.floor(this.linesCleared / 10) + 1;
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

    public rotate(): boolean {
        if (this.state === 'playing' && this.currentPiece && canRotate(this.grid, this.currentPiece)) {
            this.currentPiece.rotate();
            return true;
        }
        return false;
    }
}
