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
 * This file contains the database class used by the server to store users
 * and other data.
 *
 */

/* Imports */
import * as sqlite from "sqlite3";
import * as fs     from "fs";

import {Logger} from "./log"

/* Classes */
class Database {
	private log: Logger;
	private db: sqlite.Database;
	private ready: boolean = false;
	private error: boolean = false;

	constructor(filePath: string, callback?: Function, log?: Logger) {
		let _this = this;

		if(log)
			this.log = log;
		
		var fileExists = fs.existsSync(filePath);

		this.db = new sqlite.Database(filePath, sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE, function(err){
			if(err) {
				_this.error = true;
				if(log){
					log.f("Failed to open database '" + filePath + "'!");
					log.f("Error Message: " + err);
				}
				if(callback)
					callback(false);
			}else{
				if(!_this.isAlreadyDB()) {
					_this.initDB();
					_this.ready = true;
					if(callback)
						callback(true);
				}else{
					if(_this.checkIntegrity()) {

					}else{
						if(log)
							log.f("DB Exists but has errors!");
						if(callback)
							callback(false);
					}
				}

				
			}
		});
	}

	/* Private Methods */
	private isAlreadyDB(): boolean {
		/* todo here: check if the database has any tables/data at all
		 * if it does, return true
		 * if not, return false
		 *
		 * note: this is not supposed to check if the tables are correct, see
		 * checkIntegrity() for that
		 */
		return false;
	}
	private checkIntegrity(): boolean {
		/* todo here: do quick checks on the tables.
		 * if the tables are ok, return true
		 * if not, attempt to fix them (if possible)
		 * if fixing succeeds, return true, else return false
		 */
		return false;
	}
	private initDB() {
		/* todo here: create a new database with the correct table structure.
		 * this should only be called by the constructor if isAlreadyDB() is false
		 */
	}

	/* Getters and Setters */
	public isReady(): boolean {
		return this.ready;
	}
	public hasError(): boolean {
		return !this.error;
	}

	/* Other Public Methods */
	public close() {
		if(this.log)
			this.log.i("Closing Database...");
		this.db.close();
	}
}

/* Exports */
export {Database}
