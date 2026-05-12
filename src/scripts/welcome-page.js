import { socket } from './socket.js';

const nameInput = document.getElementById('name-input');
const startButton = document.getElementById('start-button');
startButton.addEventListener('click', startGame);

function startGame() {
    socket.emit('add user', nameInput.value);

    socket.on('your token', (token) => {
        localStorage.setItem('user_token', token);
    });

    window.location.href = './src/game-page.html';
}