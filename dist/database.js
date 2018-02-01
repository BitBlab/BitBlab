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
                _this.isAlreadyDB().then(function (isDB) {
                    if (isDB) {
                        if (log)
                            log.d("is db");
                        return _this.checkIntegrity();
                    }
                    else {
                        if (log)
                            log.d("is not db");
                        return _this.initDB();
                    }
                }).then((val) => {
                    _this.ready = true;
                    if (callback)
                        callback(true);
                }).catch(() => {
                    if (log)
                        log.f("Database Error During Initialization!");
                    if (callback)
                        callback(false);
                });
            }
        });
    }
    isAlreadyDB() {
        let db = this.db;
        let log = this.log;
        var promise = new Promise((resolve, reject) => {
            if (db === undefined)
                reject();
            else {
                db.all("SELECT name FROM sqlite_master WHERE type='table' AND NOT name='sqlite_master'", (err, rows) => {
                    if (err) {
                        log.e("Database check query failed! " + err);
                        reject(err);
                    }
                    if (rows && rows.length > 0)
                        resolve(true);
                    else
                        resolve(false);
                });
            }
        });
        return promise;
    }
    checkIntegrity() {
        var promise = new Promise((resolve, reject) => {
            resolve(false);
        });
        return promise;
    }
    initDB() {
        let db = this.db;
        var promise = new Promise((resolve, reject) => {
            resolve();
        });
        return promise;
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
