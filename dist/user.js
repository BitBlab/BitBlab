"use strict";
/**
 * This file is part of BitBlab.
 *
 * BitBlab is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * BitBlab is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with BitBlab.  If not, see <http://www.gnu.org/licenses/>.
 *
 *************************************************************************
 *
 * This file contains user-related classes
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
/* Imports */
/* Classes */
var User = /** @class */ (function () {
    function User(socket) {
        this.socket = socket;
    }
    /* Private Methods */
    User.prototype.setupSocket = function () {
    };
    return User;
}());
exports.User = User;