"use strict";
/**
 * This file is part of BitBlab.
 *
 * BitBlab is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * BitBlab is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with BitBlab.  If not, see <http://www.gnu.org/licenses/>.
 *
 *************************************************************************
 *
 * This file contains the SocketServer class that is used to create the
 * Socket.io server used by the chat server.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
/* Imports */
var socketio = require("socket.io");
var user_1 = require("./user");
/* Classes */
var SocketServer = /** @class */ (function () {
    function SocketServer(app, log) {
        this.app = app;
        if (log)
            this.log = log;
        this.io = socketio.listen(app.getServer());
        this.setupServer();
        if (this.log)
            this.log.i("Socket.IO Server Configured and Listening");
    }
    /* Private Methods */
    SocketServer.prototype.setupServer = function () {
        var io = this.io;
        var log = this.log;
        var _this = this;
        io.sockets.on("connection", function (socket) {
            if (log)
                log.d("Socket Connected: " + socket.id);
            var user = new user_1.User(socket);
            _this.users.push(user);
        });
    };
    /* Getters and Setters */
    SocketServer.prototype.setLogger = function (log) {
        this.log = log;
    };
    SocketServer.prototype.getLogger = function () {
        return this.log;
    };
    SocketServer.prototype.getUsers = function () {
        return this.users;
    };
    return SocketServer;
}());
exports.SocketServer = SocketServer;
