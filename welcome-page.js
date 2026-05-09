import { User } from './user.js';

let users = [];

const nameInput = document.getElementById('name-input');
const startButton = document.getElementById('start-button');
startButton.addEventListener('click', startGame);

function startGame() {
    users.push(new User(nameInput.value));
    window.location.href = 'game-page.html';
}