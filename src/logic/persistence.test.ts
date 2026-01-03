import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { PersistenceManager } from './persistence';
import { z } from 'zod';

// Define a simple test schema
const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    preferences: z.object({
        theme: z.enum(['dark', 'light']),
    }),
});

// Mock LocalStorage for Node environment
const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: vi.fn((key: string) => store[key] || null),
        setItem: vi.fn((key: string, value: string) => {
            store[key] = value.toString();
        }),
        removeItem: vi.fn((key: string) => {
            delete store[key];
        }),
        clear: vi.fn(() => {
            store = {};
        }),
    };
})();


Object.defineProperty(global, 'localStorage', { value: localStorageMock });
Object.defineProperty(global, 'window', {
    value: {
        localStorage: localStorageMock
    }
});

describe('PersistenceManager', () => {
    let persistence: PersistenceManager;

    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
        persistence = new PersistenceManager('test:');
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('should save and load valid data', () => {
        const data = {
            id: 1,
            name: 'VibeCoder',
            preferences: { theme: 'dark' as const },
        };

        persistence.save('user', data);
        const loaded = persistence.load('user', UserSchema);

        expect(loaded).toEqual(data);
    });

    it('should return null when loading non-existent key', () => {
        const loaded = persistence.load('ghost', UserSchema);
        expect(loaded).toBeNull();
    });

    it('should return null when schema validation fails', () => {
        // Save corrupted data (missing 'name')
        const corruptedData = {
            id: 1,
            // name missing
            preferences: { theme: 'dark' },
        };

        // Manually write to storage to bypass type safety if we were using it in save
        // But since save takes 'any' or 'T', we can just pass the corrupted object
        persistence.save('user', corruptedData);

        const loaded = persistence.load('user', UserSchema);
        expect(loaded).toBeNull();
    });

    it('should return null when data is malformed JSON', () => {
        localStorage.setItem('test:user', '{ invalid json ');
        const loaded = persistence.load('user', UserSchema);
        expect(loaded).toBeNull();
    });

    it('should isolate keys with prefix', () => {
        persistence.save('foo', { id: 1, name: 'A', preferences: { theme: 'dark' as const } });

        // Raw check
        expect(localStorage.getItem('test:foo')).not.toBeNull();
        expect(localStorage.getItem('foo')).toBeNull();
    });
});
