type EventCallback = (data?: any) => void;

export class EventEmitter {
    private listeners: Record<string, EventCallback[]> = {};

    public on(event: string, callback: EventCallback): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    public emit(event: string, data?: any): void {
        if (this.listeners[event]) {
            this.listeners[event].forEach(cb => cb(data));
        }
    }

    public off(event: string, callback: EventCallback): void {
        if (!this.listeners[event]) return;
        this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }
}
