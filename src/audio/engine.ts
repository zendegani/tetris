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
