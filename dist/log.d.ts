declare class Logger {
    private colorful;
    constructor(colorful: boolean);
    setColorful(colorful: boolean): void;
    debug(msg: any): void;
    info(msg: any): void;
    warn(msg: any): void;
    error(msg: any): void;
    fatal(msg: any): void;
    d(msg: any): void;
    i(msg: any): void;
    w(msg: any): void;
    e(msg: any): void;
    f(msg: any): void;
}
export { Logger };
