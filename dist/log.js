"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colors = require("colors");
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 1] = "INFO";
    LogLevel[LogLevel["WARN"] = 2] = "WARN";
    LogLevel[LogLevel["ERROR"] = 3] = "ERROR";
    LogLevel[LogLevel["FATAL"] = 4] = "FATAL";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
class Logger {
    constructor(level, colorful) {
        this.colorful = true;
        this.level = LogLevel.DEBUG;
        this.TAG = ["DEBUG", "INFO", "WARN", "ERROR", "FATAL"];
        if (colorful !== undefined)
            this.colorful = colorful;
        if (level !== undefined)
            this.level = level;
    }
    setColorful(colorful) {
        this.colorful = colorful;
    }
    setLevel(level) {
        this.level = level;
    }
    log(level, msg) {
        if (level < this.level)
            return;
        var out = "[" + this.TAG[level] + "] " + msg;
        if (this.colorful) {
            out = colors.bold(out);
            switch (level) {
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
    debug(msg) {
        this.log(LogLevel.DEBUG, msg);
    }
    info(msg) {
        this.log(LogLevel.INFO, msg);
    }
    warn(msg) {
        this.log(LogLevel.WARN, msg);
    }
    error(msg) {
        this.log(LogLevel.ERROR, msg);
    }
    fatal(msg) {
        this.log(LogLevel.FATAL, msg);
    }
    l(level, msg) {
        this.log(level, msg);
    }
    d(msg) {
        this.debug(msg);
    }
    i(msg) {
        this.info(msg);
    }
    w(msg) {
        this.warn(msg);
    }
    e(msg) {
        this.error(msg);
    }
    f(msg) {
        this.fatal(msg);
    }
}
exports.Logger = Logger;
