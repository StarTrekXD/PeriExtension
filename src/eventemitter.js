class EventEmitter {
    constructor() {
        this.events = {}
    }

    on(a, callback) {
        this.events[a] = this.events[a] || [];
        this.events[a].push({
            id: new Date().getTime(),
            code: callback,
            type: "on"
        });
        return this
    }

    emit(a, ...arg) {
        if (this.events[a]) {
            this.events[a].forEach(b => {
                b["code"](...arg);
                switch (b["type"]) {
                    case "once":
                        this.events[a] = elementdelete(this.events[a], b);
                        break;

                }
            });
        }
    }

    once(a, callback) {
        this.events[a] = this.events[a] || [];
        this.events[a].push({
            id: new Date().getTime(),
            code: callback,
            type: "once"
        });
        return this
    }
}

function elementdelete(a, b) {
    if (a.includes(b)) {
        return a.splice(a.indexOf(b), 1)
    };
    return a
}

module.exports = EventEmitter;