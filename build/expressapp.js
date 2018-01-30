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
 * This file contains the ExpressApp class that is used to create the main
 * web server used by the application.
 *
 * Note: portions of this file are based on https://blog.risingstack.com/building-a-node-js-app-with-typescript-tutorial/
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
/* Constants */
var PORT = 3000;
var PUBLIC_FOLDER = "public";
var MORGAN_MODE = "dev";
/* Imports */
var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var serveStatic = require("serve-static");
var path = require("path");
/* Classes */
var ExpressApp = /** @class */ (function () {
    function ExpressApp() {
        this.app = express();
        this.configureApp();
    }
    ExpressApp.prototype.configureApp = function () {
        this.app.set('port', process.env.PORT || PORT);
        this.app.use(morgan(MORGAN_MODE));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(methodOverride());
        this.app.use(serveStatic(path.join(__dirname, PUBLIC_FOLDER)));
    };
    return ExpressApp;
}());
/* Exports */
exports.default = new ExpressApp().app;
