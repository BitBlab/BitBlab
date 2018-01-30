export declare enum LogLevel {
    DEBUG = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3,
    FATAL = 4,
}
declare class Logger {
    private colorful;
    private level;
    private TAG;
    constructor(level?: LogLevel, colorful?: boolean);
    setColorful(colorful: boolean): void;
    setLevel(level: LogLevel): void;
    log(level: LogLevel, msg: any): void;
    debug(msg: any): void;
    info(msg: any): void;
    warn(msg: any): void;
    error(msg: any): void;
    fatal(msg: any): void;
    l(level: LogLevel, msg: any): void;
    d(msg: any): void;
    i(msg: any): void;
    w(msg: any): void;
    e(msg: any): void;
    f(msg: any): void;
}
export { Logger };
