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

class Logger {
	private colorful: boolean;

	constructor(colorful: boolean) {
		this.colorful = colorful;
	}

	/* Config Methods */
	public setColorful(colorful: boolean) {
		this.colorful = colorful;
	}

	/* Logging Methods */
	public debug(msg: any) {
		var out = "[DEBUG] " + msg;
		if(this.colorful){
			out = colors.bold(out);
			out = colors.cyan(out);
		}
		console.log(out);
	}

	public info(msg: any) {
		var out = "[INFO] " + msg;
		if(this.colorful){
			out = colors.bold(out);
			out = colors.white(out);
		}
		console.log(out);
	}

	public warn(msg: any) {
		var out = "[WARN] " + msg;
		if(this.colorful){
			out = colors.bold(out);
			out = colors.yellow(out);
		}
		console.log(out);
	}

	public error(msg: any) {
		var out = "[ERROR] " + msg;
		if(this.colorful){
			out = colors.bold(out);
			out = colors.red(out);
		}
		console.log(out);
	}

	public fatal(msg: any) {
		var out = "[FATAL] " + msg;
		if(this.colorful) {
			out = colors.bgRed(out);
			out = colors.yellow(out);
			out = colors.bold(out);
		}
		console.log(out);
	}

	/* Shorthand Logging */
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