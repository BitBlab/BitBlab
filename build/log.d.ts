declare class Logger {
    private colorful;
    constructor(colorful: boolean);
    setColorful(colorful: boolean): void;
    debug(msg: string): void;
    info(msg: string): void;
    warn(msg: string): void;
    error(msg: string): void;
    fatal(msg: string): void;
}
export { Logger };
