export class UIManager {
    private scoreEl: HTMLElement;
    private levelEl: HTMLElement;
    private linesEl: HTMLElement;
    private overlayPause: HTMLElement;
    private overlayGameOver: HTMLElement;
    private finalScoreEl: HTMLElement;
    private btnRestart: HTMLElement;
    private toastContainer: HTMLElement;

    constructor() {
        // Cache DOM elements
        this.scoreEl = document.getElementById('score-value')!;
        this.levelEl = document.getElementById('level-value')!;
        this.linesEl = document.getElementById('lines-value')!;
        this.overlayPause = document.getElementById('overlay-pause')!;
        this.overlayGameOver = document.getElementById('overlay-gameover')!;
        this.finalScoreEl = document.getElementById('final-score')!;
        this.btnRestart = document.getElementById('btn-restart')!;
        this.toastContainer = document.getElementById('toast-container')!;

        // Check for missing elements to fail fast
        if (!this.scoreEl || !this.levelEl || !this.linesEl || !this.toastContainer) {
            console.error('UIManager: Missing HUD elements');
        }

        // Bind internal events
        this.btnRestart.addEventListener('click', () => {
            // Reload page for hard reset
            window.location.reload();
        });
    }

    public updateStats(score: number, level: number, lines: number): void {
        this.scoreEl.innerText = score.toString();
        this.levelEl.innerText = level.toString();
        this.linesEl.innerText = lines.toString();
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
