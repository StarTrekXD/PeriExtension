const JsonSerializer = require("./jsonserializer")
const Convert = require("./convert")
class TempDB {
    constructor({
        intervalDuration = 3600 // 1 hours \ 3600 second
    }) {
        this.events = {};
        this.json = new JsonSerializer()
        setInterval(() => {
            this.events.reset.forEach(a => {
                a(Convert.Code(this.json.json));
            });
            this.json = new JsonSerializer();
        }, intervalDuration * 1000)
    }

    on(type, callback) {
        this.events[type] = this.events[type] || [];
        this.events[type].push(callback);
    }

    reset() {
        this.events.reset.forEach(a => {
            a(Convert.Code(this.json.json));
        });
        this.json = new JsonSerializer();
    }

    get(name) {
        return this.json.get(name)
    }
    /// todo client.on("restartingdb",func)
    has(a) {
        return this.json.has(a)
    }

    set(name, value) {
        this.json.set(name, value)
    }

    delete(a) {
        this.json.delete(a)
    }

    push(a, b) {
        this.json.push(a, b)
    }

    add(a, b) {
        this.json.add(a, b)
    }

    elementdelete(a, b) {
        this.json.elementdelete(a, b)
    }

    size() {
        return Object.keys(this.json.json).length
    }

    length() {
        return Object.keys(this.json.json).length
    }

}
module.exports = TempDB;
