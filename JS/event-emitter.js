class EventEmitter {
    listeners = {};

    on(event, listener) {
        if (this.listeners[event]) {
            throw Error("Event is already registered")
        }

        if (event && listener) {
            this.listeners[event] = listener;
        }
    }
    off(event, listener) { }
    emit(event, ...args) { }
}


const eventEmitter = new EventEmitter();

eventEmitter.on("start", () => { console.log("start") })
eventEmitter.on("starts", () => { console.log("start") })