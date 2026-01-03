import { PieceType } from './piece';

/**
 * A seeded pseudo-random number generator using the Mulberry32 algorithm.
 * Provides deterministic sequence generation based on a seed.
 */
export class RandomGenerator {
    private seed: number;
    private readonly pieceTypes: PieceType[] = [
        PieceType.I,
        PieceType.J,
        PieceType.L,
        PieceType.O,
        PieceType.S,
        PieceType.T,
        PieceType.Z,
    ];

    constructor(seed?: string | number) {
        this.seed = this.hashSeed(seed);
    }

    /**
     * Hashes an arbitrary input into a 32-bit integer seed.
     */
    private hashSeed(seed?: string | number): number {
        if (seed === undefined) return Math.floor(Math.random() * 0xFFFFFFFF);
        if (typeof seed === 'number') return seed;

        // Simple FNV-like string hash
        let h = 2166136261 >>> 0;
        for (let i = 0; i < seed.length; i++) {
            h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
        }
        return h >>> 0;
    }

    /**
     * Mulberry32 algorithm
     * Returns a number between 0 (inclusive) and 1 (exclusive).
     */
    private random(): number {
        let t = this.seed += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }

    /**
     * Generates the next piece type using true random selection.
     */
    public next(): PieceType {
        const index = Math.floor(this.random() * this.pieceTypes.length);
        return this.pieceTypes[index];
    }

    /**
     * Resets the generator with a new seed.
     */
    public reseed(seed: string | number): void {
        this.seed = this.hashSeed(seed);
    }

    /**
     * Returns the current state (seed) for serialization.
     * Note: Mulberry32 state is just the current 'seed' value which mutates.
     */
    public getState(): number {
        return this.seed;
    }

    public setState(state: number): void {
        this.seed = state;
    }
}
