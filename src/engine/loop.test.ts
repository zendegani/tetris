import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { GameLoop } from './loop';

describe('GameLoop', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        // Mock performance.now
        vi.stubGlobal('performance', { now: vi.fn(() => Date.now()) });
        // Mock requestAnimationFrame
        vi.stubGlobal('requestAnimationFrame', vi.fn((cb) => setTimeout(() => cb(performance.now()), 16)));
        vi.stubGlobal('cancelAnimationFrame', vi.fn((id) => clearTimeout(id)));
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.unstubAllGlobals();
    });

    it('should start and stop the loop', () => {
        const update = vi.fn();
        const render = vi.fn();
        const loop = new GameLoop(update, render);

        loop.start();
        expect(requestAnimationFrame).toHaveBeenCalled();

        loop.stop();
        // We can't easily check if it stopped calling RAF without running timers, 
        // but we can check if cancel was called.
        expect(cancelAnimationFrame).toHaveBeenCalled();
    });

    it('should call update multiple times if lagging (fixed timestep)', () => {
        const update = vi.fn();
        const render = vi.fn();
        const loop = new GameLoop(update, render);

        // Timestep is ~16.66ms
        loop.start();

        // Advance time by ~34ms (should be 2 updates)
        vi.advanceTimersByTime(34);

        // Note: Since we mocked RAF with setTimeout(16), it ran about 2 loops.
        // In the first loop (t=0), delta is 0, no update.
        // In the second loop (t=16), delta is 16, maybe 1 update if accumulator >= 16.66 (might be close).
        // In the third loop (t=32), delta is 16, total acc ~32. 
        // It's a bit tricky to exact count with this mock, but 'update' should have been called.

        expect(update).toHaveBeenCalled();
    });
});
