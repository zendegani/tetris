import seedrandom from 'seedrandom';
import { PieceType } from './piece';

export class RandomGenerator {
    private rng: seedrandom.PRNG;
    private readonly pieceTypes: PieceType[] = [
        PieceType.I,
        PieceType.J,
        PieceType.L,
        PieceType.O,
        PieceType.S,
        PieceType.T,
        PieceType.Z,
    ];

    constructor(seed?: string) {
        this.rng = seedrandom(seed);
    }

    /**
     * Generates the next piece type using true random selection.
     * This explicitly avoids the modern "7-bag" system to maintain 
     * classic mechanical authenticity.
     */
    public next(): PieceType {
        const index = Math.floor(this.rng() * this.pieceTypes.length);
        return this.pieceTypes[index];
    }

    /**
     * Resets the generator with a new seed.
     */
    public reseed(seed: string): void {
        this.rng = seedrandom(seed);
    }
}
