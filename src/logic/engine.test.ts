import { describe, it, expect, beforeEach } from 'vitest';
import { TetrisEngine } from './engine';
import { PieceType } from './piece';

describe('TetrisEngine', () => {
    let engine: TetrisEngine;

    beforeEach(() => {
        // Seeded for determinism
        engine = new TetrisEngine('test-engine-seed');
    });

    it('should initialize with a piece and a grid', () => {
        expect(engine.currentPiece).not.toBeNull();
        expect(engine.state).toBe('playing');
        expect(engine.score).toBe(0);
        expect(engine.level).toBe(1);
        expect(engine.linesCleared).toBe(0);
    });

    it('should move piece down on tick if space is clear', () => {
        const initialY = engine.currentPiece!.y;
        engine.tick();
        expect(engine.currentPiece!.y).toBe(initialY + 1);
    });

    it('should lock piece and spawn new one when hitting floor', () => {
        // I-piece at rotation 0 has blocks at y+1.
        // If piece.y = 17, blocks are at 18.
        // Tick from y=17: can we move to y=18 (blocks at 19)? YES.
        // Tick from y=18: can we move to y=19 (blocks at 20)? NO (floor).
        engine.currentPiece!.y = 17;

        engine.tick();
        expect(engine.currentPiece!.y).toBe(18);

        const oldPieceReference = engine.currentPiece!;

        // This tick should lock because moving to y=19 is blocked (blocks would be at 20)
        engine.tick();

        // Verify current piece is now a fresh one at the top (startY = -1)
        expect(engine.currentPiece).not.toBe(oldPieceReference);
        expect(engine.currentPiece!.y).toBe(-1);
    });

    it('should clear full lines and update score', () => {
        // Mock a full row on bottom
        for (let x = 0; x < 10; x++) {
            engine.grid.setCell(x, 19, PieceType.I);
        }

        const initialLines = engine.linesCleared;

        // Force piece to lock away from row 19 to avoid shifting confusion
        engine.currentPiece!.y = 5;
        engine.lockPiece();

        expect(engine.linesCleared).toBe(initialLines + 1);
        expect(engine.score).toBe(40); // 40 * Level 1
    });

    it('should level up every 10 lines', () => {
        engine.linesCleared = 9;
        engine.level = 1;

        // Full row on bottom
        for (let x = 0; x < 10; x++) {
            engine.grid.setCell(x, 19, PieceType.I);
        }

        engine.lockPiece();

        expect(engine.linesCleared).toBe(10);
        expect(engine.level).toBe(2);
    });

    it('should declare game over if spawn is blocked at Y=0', () => {
        // Fill the top area completely
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 2; y++) {
                engine.grid.setCell(x, y, PieceType.O);
            }
        }

        // Trigger spawn
        engine.spawnPiece();
        expect(engine.state).toBe('game-over');
    });

    it('should calculate ghost piece position correctly', () => {
        // Initialize with default piece (usually at y=-1 or 0)
        // Let's create a clear column drop.
        // I piece spawns at center. 
        expect(engine.currentPiece).not.toBeNull();

        const ghostY = engine.getGhostY();
        // Since grid is empty, ghost should be at the bottom.
        // Piece bottom blocks depend on rotation, but for I-piece:
        // Rot 0 (flat): y=1 blocks. Bottom of grid is 19. Ghost should align blocks to 19.
        // So ghost Y should be such that y+1 = 19 => y=18.

        // Actually, if I-Piece is flat (rot 0), blocks are at `y+1`.
        // Lowest valid block Y is 19.
        // So piece.y + 1 = 19 -> piece.y = 18.
        expect(ghostY).toBe(18);

        // Add a block to obstruct
        engine.grid.setCell(engine.currentPiece!.x + 1, 15, PieceType.T);
        const newGhostY = engine.getGhostY();
        // Block at 15. Ghost blocks should land at 14.
        // piece.y + 1 = 14 => piece.y = 13.
        expect(newGhostY).toBe(13);
    });
});
