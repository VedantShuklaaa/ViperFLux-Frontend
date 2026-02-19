type Callback = (data: any) => void;

class EventBus {
    private events: Map<string, Callback[]> = new Map();

    subscribe(event: string, callback: Callback): (() => void) {
        if (!this.events.has(event)) {
            this.events.set(event, [])
        }
        this.events.get(event)!.push(callback);

        return () => this.unsubscribe(event, callback)
    }

    emit(event: string, data?: any) {
        const callbacks = this.events.get(event);
        if (callbacks) {
            callbacks.forEach(cb => cb(data));
        }
    }

    unsubscribe(event: string, callback: Callback) {
        const callbacks = this.events.get(event);
        if (callbacks) {
            this.events.set(event, callbacks.filter(cb => cb !== callback));
        }
    }
}

export const eventBus = new EventBus();