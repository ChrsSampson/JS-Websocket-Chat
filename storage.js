const fs = require("fs");
const path = require("path");
const { v4 } = require("uuid");

class Storage {
    constructor(entity = "user", filePath = "/data") {
        this.path = path.join(__dirname + filePath + "/" + entity + ".json");
        this.bucket = {};
        this.init();
    }

    init() {
        const exists = fs.existsSync(this.path);
        if (!exists) {
            this.writeStorage();
        } else {
            this.readStorage();
        }
    }

    readStorage() {
        this.bucket = JSON.parse(fs.readFileSync(this.path));
    }

    writeStorage() {
        fs.writeFileSync(this.path, JSON.stringify(this.bucket));
    }

    createId() {
        return v4();
    }

    add(value) {
        const id = this.createId();
        this.bucket[id] = { id, data: value };
        this.writeStorage();
        return this.getAll();
    }

    getOne(id) {
        return this.bucket[id] || null;
    }

    remove(id) {
        delete this.bucket[id];
        this.writeStorage();
    }

    getAll() {
        return Object.values(this.bucket).map((item) => {
            return item;
        });
    }
}

module.exports = Storage;
