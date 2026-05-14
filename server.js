import { api } from './src/api/index.js';
import { User } from './src/scripts/user.js';
import jwt from 'jsonwebtoken';

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
let publicUsers = [];

io.on('connection', (socket) => {
    socket.emit('updated users', publicUsers); // Not working

    socket.on('add user', (name, callback) => {
        if (users.some(user => user.name == name)) {
            callback({ success: false });
            return;
        }

        const token = jwt.sign({ username: name}, 'secret');
        console.log("your token", token);
        socket.emit('your token', token);

        const user = new User(name, token);
        users.push(user);

        updatePublicUsers();

        io.emit('updated users', publicUsers);

        callback({ success: true });
        return;
    });

    socket.on('update user score', (points, token) => {
        const decoded = jwt.verify(token, 'secret');
    
        const currentUser = users.find(user => user.name === decoded.username);

        if (currentUser) {
            currentUser.updateScore(points);
            updatePublicUsers();

            io.emit('updated users', publicUsers);
        }
    });
});

function updatePublicUsers() {
    publicUsers = users.map(user => ({ name: user.name, score: user.score}));
}

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