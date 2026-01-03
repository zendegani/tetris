export class CanvasRenderer {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private container: HTMLElement;

    // Base resolution for the game grid (logical pixels)
    // We can scale this up via CSS, but internally we draw to this or a multiple of it.
    // Actually, for crisp rendering, we usually want internal match with physical pixels.
    // But for now, let's just handle the resizing and clearing.

    constructor(containerId: string) {
        const container = document.getElementById(containerId);
        if (!container) {
            throw new Error(`Container element #${containerId} not found`);
        }
        this.container = container;

        // clear container
        this.container.innerHTML = '';

        this.canvas = document.createElement('canvas');
        this.container.appendChild(this.canvas);

        const context = this.canvas.getContext('2d');
        if (!context) {
            throw new Error('Could not get 2D context');
        }
        this.ctx = context;

        this.resize = this.resize.bind(this);
        window.addEventListener('resize', this.resize);
        this.resize();
    }

    private resize(): void {
        const { clientWidth, clientHeight } = this.container;
        const dpr = window.devicePixelRatio || 1;

        // Set actual size in memory (scaled to account for extra pixel density)
        this.canvas.width = clientWidth * dpr;
        this.canvas.height = clientHeight * dpr;

        // Normalize coordinate system to use css pixels
        this.ctx.scale(dpr, dpr);

        // Set visible size
        this.canvas.style.width = `${clientWidth}px`;
        this.canvas.style.height = `${clientHeight}px`;

        // Disable smoothing for pixel art look (optional, but fits Tetris Vibe)
        this.ctx.imageSmoothingEnabled = false;
    }

    public clear(): void {
        // Clear with the dark background color
        this.ctx.fillStyle = '#050505';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public getContext(): CanvasRenderingContext2D {
        return this.ctx;
    }

    public destroy(): void {
        window.removeEventListener('resize', this.resize);
        this.canvas.remove();
    }
}
