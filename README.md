# BitBlab
New version of the BitBlab chat server

## Project Structure
All server source files are in the `/src/` directory and are built into `/dist/`. Client files are already present in `/dist/public` and all changes should be made in that folder.
Files in `/dist/` *not* `/dist/public` should *not be modified* as they *will be overwritten* every time the TypeScript build runs.

## Installing Dependencies
Run `npm install` to install the modules needed to run the server. If you're a developer, you will then need to run `npm install --only=dev` to get all the dependencies needed in
order to build the application.

## Building
You will need the development dependencies to build, see the above command to install them.
The fastest way to build is to simply run `npm start`. This will build the TypeScript files and immediately start the server.
If you just want to build, run `npm run tsc` to just run the TypeScript compiler.

## Running
Run `npm start` to build the latest server source and execute it immediately. Again, this will require the development dependencies.
To just run a prebuilt application, run `node dist/index.js`.