"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const expressapp_1 = require("./expressapp");
const socketserver_1 = require("./socketserver");
const log_1 = require("./log");
const DB_FILE = "db.sqlite";
const log = new log_1.Logger(log_1.LogLevel.DEBUG, true);
var app = new expressapp_1.ExpressApp();
var ss;
var db;
function stopServer() {
    log.i("Stopping BitBlab...");
    app.stop(function () {
        db.close().then((success) => {
            if (!success)
                if (log)
                    log.e("Database did not close nicely!");
            log.i("Process Exiting.");
            process.exit();
        });
    });
}
process.on("SIGTERM", stopServer);
process.on("SIGINT", stopServer);
log.i("Starting BitBlab...");
db = new database_1.Database(DB_FILE, function (success) {
    if (!success) {
        log.f("Required Database Setup Failed! Shutting down.");
        stopServer();
    }
    else {
        log.i("Database Ready!");
        app.setLogger(log);
        app.listen(function () {
            ss = new socketserver_1.SocketServer(app, log);
        });
    }
}, log);
log.i("BitBlab started!");
