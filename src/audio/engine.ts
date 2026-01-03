export type SFXType = 'move' | 'rotate' | 'lock' | 'line-clear' | 'tetris' | 'level-up' | 'game-over';

export class AudioEngine {
    private ctx: AudioContext | null = null;
    private masterGain: GainNode | null = null;
    private droneOsc: OscillatorNode | null = null;
    private lfoOsc: OscillatorNode | null = null;
    private isInitialized: boolean = false;
    private droneStarted: boolean = false;

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

    public async start(): Promise<void> {
        if (this.isInitialized) return;

        this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.3; // Default volume 30%
        this.masterGain.connect(this.ctx.destination);

        this.isInitialized = true;

        if (this.ctx.state === 'suspended') {
            await this.ctx.resume();
        }

        this.startDrone();
    }

    private startDrone(): void {
        if (!this.ctx || !this.masterGain || this.droneStarted) return;

        // 1. The Drone Source (Low Sawtooth for grit)
        const drone = this.ctx.createOscillator();
        drone.type = 'sawtooth';
        drone.frequency.value = 55; // A1 (Low drone)

        // 2. Filter (Lowpass to darken the sound)
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 120;

        // 3. LFO (Slow modulation of the filter cutoff for "breathing")
        const lfo = this.ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 0.1; // Very slow (10 seconds per cycle)

        const lfoGain = this.ctx.createGain();
        lfoGain.gain.value = 100; // Modulate filter freq by +/- 100Hz

        // Connections
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        drone.connect(filter);
        filter.connect(this.masterGain);

        // Start Oscillators
        drone.start();
        lfo.start();

        this.droneOsc = drone;
        this.lfoOsc = lfo;
        this.droneStarted = true;
    }

    public setVolume(value: number): void {
        if (this.masterGain) {
            // Clamp between 0 and 1
            const gain = Math.max(0, Math.min(1, value));
            this.masterGain.gain.setTargetAtTime(gain, this.ctx!.currentTime, 0.1);
        }
    }

    public destroy(): void {
        if (this.droneOsc) this.droneOsc.stop();
        if (this.lfoOsc) this.lfoOsc.stop();
        if (this.ctx) this.ctx.close();

        this.isInitialized = false;
        this.droneStarted = false;
    }
}
