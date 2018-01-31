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
 * This file provides nicer logging functionality.
 *
 */

import * as colors from "colors";

export enum LogLevel {
	DEBUG = 0,
	INFO = 1,
	WARN = 2,
	ERROR = 3,
	FATAL = 4
}

class Logger {
	private colorful: boolean = true;
	private level: number = LogLevel.DEBUG;
	private TAG: string[] = ["DEBUG", "INFO", "WARN", "ERROR", "FATAL"];

	constructor(level?: LogLevel, colorful?: boolean) {
		if(colorful !== undefined)
			this.colorful = colorful;
		if(level !== undefined)
			this.level = level;
		
	}

	/* Config Methods */
	public setColorful(colorful: boolean) {
		this.colorful = colorful;
	}

	public setLevel(level: LogLevel) {
		this.level = level;
	}

	/* Logging Methods */
	public log(level: LogLevel, msg: any) {
		if(level < this.level)
			return;

		var out = "[" + this.TAG[level] + "] " + msg;
		if(this.colorful){
			out = colors.bold(out);
			switch(level) {
				case LogLevel.DEBUG:
					out = colors.cyan(out);
					break;
				case LogLevel.INFO:
					out = colors.white(out);
					break;
				case LogLevel.WARN:
					out = colors.yellow(out);
					break;
				case LogLevel.ERROR:
					out = colors.red(out);
					break;
				case LogLevel.FATAL:
					out = colors.bgRed(out);
					out = colors.yellow(out);
					break;
			}
		}
		
		console.log(out);
	}

	public debug(msg: any) {
		this.log(LogLevel.DEBUG, msg);
	}

	public info(msg: any) {
		this.log(LogLevel.INFO, msg);
	}

	public warn(msg: any) {
		this.log(LogLevel.WARN, msg);
	}

	public error(msg: any) {
		this.log(LogLevel.ERROR, msg);
	}

	public fatal(msg: any) {
		this.log(LogLevel.FATAL, msg);
	}

	/* Shorthand Logging */
	public l(level: LogLevel, msg: any) {
		this.log(level, msg);
	}
	
	public d(msg: any) {
		this.debug(msg);
	}

	public i(msg: any) {
		this.info(msg);
	}

	public w(msg: any) {
		this.warn(msg);
	}

	public e(msg: any) {
		this.error(msg);
	}

	public f(msg: any) {
		this.fatal(msg);
	}
}


export {Logger};
//export {LogLevel}