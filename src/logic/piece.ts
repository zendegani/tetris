export type Point = { x: number; y: number };

export enum PieceType {
    I = 1,
    J = 2,
    L = 3,
    O = 4,
    S = 5,
    T = 6,
    Z = 7,
}

export const PIECE_COLORS: Record<PieceType, string> = {
    [PieceType.I]: '#00faff', // Cyan
    [PieceType.J]: '#0000ff', // Blue
    [PieceType.L]: '#ff7f00', // Orange
    [PieceType.O]: '#ffff00', // Yellow
    [PieceType.S]: '#00ff00', // Lime
    [PieceType.T]: '#800080', // Purple
    [PieceType.Z]: '#ff0000', // Red
};

export type PieceDefinition = {
    type: PieceType;
    rotations: Point[][];
};

export const PIECE_DEFINITIONS: Record<PieceType, PieceDefinition> = {
    [PieceType.I]: {
        type: PieceType.I,
        rotations: [
            [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }],
            [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }],
            [{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }],
            [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 }],
        ],
    },
    [PieceType.J]: {
        type: PieceType.J,
        rotations: [
            [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
            [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }],
            [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 2 }],
            [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }],
        ],
    },
    [PieceType.L]: {
        type: PieceType.L,
        rotations: [
            [{ x: 2, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
            [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2 }],
            [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 0, y: 2 }],
            [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }],
        ],
    },
    [PieceType.O]: {
        type: PieceType.O,
        rotations: [
            [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
            [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
            [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
            [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
        ],
    },
    [PieceType.S]: {
        type: PieceType.S,
        rotations: [
            [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }],
            [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 2 }],
            [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }],
            [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 2 }],
        ],
    },
    [PieceType.T]: {
        type: PieceType.T,
        rotations: [
            [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
            [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }],
            [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }],
            [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 2 }],
        ],
    },
    [PieceType.Z]: {
        type: PieceType.Z,
        rotations: [
            [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
            [{ x: 2, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }],
            [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2 }],
            [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 2 }],
        ],
    },
};

export class Piece {
    public x: number;
    public y: number;
    private rotation: number = 0;
    private definition: PieceDefinition;

    constructor(type: PieceType, x: number = 0, y: number = 0) {
        this.type = type;
        this.definition = PIECE_DEFINITIONS[type];
        this.x = x;
        this.y = y;
    }

    public readonly type: PieceType;

    public getBlocks(): Point[] {
        return this.definition.rotations[this.rotation].map(p => ({
            x: this.x + p.x,
            y: this.y + p.y,
        }));
    }

    public rotate(): void {
        this.rotation = (this.rotation + 1) % 4;
    }

    public getRotation(): number {
        return this.rotation;
    }

    public setRotation(rotation: number): void {
        this.rotation = ((rotation % 4) + 4) % 4;
    }

    public peekNextRotation(): Point[] {
        const nextRotation = (this.rotation + 1) % 4;
        return this.definition.rotations[nextRotation].map(p => ({
            x: this.x + p.x,
            y: this.y + p.y,
        }));
    }
}
