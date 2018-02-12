"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite = require("sqlite3");
const fs = require("fs");
const log_1 = require("./log");
const TABLE_USER_SQL = "CREATE TABLE IF NOT EXISTS users (" +
    "id PRIMARY KEY," +
    "username text NOT NULL," +
    "password text NOT NULL," +
    "salt text NOT NULL," +
    "type integer NOT NULL," +
    "balance real NOT NULL)";
const TABLE_ROOM_SQL = "CREATE TABLE IF NOT EXISTS rooms (" +
    "id PRIMARY KEY," +
    "name text NOT NULL," +
    "owner text NOT NULL," +
    "topic text NOT NULL," +
    "private integer NOT NULL," +
    "allowed_users text)";
class Database {
    constructor(filePath, callback, log) {
        this.ready = false;
        this.error = false;
        let _this = this;
        if (log)
            this.log = log;
        else {
            this.log = new log_1.Logger(log_1.LogLevel.INFO);
        }
        const fileExists = fs.existsSync(filePath);
        this.db = new sqlite.Database(filePath, sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE, function (err) {
            if (err) {
                _this.error = true;
                _this.log.f("Failed to open database '" + filePath + "'!");
                _this.log.f("Error Message: " + err);
                if (callback)
                    callback(false);
            }
            else {
                _this.isAlreadyDB().then(function (isDB) {
                    if (isDB) {
                        _this.log.d("is db");
                        return _this.checkIntegrity();
                    }
                    else {
                        _this.log.d("is not db");
                        return _this.initDB();
                    }
                }).then((val) => {
                    if (val !== undefined && val === false) {
                        _this.log.e("Database failed integrity check!");
                        if (callback)
                            callback(false);
                        return;
                    }
                    _this.ready = true;
                    if (callback)
                        callback(true);
                }).catch(() => {
                    _this.log.f("Database Error During Initialization!");
                    if (callback)
                        callback(false);
                });
            }
        });
    }
    isAlreadyDB() {
        let db = this.db;
        let log = this.log;
        const promise = new Promise((resolve, reject) => {
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
        let db = this.db;
        let log = this.log;
        const promise = new Promise((resolve, reject) => {
            if (!db)
                reject();
            db.get("SELECT sql FROM sqlite_master WHERE type='table' AND name='users'", (err, row) => {
                if (err) {
                    log.e(err);
                    resolve(false);
                }
                else {
                    const cmp = TABLE_USER_SQL.replace("IF NOT EXISTS ", "");
                    if (row.sql != cmp) {
                        log.d(row.sql);
                        log.d(cmp);
                        resolve(false);
                    }
                    else {
                        db.get("SELECT sql FROM sqlite_master WHERE type='table' AND name='rooms'", (err, row) => {
                            if (err) {
                                log.e(err);
                                resolve(false);
                            }
                            else {
                                const cmp = TABLE_ROOM_SQL.replace("IF NOT EXISTS ", "");
                                if (row.sql != cmp) {
                                    log.d(row.sql);
                                    resolve(false);
                                }
                                else
                                    resolve(true);
                            }
                        });
                    }
                }
            });
        });
        return promise;
    }
    initDB() {
        let db = this.db;
        const promise = new Promise((resolve, reject) => {
            db.run(TABLE_USER_SQL, (err) => {
                if (!err) {
                    db.run(TABLE_ROOM_SQL, (err) => {
                        if (err)
                            reject(err);
                        else
                            resolve();
                    });
                }
                else {
                    reject(err);
                }
            });
        });
        return promise;
    }
    isReady() {
        return this.ready;
    }
    hasError() {
        return !this.error;
    }
    getRawDB() {
        if (this.ready)
            return this.db;
        else
            return null;
    }
    close() {
        let log = this.log;
        let db = this.db;
        const promise = new Promise((resolve, reject) => {
            if (!db) {
                reject();
                return;
            }
            if (log)
                log.i("Closing Database...");
            db.close((err) => {
                if (err) {
                    log.e(err);
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        });
        return promise;
    }
}
exports.Database = Database;
