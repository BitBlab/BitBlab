/// <reference types="express" />
/// <reference types="node" />
import * as express from "express";
import * as http from "http";
import { Logger } from "./log";
declare class ExpressApp {
    private app;
    private server;
    private log;
    constructor(log?: Logger);
    private configureApp();
    getApp(): express.Express;
    getServer(): http.Server;
    setLogger(log: Logger): void;
    getLogger(): Logger;
    listen(callback?: Function): void;
    stop(callback: Function): void;
}
export { ExpressApp };
