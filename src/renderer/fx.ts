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
