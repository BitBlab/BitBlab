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

/* Constants */
const TABLE_USER_SQL = "CREATE TABLE IF NOT EXISTS users (" +
		 			   "id PRIMARY KEY," +
		 			   "username text NOT NULL," +
		 			   "password text NOT NULL," +
		 			   "salt text NOT NULL," +
		 			   "type integer NOT NULL," +
		 			   "balance real NOT NULL)";
const TABLE_ROOM_SQL = "CREATE TABLE IF NOT EXISTS rooms (" +
		 			   "id PRIMARY KEY," +
		 			   "name text NOT NULL," +
		 			   "owner text NOT NULL," +
		 			   "topic text NOT NULL," +
		 			   "private integer NOT NULL," +
		 			   "allowed_users text)";

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
				}).then((val?: boolean) => {
					if(val !== undefined && val === false) { //checkIntegrity returns a boolean
						if(log)
							log.e("Database failed integrity check!");
						if(callback)
							callback(false);
						return;
					}
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
		 let db = this.db;
		 let log = this.log;
		 var promise = new Promise<boolean>(
		 	(resolve, reject) => {
		 		if(!db)
		 			reject();

		 		db.get("SELECT sql FROM sqlite_master WHERE type='table' AND name='users'", (err, row) => {
		 			if(err){
		 				if(log)
		 					log.e(err);
		 				resolve(false);
		 			}
		 			else{
		 				if(row.sql != TABLE_USER_SQL){
		 					if(log)
		 						log.d(row.sql);
		 					resolve(false);
		 				}
		 				else {
		 					db.get("SELECT sql FROM sqlite_master WHERE type='table' AND name='rooms'", (err, row) => {
		 						if(err){
					 				if(log)
					 					log.e(err);
					 				resolve(false);
					 			}
					 			else{
					 				if(row.sql != TABLE_ROOM_SQL){
					 					if(log)
					 						log.d(row.sql);
					 					resolve(false);
					 				}else
					 					resolve(true);
					 			}
		 					});
		 				}
		 			}
		 		});
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
		 		db.run(TABLE_USER_SQL, (err) => {
		 			if(!err) {
		 				db.run(TABLE_ROOM_SQL, (err) => {
			 				if(err)
			 					reject(err);
			 				else
			 					resolve();
			 			});
		 			}else{
		 				reject(err);
		 			}
		 		});
		 	}
		 );


		 return promise;
	}

	/* Meta Getters and Setters */
	public isReady(): boolean {
		return this.ready;
	}
	public hasError(): boolean {
		return !this.error;
	}
	public getRawDB(): sqlite.Database|null {
		if(this.ready)
			return this.db;
		else
			return null;
	}

	/* Other Meta Public Methods */
	public close(): Promise<boolean> {
		let log = this.log;
		let db = this.db;
		var promise = new Promise<boolean>(
			(resolve, reject) => {
				if(!db) {
					reject();
					return;
				}
				if(log)
					log.i("Closing Database...");
				db.close((err) => {
					if(err) {
						if(log)
							log.e(err);
						resolve(false);
					}else{
						resolve(true);
					}
				});
			}
		);
		return promise;
	}

	/* Database Operation Methods */
}

/* Exports */
export {Database}
