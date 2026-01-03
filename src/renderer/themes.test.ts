import { describe, it, expect, beforeEach } from 'vitest';
import { ThemeManager } from './themes';

describe('ThemeManager', () => {
    let themes: ThemeManager;

    beforeEach(() => {
        themes = new ThemeManager();
    });

    it('should have "neon" as default active palette', () => {
        expect(themes.getActivePaletteId()).toBe('neon');
        expect(themes.getActiveColors().primary).toBe('#00faff');
    });

    it('should return default unlocked palettes when no milestones unlocked', () => {
        const available = themes.getAvailablePalettes([]);

        // "neon" should be there
        expect(available.some(p => p.id === 'neon')).toBe(true);

        // "matrix" requires 'first-contact', should NOT be there
        expect(available.some(p => p.id === 'matrix')).toBe(false);
    });

    it('should unlock "matrix" when "first-contact" milestone is present', () => {
        const available = themes.getAvailablePalettes(['first-contact']);

        expect(available.some(p => p.id === 'matrix')).toBe(true);
    });

    it('should unlock multiple themes based on milestones', () => {
        const available = themes.getAvailablePalettes(['first-contact', 'high-flyer']);

        expect(available.some(p => p.id === 'matrix')).toBe(true); // first-contact
        expect(available.some(p => p.id === 'sunset')).toBe(true); // high-flyer
        expect(available.some(p => p.id === 'royal')).toBe(false); // tetris-master missing
    });

    it('should switch theme correctly', () => {
        const success = themes.setTheme('matrix');
        expect(success).toBe(true);
        expect(themes.getActivePaletteId()).toBe('matrix');
        expect(themes.getActiveColors().bg).toBe('#000000');
    });

    it('should return false when setting unknown theme', () => {
        const success = themes.setTheme('unknown-theme');
        expect(success).toBe(false);
        expect(themes.getActivePaletteId()).toBe('neon'); // unchanged
    });
});
