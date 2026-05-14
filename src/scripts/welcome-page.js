import { socket } from './socket.js';

const nameInput = document.getElementById('name-input');
const startButton = document.getElementById('start-button');
startButton.addEventListener('click', startGame);

function startGame() {
    const name = nameInput.value;

    socket.emit('add user', name, (response) => {
        if (response.success) {
            socket.on('your token', (token) => {
                localStorage.setItem('user_token', token);
            });

            window.location.href = './src/game-page.html';
        } else {
            const snackbar = document.createElement('div');
            snackbar.classList.add('snackbar');
            snackbar.textContent = "That username is already taken.";
            
            document.body.appendChild(snackbar);

            setTimeout(() => snackbar.remove(), 3000);
        }
    });
}