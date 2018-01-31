"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite = require("sqlite3");
const fs = require("fs");
class Database {
    constructor(filePath, callback, log) {
        this.ready = false;
        this.error = false;
        let _this = this;
        if (log)
            this.log = log;
        var fileExists = fs.existsSync(filePath);
        this.db = new sqlite.Database(filePath, sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE, function (err) {
            if (err) {
                _this.error = true;
                if (log) {
                    log.f("Failed to open database '" + filePath + "'!");
                    log.f("Error Message: " + err);
                }
                if (callback)
                    callback(false);
            }
            else {
                if (!_this.isAlreadyDB()) {
                    _this.initDB();
                    _this.ready = true;
                    if (callback)
                        callback(true);
                }
                else {
                    if (_this.checkIntegrity()) {
                    }
                    else {
                        if (log)
                            log.f("DB Exists but has errors!");
                        if (callback)
                            callback(false);
                    }
                }
            }
        });
    }
    isAlreadyDB() {
        return false;
    }
    checkIntegrity() {
        return false;
    }
    initDB() {
    }
    isReady() {
        return this.ready;
    }
    hasError() {
        return !this.error;
    }
    close() {
        if (this.log)
            this.log.i("Closing Database...");
        this.db.close();
    }
}
exports.Database = Database;
