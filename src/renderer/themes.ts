export interface Palette {
    id: string;
    name: string;
    requiredMilestoneId?: string; // If undefined, unlocked by default
    colors: {
        primary: string; // Neon Stroke
        accent: string;  // Glow / Secondary
        bg: string;      // Background
        grid: string;    // Grid Line
        ghost: string;   // Ghost color
    };
}

export class ThemeManager {
    private palettes: Palette[];
    private activePaletteId: string;

    constructor() {
        this.palettes = [];
        this.activePaletteId = 'neon';
        this.initPalettes();
    }

    private initPalettes() {
        this.palettes = [
            {
                id: 'neon',
                name: 'Neon Core',
                colors: {
                    primary: '#00faff',
                    accent: '#ff00ff',
                    bg: '#050505',
                    grid: '#1a1a1a',
                    ghost: 'rgba(255, 255, 255, 0.2)'
                }
            },
            {
                id: 'matrix',
                name: 'The Matrix',
                requiredMilestoneId: 'first-contact',
                colors: {
                    primary: '#00ff41',
                    accent: '#008f11',
                    bg: '#000000',
                    grid: '#0d3b0d',
                    ghost: 'rgba(0, 255, 65, 0.2)'
                }
            },
            {
                id: 'sunset',
                name: 'Vaporwave Sunset',
                requiredMilestoneId: 'high-flyer',
                colors: {
                    primary: '#ff71ce',
                    accent: '#01cdfe',
                    bg: '#2b0f3a',
                    grid: '#561d6e',
                    ghost: 'rgba(255, 113, 206, 0.2)'
                }
            },
            {
                id: 'royal',
                name: 'Royal Gold',
                requiredMilestoneId: 'tetris-master',
                colors: {
                    primary: '#ffd700',
                    accent: '#4169e1',
                    bg: '#000033',
                    grid: '#191970',
                    ghost: 'rgba(255, 215, 0, 0.2)'
                }
            }
        ];
    }

    public getAvailablePalettes(unlockedMilestoneIds: string[]): Palette[] {
        const unlockedSet = new Set(unlockedMilestoneIds);
        return this.palettes.filter(p => {
            // If no required milestone, it's always available (default)
            if (!p.requiredMilestoneId) return true;
            // Otherwise, check if user has unlocked it
            return unlockedSet.has(p.requiredMilestoneId);
        });
    }

    public setTheme(id: string): boolean {
        // TODO: Implement logic (validate if unlocked?)
        // For now, allow setting if it exists
        if (this.palettes.find(p => p.id === id)) {
            this.activePaletteId = id;
            return true;
        }
        return false;
    }

    public getActiveColors() {
        const palette = this.palettes.find(p => p.id === this.activePaletteId);
        return palette ? palette.colors : this.palettes[0].colors;
    }

    public getActivePaletteId(): string {
        return this.activePaletteId;
    }
}
