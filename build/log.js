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
 * This file provides nicer logging functionality.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
var colors = require("colors");
var Logger = /** @class */ (function () {
    function Logger(colorful) {
        this.colorful = colorful;
    }
    /* Config Methods */
    Logger.prototype.setColorful = function (colorful) {
        this.colorful = colorful;
    };
    /* Logging Methods */
    Logger.prototype.debug = function (msg) {
        var out = "[DEBUG] " + msg;
        if (this.colorful)
            out = colors.cyan(out);
        console.log(out);
    };
    Logger.prototype.info = function (msg) {
        var out = "[INFO] " + msg;
        if (this.colorful)
            out = colors.white(out);
        console.log(out);
    };
    Logger.prototype.warn = function (msg) {
        var out = "[WARN] " + msg;
        if (this.colorful)
            out = colors.yellow(out);
        console.log(out);
    };
    Logger.prototype.error = function (msg) {
        var out = "[ERROR] " + msg;
        if (this.colorful)
            out = colors.red(out);
        console.log(out);
    };
    Logger.prototype.fatal = function (msg) {
        var out = "[FATAL] " + msg;
        if (this.colorful) {
            out = colors.red(out);
            out = colors.bold(out);
        }
        console.log(out);
    };
    return Logger;
}());
exports.Logger = Logger;
