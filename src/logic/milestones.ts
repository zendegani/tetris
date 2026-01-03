export interface GameStats {
    score: number;
    level: number;
    linesCleared: number;
    lastLineClearCount: number; // For "Tetris Master"
}

export interface Milestone {
    id: string;
    name: string;
    description: string;
    condition: (stats: GameStats) => boolean;
    unlocked: boolean;
}

export class MilestoneManager {
    private milestones: Milestone[] = [];

    constructor() {
        this.initMilestones();
    }

    private initMilestones() {
        this.milestones = [
            {
                id: 'first-contact',
                name: 'First Contact',
                description: 'Clear your first line.',
                condition: (stats) => stats.linesCleared >= 1,
                unlocked: false,
            },
            {
                id: 'high-flyer',
                name: 'High Flyer',
                description: 'Reach Level 5.',
                condition: (stats) => stats.level >= 5,
                unlocked: false,
            },
            {
                id: 'tetris-master',
                name: 'Tetris Master',
                description: 'Clear 4 lines at once.',
                condition: (stats) => stats.lastLineClearCount === 4,
                unlocked: false,
            }
        ];
    }

    /**
     * Checks for newly unlocked milestones based on current stats.
     * @param stats Current game statistics
     * @returns Array of newly unlocked milestones
     */
    public check(stats: GameStats): Milestone[] {
        const justUnlocked: Milestone[] = [];

        for (const m of this.milestones) {
            if (!m.unlocked && m.condition(stats)) {
                m.unlocked = true;
                justUnlocked.push(m);
            }
        }

        return justUnlocked;
    }

    public getUnlockedIds(): string[] {
        return this.milestones.filter(m => m.unlocked).map(m => m.id);
    }

    public loadUnlockedIds(ids: string[]): void {
        const idSet = new Set(ids);
        for (const m of this.milestones) {
            if (idSet.has(m.id)) {
                m.unlocked = true;
            }
        }
    }

    public reset(): void {
        this.milestones.forEach(m => m.unlocked = false);
    }
}
