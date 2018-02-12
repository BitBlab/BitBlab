"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketio = require("socket.io");
const user_1 = require("./user");
const log_1 = require("./log");
class SocketServer {
    constructor(app, log) {
        this.app = app;
        if (log)
            this.log = log;
        else
            this.log = new log_1.Logger(log_1.LogLevel.INFO);
        this.io = socketio.listen(app.getServer());
        this.setupServer();
        this.log.i("Socket.IO Server Configured and Listening");
    }
    setupServer() {
        let io = this.io;
        let log = this.log;
        let _this = this;
        io.sockets.on("connection", function (socket) {
            log.d("Socket Connected: " + socket.id);
            const user = new user_1.User(socket);
            _this.users.push(user);
        });
    }
    setLogger(log) {
        if (log)
            this.log = log;
    }
    getLogger() {
        return this.log;
    }
    getUsers() {
        return this.users;
    }
}
exports.SocketServer = SocketServer;
