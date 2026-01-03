import { PieceType } from '../logic/piece';

export const CELL_SIZE = 30;
export const GRID_WIDTH = 10;
export const GRID_HEIGHT = 20;

export const NEON_PALETTE: Record<PieceType, string> = {
    [PieceType.I]: '#00faff', // Cyan
    [PieceType.J]: '#0055ff', // Blue
    [PieceType.L]: '#ffaa00', // Orange
    [PieceType.O]: '#ffff00', // Yellow
    [PieceType.S]: '#00ff00', // Green
    [PieceType.T]: '#aa00ff', // Purple
    [PieceType.Z]: '#ff0000', // Red
};

export const GHOST_ALPHA = 0.2;
export const GLOW_BLUR = 10;
