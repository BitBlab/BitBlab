import { ExpressApp } from "./expressapp";
import { User } from "./user";
import { Logger } from "./log";
declare class SocketServer {
    private app;
    private io;
    private users;
    private log;
    constructor(app: ExpressApp, log: Logger);
    private setupServer();
    setLogger(log: Logger): void;
    getLogger(): Logger;
    getUsers(): User[];
}
export { SocketServer };
