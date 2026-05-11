import { api } from './api/index.js';
import { User } from './user.js';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const game = express();
const server = createServer(game);
const io = new Server(server, {
    cors: {
        origin: [
            'http://localhost:5175',
            'http://127.0.0.1:5175',
            'http://localhost:4000',
            'http://127.0.0.1:4000'
        ],
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

const PORT = process.env.PORT || 4000;

let users = [];

io.on('connection', (socket) => {
    socket.emit('updated users', users);

    socket.on('add user', (name) => {
        const user = new User(name);
        users.push(user);
        io.emit('updated users', users);
    });
});

game.use('/api', api);
game.use(express.static("."));

game.get('/', (req, res) => {
    res.sendFile(join(__dirname, './welcome-page.html'));
});

server.listen(PORT, () => console.log(`Game is running on port ${PORT}`));

server.on('error', (err) => {
    console.error('Server failed to start:', err.message);
    process.exit(1);
});