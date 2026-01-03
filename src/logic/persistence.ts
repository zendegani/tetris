import { z } from 'zod';

/**
 * Handles safe serialization and deserialization of data to LocalStorage.
 * Uses Zod schemas to ensure data integrity upon loading.
 */
export class PersistenceManager {
    private storage: Storage;
    private prefix: string;

    constructor(prefix: string = 'tetris-vibe:') {
        // Safe check for localStorage availability (e.g. if disabled or node environment)
        try {
            this.storage = window.localStorage;
        } catch (e) {
            console.warn('LocalStorage not available, falling back to memory storage.');
            this.storage = new MemoryStorage();
        }
        this.prefix = prefix;
    }

    /**
     * Saves data to local storage.
     * @param key Identifies the resource (will be prefixed)
     * @param data Data to serialize
     */
    public save<T>(key: string, data: T): void {
        try {
            const serialized = JSON.stringify(data);
            this.storage.setItem(this.prefix + key, serialized);
        } catch (e) {
            console.error('Failed to save state to LocalStorage', e);
        }
    }

    /**
     * Loads and validates data from local storage.
     * @param key Identifies the resource
     * @param schema Zod schema to validate against
     * @returns The parsed data or null if validation fails or input is missing
     */
    public load<T>(key: string, schema: z.ZodSchema<T>): T | null {
        try {
            const raw = this.storage.getItem(this.prefix + key);
            if (!raw) return null;

            const parsed = JSON.parse(raw);
            const result = schema.safeParse(parsed);

            if (result.success) {
                return result.data;
            } else {
                console.warn(`Validation failed for key "${key}":`, result.error);
                return null;
            }
        } catch (e) {
            console.error('Failed to load state from LocalStorage', e);
            return null;
        }
    }

    public clear(key: string): void {
        this.storage.removeItem(this.prefix + key);
    }
}

/**
 * Simple in-memory fallback if localStorage is blocked.
 */
class MemoryStorage implements Storage {
    private data: Record<string, string> = {};

    get length(): number {
        return Object.keys(this.data).length;
    }

    public clear(): void {
        this.data = {};
    }

    public getItem(key: string): string | null {
        return this.data[key] || null;
    }

    public key(index: number): string | null {
        return Object.keys(this.data)[index] || null;
    }

    public removeItem(key: string): void {
        delete this.data[key];
    }

    public setItem(key: string, value: string): void {
        this.data[key] = value;
    }
}
