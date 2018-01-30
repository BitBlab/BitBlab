"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketio = require("socket.io");
const user_1 = require("./user");
class SocketServer {
    constructor(app, log) {
        this.app = app;
        if (log)
            this.log = log;
        this.io = socketio.listen(app.getServer());
        this.setupServer();
        if (this.log)
            this.log.i("Socket.IO Server Configured and Listening");
    }
    setupServer() {
        let io = this.io;
        let log = this.log;
        let _this = this;
        io.sockets.on("connection", function (socket) {
            if (log)
                log.d("Socket Connected: " + socket.id);
            var user = new user_1.User(socket);
            _this.users.push(user);
        });
    }
    setLogger(log) {
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
