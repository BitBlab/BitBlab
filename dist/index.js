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
 * This is the main entrypoint for the BitBlab Server application.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
var expressapp_1 = require("./expressapp");
var log_1 = require("./log");
/* Globals */
var log = new log_1.Logger(true);
var app = new expressapp_1.ExpressApp();
/* Functions */
function stopServer() {
    log.i("Stopping BitBlab...");
    app.stop(function () {
        log.i("Exiting.");
        process.exit();
    });
}
/* Program Main */
log.i("Starting BitBlab...");
// Setup Express
app.setLogger(log);
app.listen();
// Setup Graceful Exiting
process.on("SIGTERM", stopServer);
process.on("SIGINT", stopServer);
