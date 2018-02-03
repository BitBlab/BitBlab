import * as sqlite from "sqlite3";
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
    getRawDB(): sqlite.Database | null;
    close(): Promise<boolean>;
}
export { Database };
