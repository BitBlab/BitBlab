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
				_this.isAlreadyDB().then(function(isDB):Promise<any> {
					if(isDB) {
						if(log)
							log.d("is db");
						return _this.checkIntegrity();
					}else{
						if(log)
							log.d("is not db");
						return _this.initDB();
						
					}
				}).then((val: any) => {
					_this.ready = true;
					if(callback)
						callback(true);
				}).catch(() => {
					if(log)
						log.f("Database Error During Initialization!");
					if(callback)
						callback(false);
				});
				
			}
		});
	}

	/* Private Methods */
	private isAlreadyDB(): Promise<boolean> {
		/* todo here: check if the database has any tables/data at all
		 * if it does, return true
		 * if not, return false
		 *
		 * note: this is not supposed to check if the tables are correct, see
		 * checkIntegrity() for that
		 */
		 let db = this.db;
		 let log = this.log;
		 var promise = new Promise<boolean>(
		 	(resolve, reject) =>
		 		{
		 			if(db === undefined)
		 				reject();
		 			else {
		 				db.all("SELECT name FROM sqlite_master WHERE type='table' AND NOT name='sqlite_master'", 
		 					(err, rows) => 
		 						{
		 							if(err) {
		 								log.e("Database check query failed! " + err);
		 								reject(err);
		 							}
		 							if(rows && rows.length > 0)
		 								resolve(true);
		 							else
		 								resolve(false);
		 						}
		 					);
		 			}
		 		}
		 	);

		return promise;
	}
	private checkIntegrity(): Promise<boolean> {
		/* todo here: do quick checks on the tables.
		 * if the tables are ok, return true
		 * if not, attempt to fix them (if possible)
		 * if fixing succeeds, return true, else return false
		 */
		 var promise = new Promise<boolean>(
		 	(resolve, reject) => {
		 		resolve(false);
		 	}
		 );

		return promise;
	}
	private initDB(): Promise<void> {
		/* todo here: create a new database with the correct table structure.
		 * this should only be called by the constructor if isAlreadyDB() is false
		 */
		 let db = this.db;
		 var promise = new Promise<void>(
		 	(resolve, reject) => {
		 		resolve();
		 	}
		 );


		 return promise;
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
