import express from 'express';
import http from 'http';
import { Server as SocketServer } from 'socket.io';

import { GameManager } from './store'

import handleExpress from './express';
import handleSockets from './sockets';

GameManager.getInstance();

const app = express();

const server = http.createServer(app);

const socket = new SocketServer(server);

handleExpress(app);

handleSockets(socket);


server.listen(process.env.port || 3000, () => {
    console.log(`App running on port ${process.env.port || 3000}`);
});