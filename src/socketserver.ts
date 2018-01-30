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

/* Imports */
import * as socketio from "socket.io"

import {ExpressApp} from "./expressapp"
import {User}       from "./user"
import {Logger}     from "./log"

/* Classes */
class SocketServer {
	private app: ExpressApp;
	private io: SocketIO.Server;
	private users: User[];

	private log: Logger;

	constructor(app: ExpressApp, log?: Logger) {
		this.app = app;
		if(log)
			this.log = log;
		this.io = socketio.listen(app.getServer());

		this.setupServer();
		if(this.log)
			this.log.i("Socket.IO Server Configured and Listening");
	}

	/* Private Methods */
	private setupServer() {
		let io = this.io;
		let log = this.log;
		let _this = this;

		io.sockets.on("connection", function(socket) {
			if(log)
				log.d("Socket Connected: " + socket.id);
			var user = new User(socket);
			_this.users.push(user);
		});
	}

	/* Getters and Setters */
	public setLogger(log: Logger) {
		this.log = log;
	}
	public getLogger(): Logger {
		return this.log;
	}
	public getUsers(): User[] {
		return this.users;
	}

	/* Other Public Methods */

}

/* Exports */
export {SocketServer}