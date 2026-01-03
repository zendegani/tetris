import { describe, it, expect, beforeEach } from 'vitest';
import { Grid } from './grid';

describe('Grid', () => {
    let grid: Grid;

    beforeEach(() => {
        grid = new Grid();
    });

    it('should initialize with an empty 10x20 grid', () => {
        expect(grid.getWidth()).toBe(10);
        expect(grid.getHeight()).toBe(20);
        const raw = grid.getRawGrid();
        expect(raw.length).toBe(20);
        expect(raw[0].length).toBe(10);

        // Check all cells are 0
        raw.forEach(row => {
            row.forEach(cell => {
                expect(cell).toBe(0);
            });
        });
    });

    it('should allow setting and getting cell values', () => {
        grid.setCell(0, 0, 1);
        grid.setCell(9, 19, 7);

        expect(grid.getCell(0, 0)).toBe(1);
        expect(grid.getCell(9, 19)).toBe(7);
    });

    it('should return -1 for out of bounds coordinates', () => {
        expect(grid.getCell(-1, 0)).toBe(-1);
        expect(grid.getCell(10, 0)).toBe(-1);
        expect(grid.getCell(0, -1)).toBe(-1);
        expect(grid.getCell(0, 20)).toBe(-1);
    });

    it('should reset the grid to all zeros', () => {
        grid.setCell(5, 5, 2);
        expect(grid.getCell(5, 5)).toBe(2);

        grid.reset();
        expect(grid.getCell(5, 5)).toBe(0);
    });

    it('should validate coordinates correctly', () => {
        expect(grid.isValidCoordinate(0, 0)).toBe(true);
        expect(grid.isValidCoordinate(9, 19)).toBe(true);
        expect(grid.isValidCoordinate(10, 10)).toBe(false);
        expect(grid.isValidCoordinate(-1, 5)).toBe(false);
    });
});
