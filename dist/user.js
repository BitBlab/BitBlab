"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(socket) {
        this.isAuthed = false;
        this.username = "";
        this.userType = -1;
        this.colors = [];
        this.balance = 0.0;
        this.socket = socket;
    }
    setupSocket() {
    }
}
exports.User = User;
