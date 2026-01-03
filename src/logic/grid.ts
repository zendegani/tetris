export class Grid {
    private cells: number[][];
    private readonly columns: number = 10;
    private readonly rows: number = 20;

    constructor() {
        this.cells = this.createEmptyGrid();
    }

    private createEmptyGrid(): number[][] {
        return Array.from({ length: this.rows }, () => Array(this.columns).fill(0));
    }

    public reset(): void {
        this.cells = this.createEmptyGrid();
    }

    public getCell(x: number, y: number): number {
        if (this.isValidCoordinate(x, y)) {
            return this.cells[y][x];
        }
        return -1; // Out of bounds
    }

    public setCell(x: number, y: number, value: number): void {
        if (this.isValidCoordinate(x, y)) {
            this.cells[y][x] = value;
        }
    }

    public isValidCoordinate(x: number, y: number): boolean {
        return x >= 0 && x < this.columns && y >= 0 && y < this.rows;
    }

    public getRawGrid(): number[][] {
        // Return a copy to maintain encapsulation
        return this.cells.map(row => [...row]);
    }

    public getGridRef(): number[][] {
        // Direct access for high-performance rendering (READ ONLY!)
        return this.cells;
    }

    public getWidth(): number {
        return this.columns;
    }

    public getHeight(): number {
        return this.rows;
    }
}
