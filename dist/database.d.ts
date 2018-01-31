import { Logger } from "./log";
declare class Database {
    private log;
    private db;
    private ready;
    private error;
    constructor(filePath: string, callback?: Function, log?: Logger);
    private isAlreadyDB();
    private checkIntegrity();
    private initDB();
    isReady(): boolean;
    hasError(): boolean;
    close(): void;
}
export { Database };
