/// <reference types="socket.io" />
declare class User {
    private socket;
    private isAuthed;
    private username;
    private userType;
    private colors;
    private balance;
    constructor(socket: SocketIO.Socket);
    private setupSocket();
}
export { User };
