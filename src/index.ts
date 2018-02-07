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
 * This is the main entrypoint for the BitBlab Server application.
 *
 */

/* Imports */
import * as bcrypt   from "bcrypt";
import * as socketio from "socket.io";
import * as path     from "path";
import * as http     from "http";

import {Database}       from "./database";
import {ExpressApp}   from "./expressapp";
import {SocketServer} from "./socketserver"

import {Logger, LogLevel} from "./log";

/* Constants */
const DB_FILE = "db.sqlite";

/* Globals */
const log = new Logger(LogLevel.DEBUG, true);
var app = new ExpressApp();
var ss: SocketServer;
var db: Database;

/* Functions */
function stopServer() {
	log.i("Stopping BitBlab...");
	app.stop(function() {
		db.close().then((success: boolean) => {
			if(!success)
				log.e("Database did not close nicely!");
			log.i("Process Exiting.");
			process.exit();
		});
	});
}

/* Setup Graceful Exiting */
process.on("SIGTERM", stopServer);
process.on("SIGINT", stopServer);

/* Program Main */
log.i("Starting BitBlab...");


db = new Database(DB_FILE, function(success: boolean){
	if(!success){
		log.f("Required Database Setup Failed! Shutting down.");
		stopServer();
	}else{
		log.i("Database Ready!");
		app.setLogger(log);
		app.listen(function(){
			ss = new SocketServer(app, log);
		});
	}
}, log);


log.i("BitBlab started!");
