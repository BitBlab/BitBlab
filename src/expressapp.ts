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
 * This file contains the ExpressApp class that is used to create the main
 * web server used by the application.
 *
 * Note: portions of this file are based on https://blog.risingstack.com/building-a-node-js-app-with-typescript-tutorial/
 *
 */

/* Constants */
const PORT: number = 3000;
const PUBLIC_FOLDER: string = "public";
const MORGAN_MODE: string = "dev";

/* Imports */
import * as express        from "express";
import * as morgan         from "morgan";
import * as bodyParser     from "body-parser";
import * as methodOverride from "method-override";
import * as serveStatic    from "serve-static";
import * as errorHandler   from "errorhandler";
import * as path           from "path";
import * as http           from "http";

import {Logger, LogLevel} from "./log";

/* Classes */
class ExpressApp {
	private app: express.Express;
	private server: http.Server;
	private log: Logger;

	constructor(log?: Logger) {
		this.app = express();
		this.configureApp();
		if(log)
			this.log = log;
		else
			this.log = new Logger(LogLevel.INFO);
	}
	/* Private Methods */
	private configureApp() {
		this.app.set('port', process.env.PORT || PORT);
		this.app.use(morgan(MORGAN_MODE));
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({extended:true}));
		this.app.use(methodOverride());
		this.app.use(serveStatic(path.join(__dirname, PUBLIC_FOLDER)));
	}

	/* Getter and Setter Methods */
	public getApp(): express.Express {
		return this.app;
	}

	public getServer(): http.Server {
		return this.server;
	}

	public setLogger(log: Logger) {
		if(log)
			this.log = log;
	}

	public getLogger(): Logger {
		return this.log;
	}

	/* Other Public Methods */
	public listen(callback?: Function) {
		const _this = this;
		this.server = this.app.listen(this.app.get("port"), function(){
			_this.log.i("Express Server Listening on " + _this.app.get("port"));
			if(callback)
				callback();
		});
	}

	public stop(callback: Function) {
		const _this = this;
		if(!this.server){
			callback();
			return;
		}
		this.log.i("Stopping Express Server (10s timeout)...");

		this.server.close(function() {
			_this.log.i("Express Server Stopped.");
			callback();
		});

		setTimeout(function() {
			_this.log.w("Express Failed to Close Connections!");
			callback();
		}, 10000); //timeout after 10 sec
	}
}

/* Exports */
export {ExpressApp};