const JsonSerializer = require("./jsonserializer")
const eventemitter = require("./eventemitter")
class TempDB extends eventemitter {
    constructor({
        intervalDuration = 3600 // 1 hours \ 3600 second
    }) {
        this.json = new JsonSerializer()
        setInterval(() => {
            this.emit("reset", this.json.json)
            this.json = new JsonSerializer();
        }, intervalDuration * 1000)
    }

    reset() {
        this.emit("reset", this.json.json)
        this.json = new JsonSerializer();
    }

    get(name) {
        var dei = this.json.get(name);
        this.emit("get", name, dei)
        return dei
    }
    has(a) {
        return this.json.has(a)
    }

    set(name, value) {
        this.json.set(name, value)
        this.emit("set", name, value)
    }

    delete(a) {
        this.json.delete(a)
        this.emit("delete", a)
    }

    push(a, b) {
        this.json.push(a, b)
        this.emit("push", a, b)
    }

    add(a, b) {
        this.json.add(a, b)
        this.emit("add", a, b)
    }

    elementdelete(a, b) {
        this.json.elementdelete(a, b)
        this.emit("elementdelete", a, b)
    }

    size() {
        return Object.keys(this.json.json).length
    }

    length() {
        return Object.keys(this.json.json).length
    }
}

module.exports = TempDB;