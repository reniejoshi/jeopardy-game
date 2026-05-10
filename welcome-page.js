import { User } from './user.js';

const host = window.location.host;
const socket = io(host);

const nameInput = document.getElementById('name-input');
const startButton = document.getElementById('start-button');
startButton.addEventListener('click', startGame);

function startGame() {
    socket.emit('add user', nameInput.value);

    window.location.href = 'game-page.html';
}