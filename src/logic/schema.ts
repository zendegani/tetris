import { z } from 'zod';
import { PieceType } from './piece';

/**
 * Zod Schema definitions for Game State validation.
 */

// Enum validation for PieceType
export const PieceTypeSchema = z.nativeEnum(PieceType);

// Grid is a 2D array of numbers (0-7 currently, but number is safe)
export const GridSchema = z.array(z.array(z.number()));

// Schema for the Piece class (simplified serialization)
// We might just save x, y, type, rotation
export const SerializedPieceSchema = z.object({
    type: PieceTypeSchema,
    x: z.number(),
    y: z.number(),
    rotation: z.number().int().min(0).max(3),
});

export const GameStateSchema = z.object({
    score: z.number().nonnegative(),
    linesCleared: z.number().nonnegative(),
    level: z.number().positive(),
    grid: GridSchema,
    currentPiece: SerializedPieceSchema.nullable(),
    nextPieceType: PieceTypeSchema,
    seed: z.union([z.string(), z.number()]).optional(), // For PRNG state
    prngState: z.number().optional(), // Internal state of Mulberry32
    unlockedMilestones: z.array(z.string()).optional(),
});

export type SerializedGameState = z.infer<typeof GameStateSchema>;
