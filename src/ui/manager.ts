export class UIManager {
    private scoreEl: HTMLElement;
    private levelEl: HTMLElement;
    private linesEl: HTMLElement;
    private timeEl: HTMLElement;
    private overlayPause: HTMLElement;
    private overlayGameOver: HTMLElement;
    private finalScoreEl: HTMLElement;
    private btnRestart: HTMLElement;
    private toastContainer: HTMLElement;
    private themeSelect: HTMLSelectElement;
    private simToggle: HTMLInputElement;
    private simControls: HTMLElement;
    private levelOverride: HTMLInputElement;
    private levelDisplay: HTMLElement;
    private simIndicator: HTMLElement;

    constructor() {
        // Cache DOM elements
        this.scoreEl = document.getElementById('score-value')!;
        this.levelEl = document.getElementById('level-value')!;
        this.linesEl = document.getElementById('lines-value')!;
        this.timeEl = document.getElementById('time-value')!;
        this.overlayPause = document.getElementById('overlay-pause')!;
        this.overlayGameOver = document.getElementById('overlay-gameover')!;
        this.finalScoreEl = document.getElementById('final-score')!;
        this.btnRestart = document.getElementById('btn-restart')!;
        this.toastContainer = document.getElementById('toast-container')!;
        this.themeSelect = document.getElementById('theme-select') as HTMLSelectElement;

        // Sim Controls
        this.simToggle = document.getElementById('sim-mode-toggle') as HTMLInputElement;
        this.simControls = document.getElementById('sim-controls')!;
        this.levelOverride = document.getElementById('level-override') as HTMLInputElement;
        this.levelDisplay = document.getElementById('level-display')!;
        this.simIndicator = document.getElementById('sim-indicator')!;

        // Check for missing elements to fail fast
        if (!this.scoreEl || !this.levelEl || !this.linesEl || !this.toastContainer || !this.themeSelect || !this.simToggle || !this.simIndicator) {
            console.error('UIManager: Missing HUD elements');
        }

        // Bind internal events
        this.btnRestart.addEventListener('click', () => {
            // Reload page for hard reset
            window.location.reload();
        });
    }

    public bindThemeSelector(
        themeManager: any,
        unlockedMilestoneIds: string[]
    ) {
        // Populate options
        const palettes = themeManager.getAvailablePalettes(unlockedMilestoneIds);
        this.themeSelect.innerHTML = '';

        palettes.forEach((p: any) => {
            const opt = document.createElement('option');
            opt.value = p.id;
            opt.text = p.name;
            this.themeSelect.appendChild(opt);
        });

        // Set current
        this.themeSelect.value = themeManager.getActivePaletteId();

        // Bind change
        this.themeSelect.addEventListener('change', (e) => {
            const target = e.target as HTMLSelectElement;
            themeManager.setTheme(target.value);
            target.blur();

            // Dispatch event for persistence
            window.dispatchEvent(new CustomEvent('theme-change', { detail: target.value }));
        });
    }

    public bindSimControls(
        callbacks: {
            onToggleMode: (isPractice: boolean) => void;
            onLevelChange: (level: number) => void;
        }
    ) {
        this.simToggle.addEventListener('change', (e) => {
            const isPractice = (e.target as HTMLInputElement).checked;
            callbacks.onToggleMode(isPractice);

            if (isPractice) {
                this.simControls.classList.remove('hidden');
                this.simIndicator.classList.remove('hidden');
            } else {
                this.simControls.classList.add('hidden');
                this.simIndicator.classList.add('hidden');
            }
        });

        this.levelOverride.addEventListener('input', (e) => {
            const val = parseInt((e.target as HTMLInputElement).value);
            this.levelDisplay.innerText = val.toString();
            callbacks.onLevelChange(val);
        });
    }

    public updateStats(score: number, level: number, lines: number): void {
        this.scoreEl.innerText = score.toString();
        this.levelEl.innerText = level.toString();
        this.linesEl.innerText = lines.toString();
    }

    public updateTime(seconds: number): void {
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        this.timeEl.innerText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }

    public showPause(): void {
        this.overlayPause.classList.remove('hidden');
    }

    public hidePause(): void {
        this.overlayPause.classList.add('hidden');
    }

    public togglePause(isPaused: boolean): void {
        if (isPaused) {
            this.showPause();
        } else {
            this.hidePause();
        }
    }

    public showGameOver(finalScore: number): void {
        this.finalScoreEl.innerText = finalScore.toString();
        this.overlayGameOver.classList.remove('hidden');
    }

    public showToast(title: string, message: string): void {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<h4>${title}</h4><p>${message}</p>`;

        this.toastContainer.appendChild(toast);

        // Remove after animation (3s + buffer)
        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.5s ease-out forwards';
            setTimeout(() => {
                toast.remove();
            }, 500);
        }, 3000);
    }
}
