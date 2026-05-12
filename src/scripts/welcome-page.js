import { socket } from './socket.js';

const nameInput = document.getElementById('name-input');
const startButton = document.getElementById('start-button');
startButton.addEventListener('click', startGame);

function startGame() {
    socket.emit('add user', nameInput.value);

    window.location.href = './src/game-page.html';
}