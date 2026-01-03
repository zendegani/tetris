import { describe, it, expect } from 'vitest';
import { RandomGenerator } from './random';
import { PieceType } from './piece';

describe('RandomGenerator', () => {
    it('should generate a piece type from the valid set', () => {
        const gen = new RandomGenerator();
        const piece = gen.next();
        expect(Object.values(PieceType)).toContain(piece);
    });

    it('should be deterministic with the same seed', () => {
        const seed = 'tetris-vibe-test-seed';
        const gen1 = new RandomGenerator(seed);
        const gen2 = new RandomGenerator(seed);

        const sequence1 = Array.from({ length: 10 }, () => gen1.next());
        const sequence2 = Array.from({ length: 10 }, () => gen2.next());

        expect(sequence1).toEqual(sequence2);
    });

    it('should produce different sequences with different seeds', () => {
        const gen1 = new RandomGenerator('seed-a');
        const gen2 = new RandomGenerator('seed-b');

        const sequence1 = Array.from({ length: 20 }, () => gen1.next());
        const sequence2 = Array.from({ length: 20 }, () => gen2.next());

        expect(sequence1).not.toEqual(sequence2);
    });

    it('should maintain a relatively uniform distribution (anti-7-bag check)', () => {
        const gen = new RandomGenerator('distribution-test');
        const samples = 10000;
        const counts: Record<number, number> = {};

        for (let i = 0; i < samples; i++) {
            const p = gen.next();
            counts[p] = (counts[p] || 0) + 1;
        }

        // With 7 pieces, expected is ~1428 per piece. 
        // We check if all 7 types were generated at least once and within reasonable bounds.
        const uniquePieces = Object.keys(counts).length;
        expect(uniquePieces).toBe(7);

        Object.values(counts).forEach(count => {
            // 10000 / 7 = 1428. 1000-1800 is a safe bound for true random noise.
            expect(count).toBeGreaterThan(1000);
            expect(count).toBeLessThan(2000);
        });
    });
});
