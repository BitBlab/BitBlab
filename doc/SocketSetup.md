# Socket.IO Setup (Proposed)
In the first iteration of BitBlab, we had lots of issues with separating public messages, private messages, and command events.
The purpose for this document is to provide a bit of direction for how things will be handled to ensure simplicity of socket
communications.

Two potential solutions are shown below, one will be decided upon.

## Solution One

There will be three Socket.IO namespaces configured: command, public, private.

* Command: The default (`/`) namespace that sockets connect to. In this namespace, commands are sent between the server and client (bi-directional).
  Events here are not chat messages, but may alter the end-user's UI. Example events:
  * `register` - register a new user account
  * `login` - authenticate an existing user
  * `balance` - get the wallet balance of the user
  * `error` - an invalid command was sent (eg. `balance` for a socket with no authenticated user)
  * `join` - join a room in the public namespace
* Public: Running on the `/public` path, clients will connect to this namespace once they've authenticated (do we want to add server-side checks
  to ensure this?). Here, clients can send messages to specific rooms by including the room in their message object then the server will use
  `namespace.to(room, msg)` to send the message to the appropriate clients. Clients join rooms by sending a `join` command on the `command` namespace.
  Clients will receive messages on this namespace based on the rooms they've joined.
* Private: Running on the `/private` path, clients will also only connect to this once they've authenticated. The difference between this namespace
  and `public` is that users cannot join channels. Instead, clients will automatically listen to the room that matches their username. Clients can
  send private messages to any user by sending a message to the server with the desired user's username as a target, then the server will use
  `namespace.to(username, msg)` to relay the message. Clients should expect to receive private messages on this namespace as well.

General form of the message object that clients should send on the namespace they desire:
~~~
{
	"message": "This is my message, as formatted by my client.",
	"target": "mytarget",
	"color": "black"
}
~~~

## Solution Two

There will be only one Socket.IO namespaces configured. All events will be processed on that channel.

Since all messages are sent via one channel, target names will need prefixes: `room` and `user`. For example, a public room target will look like `room:myroom` 
whereas private message user targets will look like `user:myfriend`. Much like Solution One, clients will be added to public room S.IO rooms (via `join` command)
and will automatically join their own private room. Again, these S.IO rooms will use the same format as what the client sends. The advantage of this solution
is that only one namespace needs to be used to handle any message event. This will simplify message processing code but may result in extra work needing to be
done by the server to route messages correctly (unlikely).

General form of the message object that clients should send:
~~~
{
	"message": "This is my message, as formatted by my client.",
	"target": "room:mytarget",
	"color": "black"
}
~~~

## Private Messages
While already mentioned above in each solution, it is very important to note the private messages are not sent to the user's socket directly. The reason for this is
that it is much easier to emit to a Socket.IO room than to find a user, get their socket, then directly emit to that. Since rooms can only be joined
and left on the server-side, there is no issue of a client attempting to join the private message Socket.IO room of another user.