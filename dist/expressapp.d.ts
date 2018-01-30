/// <reference types="express" />
import * as express from "express";
import { Logger } from "./log";
declare class ExpressApp {
    private app;
    private server;
    private log;
    constructor();
    private configureApp();
    getApp(): express.Express;
    setLogger(log: Logger): void;
    getLogger(): Logger;
    listen(): void;
    stop(callback: Function): void;
}
export { ExpressApp };
