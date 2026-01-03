type UpdateCallback = (deltaTime: number) => void;
type RenderCallback = (interpolation: number) => void;

export class GameLoop {
    private lastFrameTime: number = 0;
    private accumulator: number = 0;
    private readonly timeStep: number = 1000 / 60; // 60 TPS
    private rafId: number | null = null;

    private onUpdate: UpdateCallback;
    private onRender: RenderCallback;

    constructor(onUpdate: UpdateCallback, onRender: RenderCallback) {
        this.onUpdate = onUpdate;
        this.onRender = onRender;
    }

    public start(): void {
        if (this.rafId !== null) return;
        this.lastFrameTime = performance.now();
        this.loop(this.lastFrameTime);
    }

    public stop(): void {
        if (this.rafId !== null) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }
    }

    private loop = (timestamp: number): void => {
        // Cap max frame time to avoid spiral of death on lag spikes
        let frameTime = timestamp - this.lastFrameTime;
        if (frameTime > 250) {
            frameTime = 250;
        }

        this.lastFrameTime = timestamp;
        this.accumulator += frameTime;

        // Consumption of accumulated time (Fixed Timestep)
        while (this.accumulator >= this.timeStep) {
            this.onUpdate(this.timeStep);
            this.accumulator -= this.timeStep;
        }

        // Interpolation factor for smooth rendering (0.0 to 1.0)
        const interpolation = this.accumulator / this.timeStep;
        this.onRender(interpolation);

        this.rafId = requestAnimationFrame(this.loop);
    };
}
