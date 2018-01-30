"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PORT = 3000;
const PUBLIC_FOLDER = "public";
const MORGAN_MODE = "dev";
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const serveStatic = require("serve-static");
const path = require("path");
class ExpressApp {
    constructor() {
        this.app = express();
        this.configureApp();
    }
    configureApp() {
        this.app.set('port', process.env.PORT || PORT);
        this.app.use(morgan(MORGAN_MODE));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(methodOverride());
        this.app.use(serveStatic(path.join(__dirname, PUBLIC_FOLDER)));
    }
    getApp() {
        return this.app;
    }
    getServer() {
        return this.server;
    }
    setLogger(log) {
        this.log = log;
    }
    getLogger() {
        return this.log;
    }
    listen() {
        const _this = this;
        this.server = this.app.listen(this.app.get("port"), function () {
            if (_this.log)
                _this.log.i("Express Server Listening on " + _this.app.get("port"));
        });
    }
    stop(callback) {
        const _this = this;
        if (this.log)
            this.log.i("Stopping Express Server (10s timeout)...");
        this.server.close(function () {
            if (_this.log)
                _this.log.i("Express Server Stopped.");
            callback();
        });
        setTimeout(function () {
            if (_this.log)
                _this.log.w("Express Failed to Close Connections!");
            callback();
        }, 10000);
    }
}
exports.ExpressApp = ExpressApp;
