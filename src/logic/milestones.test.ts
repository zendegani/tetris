import { describe, it, expect, beforeEach } from 'vitest';
import { MilestoneManager, GameStats } from './milestones';

describe('MilestoneManager', () => {
    let milestones: MilestoneManager;

    beforeEach(() => {
        milestones = new MilestoneManager();
    });

    it('should initialize with all milestones jailed (locked)', () => {
        const unlocked = milestones.getUnlockedIds();
        expect(unlocked).toEqual([]);
    });

    it('should unlock "first-contact" when lines cleared >= 1', () => {
        const stats: GameStats = {
            score: 100,
            level: 1,
            linesCleared: 1,
            lastLineClearCount: 1
        };

        const newlyUnlocked = milestones.check(stats);

        expect(newlyUnlocked).toHaveLength(1);
        expect(newlyUnlocked[0].id).toBe('first-contact');
        expect(milestones.getUnlockedIds()).toContain('first-contact');
    });

    it('should not re-unlock already unlocked milestones', () => {
        const stats: GameStats = {
            score: 100,
            level: 1,
            linesCleared: 1,
            lastLineClearCount: 1
        };

        // First check unlocks it
        milestones.check(stats);

        // Second check with same stats should return empty array
        const newlyUnlocked = milestones.check(stats);
        expect(newlyUnlocked).toEqual([]);

        // But it should still be in the list of unlocked IDs
        expect(milestones.getUnlockedIds()).toContain('first-contact');
    });

    it('should unlock multiple milestones if requirements met simultaneously', () => {
        // Example: Clearing 4 lines (Tetris) at level 1 to get 1st line and Tetris Master
        // Wait, 'First Contact' is lines >= 1. 'Tetris Master' is lastClear == 4.

        const stats: GameStats = {
            score: 800,
            level: 5, // Triggers High Flyer
            linesCleared: 4, // Triggers First Contact
            lastLineClearCount: 4 // Triggers Tetris Master
        };

        const newlyUnlocked = milestones.check(stats);
        const ids = newlyUnlocked.map(m => m.id);

        expect(ids).toContain('first-contact');
        expect(ids).toContain('high-flyer');
        expect(ids).toContain('tetris-master');
    });

    it('should restore state from string IDs', () => {
        milestones.loadUnlockedIds(['first-contact', 'high-flyer']);

        const unlocked = milestones.getUnlockedIds();
        expect(unlocked).toHaveLength(2);
        expect(unlocked).toContain('first-contact');
        expect(unlocked).toContain('high-flyer');
        expect(unlocked).not.toContain('tetris-master');
    });
});
