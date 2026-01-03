import { Grid } from './grid';
import { Piece, Point } from './piece';

/**
 * Validates if the given piece blocks are in a legal position on the grid.
 * Legality is defined as:
 * 1. Within grid boundaries.
 * 2. Not overlapping with any existing blocks (value > 0).
 */
export function isPositionValid(grid: Grid, blocks: Point[]): boolean {
    for (const block of blocks) {
        // Check boundaries
        if (!grid.isValidCoordinate(block.x, block.y)) {
            return false;
        }
        // Check collisions with existing blocks
        const cellValue = grid.getCell(block.x, block.y);
        if (cellValue !== 0) {
            return false;
        }
    }
    return true;
}

/**
 * Checks if a piece can move by the specified delta.
 */
export function canMove(grid: Grid, piece: Piece, deltaX: number, deltaY: number): boolean {
    const futureBlocks = piece.getBlocks().map(p => ({
        x: p.x + deltaX,
        y: p.y + deltaY,
    }));
    return isPositionValid(grid, futureBlocks);
}

/**
 * Checks if a piece can rotate in its current position.
 * Implements the "Strict Rotation" rule: fails if any part of the rotated 
 * piece would be out of bounds or overlapping. No wall-kicks or floor-kicks.
 */
export function canRotate(grid: Grid, piece: Piece): boolean {
    const rotatedBlocks = piece.peekNextRotation();
    return isPositionValid(grid, rotatedBlocks);
}
