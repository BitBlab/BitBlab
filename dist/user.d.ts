/// <reference types="socket.io" />
declare class User {
    private socket;
    constructor(socket: SocketIO.Socket);
    private setupSocket();
}
export { User };
