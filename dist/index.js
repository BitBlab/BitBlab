"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expressapp_1 = require("./expressapp");
const socketserver_1 = require("./socketserver");
const log_1 = require("./log");
const log = new log_1.Logger(log_1.LogLevel.DEBUG, true);
var app = new expressapp_1.ExpressApp();
var ss;
function stopServer() {
    log.i("Stopping BitBlab...");
    app.stop(function () {
        log.i("Exiting.");
        process.exit();
    });
}
log.i("Starting BitBlab...");
app.setLogger(log);
app.listen();
ss = new socketserver_1.SocketServer(app, log);
process.on("SIGTERM", stopServer);
process.on("SIGINT", stopServer);
