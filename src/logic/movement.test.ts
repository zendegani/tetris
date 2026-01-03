import { describe, it, expect, beforeEach } from 'vitest';
import { Grid } from './grid';
import { Piece, PieceType } from './piece';
import { canMove, canRotate, isPositionValid } from './movement';

describe('Movement & Collision', () => {
    let grid: Grid;

    beforeEach(() => {
        grid = new Grid();
    });

    describe('isPositionValid', () => {
        it('should confirm valid position in empty grid', () => {
            const blocks = [{ x: 5, y: 5 }, { x: 5, y: 6 }];
            expect(isPositionValid(grid, blocks)).toBe(true);
        });

        it('should reject out of bounds (Right)', () => {
            const blocks = [{ x: 10, y: 5 }];
            expect(isPositionValid(grid, blocks)).toBe(false);
        });

        it('should reject out of bounds (Floor)', () => {
            const blocks = [{ x: 5, y: 20 }];
            expect(isPositionValid(grid, blocks)).toBe(false);
        });

        it('should reject overlap with existing blocks', () => {
            grid.setCell(5, 5, 1);
            const blocks = [{ x: 5, y: 5 }];
            expect(isPositionValid(grid, blocks)).toBe(false);
        });
    });

    describe('canMove', () => {
        it('should allow valid horizontal movement', () => {
            const piece = new Piece(PieceType.I, 0, 0);
            // I piece at (0,0) is at y=1: (0,1), (1,1), (2,1), (3,1)
            expect(canMove(grid, piece, 1, 0)).toBe(true);
        });

        it('should prevent moving through walls', () => {
            const piece = new Piece(PieceType.I, 6, 0);
            // (6,1)-(9,1) is valid. (7,1)-(10,1) is invalid.
            expect(canMove(grid, piece, 1, 0)).toBe(false);
        });

        it('should prevent moving through floors', () => {
            const piece = new Piece(PieceType.I, 0, 18);
            // Y=19 is the bottom row. Moving down 1: Y=20 (invalid)
            expect(canMove(grid, piece, 0, 1)).toBe(false);
        });
    });

    describe('canRotate (Strict Rotation)', () => {
        it('should allow rotation when space is clear', () => {
            const piece = new Piece(PieceType.T, 5, 5);
            expect(canRotate(grid, piece)).toBe(true);
        });

        it('should reject rotation if blocked by wall (No-Kick)', () => {
            // Next rotation (vertical) at x=2 (relative) + 7 = 9. 
            // This happens to stay in bounds for 10x20 but let's try 8.
            const pieceNearEdge = new Piece(PieceType.I, 8, 0);
            // Check: I piece R1 has blocks at x=2 relative. 2+8 = 10 (OUT)
            expect(canRotate(grid, pieceNearEdge)).toBe(false);
        });

        it('should reject rotation if blocked by existing piece (No-Kick)', () => {
            const piece = new Piece(PieceType.T, 5, 5);
            // T rotation 1 has block at x=2 relative (5+2=7, 5+1=6).
            grid.setCell(7, 6, 7);
            expect(canRotate(grid, piece)).toBe(false);
        });
    });
});
