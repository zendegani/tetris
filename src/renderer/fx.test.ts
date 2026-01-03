import { describe, it, expect, beforeEach } from 'vitest';
import { ShakeEffect, PulseEffect } from './fx';

describe('ShakeEffect', () => {
    let shake: ShakeEffect;

    beforeEach(() => {
        shake = new ShakeEffect();
    });

    it('should be inactive initially', () => {
        expect(shake.getOffset()).toEqual({ x: 0, y: 0 });
    });

    it('should calculate offset when triggered and updated', () => {
        shake.trigger(10, 100);
        shake.update(50);

        const offset = shake.getOffset();
        expect(offset.x).not.toBe(0); // Should have some jitter
        expect(offset.y).not.toBe(0);
    });

    it('should deactivate after duration', () => {
        shake.trigger(10, 100);
        shake.update(100); // exact duration
        expect(shake.getOffset()).toEqual({ x: 0, y: 0 });
    });

    it('should respect enabled toggle', () => {
        shake.setEnabled(false);
        shake.trigger(10, 100);
        shake.update(10);
        expect(shake.getOffset()).toEqual({ x: 0, y: 0 });
    });
});

describe('PulseEffect', () => {
    let pulse: PulseEffect;

    beforeEach(() => {
        pulse = new PulseEffect();
    });

    it('should trigger and return active status', () => {
        pulse.trigger('#ff0000');
        expect(pulse.isActive()).toBe(true);
        expect(pulse.getColor()).toBe('#ff0000');
        expect(pulse.getAlpha()).toBe(1);
    });

    it('should decay alpha over time', () => {
        pulse.trigger('#ff0000'); // Duration 500ms default
        pulse.update(250);
        expect(pulse.getAlpha()).toBeCloseTo(0.5);
    });
});
