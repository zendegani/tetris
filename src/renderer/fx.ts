export class PulseEffect {
    private active: boolean = false;
    private duration: number = 500;
    private timeElapsed: number = 0;
    private color: string = '#00faff';

    public trigger(color: string = '#00faff'): void {
        this.active = true;
        this.timeElapsed = 0;
        this.color = color;
    }

    public update(dt: number): void {
        if (!this.active) return;
        this.timeElapsed += dt;
        if (this.timeElapsed >= this.duration) {
            this.active = false;
        }
    }

    public isActive(): boolean {
        return this.active;
    }

    public getAlpha(): number {
        if (!this.active) return 0;
        // Linear fade out
        return 1 - (this.timeElapsed / this.duration);
    }

    public getColor(): string {
        return this.color;
    }
}

export class ShakeEffect {
    private active: boolean = false;
    private duration: number = 0;
    private timeElapsed: number = 0;
    private intensity: number = 0;
    private currentOffset: { x: number, y: number } = { x: 0, y: 0 };
    private enabled: boolean = true;

    public setEnabled(enabled: boolean): void {
        this.enabled = enabled;
    }

    public trigger(intensity: number = 5, duration: number = 200): void {
        if (!this.enabled) return;
        this.active = true;
        this.intensity = intensity;
        this.duration = duration;
        this.timeElapsed = 0;
    }

    public update(dt: number): void {
        if (!this.active) return;

        this.timeElapsed += dt;
        if (this.timeElapsed >= this.duration) {
            this.active = false;
            this.currentOffset = { x: 0, y: 0 };
            return;
        }

        // Dampen intensity over time
        const progress = this.timeElapsed / this.duration;
        const currentIntensity = this.intensity * (1 - progress);

        // Random jitter
        this.currentOffset.x = (Math.random() - 0.5) * 2 * currentIntensity;
        this.currentOffset.y = (Math.random() - 0.5) * 2 * currentIntensity;
    }

    public getOffset(): { x: number, y: number } {
        return this.currentOffset;
    }
}
