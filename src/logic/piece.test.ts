import { describe, it, expect } from 'vitest';
import { Piece, PieceType, PIECE_DEFINITIONS } from './piece';

describe('Piece', () => {
    it('should initialize with correct type and position', () => {
        const piece = new Piece(PieceType.I, 5, 2);
        expect(piece.type).toBe(PieceType.I);
        expect(piece.x).toBe(5);
        expect(piece.y).toBe(2);
        expect(piece.getRotation()).toBe(0);
    });

    it('should return blocks centered on x,y with rotation offset', () => {
        const piece = new Piece(PieceType.O, 0, 0);
        const blocks = piece.getBlocks();

        // O piece rotation 0: [{1,0}, {2,0}, {1,1}, {2,1}]
        expect(blocks).toContainEqual({ x: 1, y: 0 });
        expect(blocks).toContainEqual({ x: 2, y: 0 });
        expect(blocks).toContainEqual({ x: 1, y: 1 });
        expect(blocks).toContainEqual({ x: 2, y: 1 });
    });

    it('should cycle through 4 rotations', () => {
        const piece = new Piece(PieceType.T);
        expect(piece.getRotation()).toBe(0);

        piece.rotate();
        expect(piece.getRotation()).toBe(1);

        piece.rotate();
        expect(piece.getRotation()).toBe(2);

        piece.rotate();
        expect(piece.getRotation()).toBe(3);

        piece.rotate();
        expect(piece.getRotation()).toBe(0);
    });

    it('should allow peeking at the next rotation without state change', () => {
        const piece = new Piece(PieceType.Z, 0, 0);
        const currentRotation = piece.getRotation();
        const nextBlocks = piece.peekNextRotation();

        expect(piece.getRotation()).toBe(currentRotation);

        // Z piece rotation 1 offset: [{2,0}, {1,1}, {2,1}, {1,2}]
        expect(nextBlocks).toContainEqual({ x: 2, y: 0 });
        expect(nextBlocks).toContainEqual({ x: 1, y: 1 });
        expect(nextBlocks).toContainEqual({ x: 2, y: 1 });
        expect(nextBlocks).toContainEqual({ x: 1, y: 2 });
    });

    it('should ensure the O piece does not effectively rotate', () => {
        const piece = new Piece(PieceType.O, 0, 0);
        const r0 = piece.getBlocks();
        piece.rotate();
        const r1 = piece.getBlocks();

        expect(r0).toEqual(r1);
    });

    it('should have 7 distinct definitions', () => {
        const types = Object.keys(PIECE_DEFINITIONS);
        expect(types.length).toBe(7);
    });
});
