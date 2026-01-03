export type SFXType = 'move' | 'rotate' | 'lock' | 'line-clear' | 'tetris' | 'level-up' | 'game-over';

export class AudioEngine {
    private ctx: AudioContext | null = null;
    private masterGain: GainNode | null = null;
    private isInitialized: boolean = false;

    constructor() {
        // We defer creation until start() to respect browser autoplay policies
    }

    public playSFX(type: SFXType): void {
        if (!this.ctx || !this.masterGain) return;
        const t = this.ctx.currentTime;

        switch (type) {
            case 'move':
                this.playOscillator(t, 'triangle', 800, 0.05, 0.1);
                break;
            case 'rotate':
                this.playSweep(t, 400, 800, 0.1);
                break;
            case 'lock':
                this.playLock(t);
                break;
            case 'line-clear':
                this.playChord(t, [523.25, 659.25, 783.99], 0.3); // C Major
                break;
            case 'tetris':
                this.playChord(t, [523.25, 659.25, 783.99, 1046.50], 0.6); // C Major + Octave
                break;
            case 'level-up':
                this.playSweep(t, 200, 800, 0.5);
                break;
            case 'game-over':
                this.playSweep(t, 100, 40, 1.0);
                break;
        }
    }

    private playOscillator(t: number, type: OscillatorType, freq: number, duration: number, vol: number): void {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(vol, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + duration);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(t);
        osc.stop(t + duration);
    }

    private playSweep(t: number, startFreq: number, endFreq: number, duration: number): void {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(startFreq, t);
        osc.frequency.exponentialRampToValueAtTime(endFreq, t + duration);

        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + duration);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(t);
        osc.stop(t + duration);
    }

    private playLock(t: number): void {
        // Fast pitch drop thud
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(150, t);
        osc.frequency.exponentialRampToValueAtTime(40, t + 0.1);

        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(t);
        osc.stop(t + 0.15);
    }

    private playChord(t: number, freqs: number[], duration: number): void {
        freqs.forEach((f, i) => {
            // Stagger slightly for arpeggio effect
            const startT = t + i * 0.05;
            this.playOscillator(startT, 'triangle', f, duration, 0.1);
        });
    }


    public async suspend(): Promise<void> {
        if (this.ctx && this.ctx.state === 'running') {
            await this.ctx.suspend();
        }
    }

    public async resume(): Promise<void> {
        if (this.ctx && this.ctx.state === 'suspended') {
            await this.ctx.resume();
        }
    }

    public async start(): Promise<void> {
        if (this.isInitialized) {
            await this.resume();
            return;
        }

        this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.3; // Default volume 30%
        this.masterGain.connect(this.ctx.destination);

        this.isInitialized = true;

        if (this.ctx.state === 'suspended') {
            await this.ctx.resume();
        }

    }


    public setVolume(value: number): void {
        if (this.masterGain) {
            // Clamp between 0 and 1
            const gain = Math.max(0, Math.min(1, value));
            this.masterGain.gain.setTargetAtTime(gain, this.ctx!.currentTime, 0.1);
        }
    }

    public destroy(): void {
        if (this.ctx) this.ctx.close();

        this.isInitialized = false;
    }
}
