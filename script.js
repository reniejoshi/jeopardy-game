import Fuse from 'fuse.js';
import { io } from 'socket.io-client';

const rows = 3;
const columns = 7;

let users = [];
let cards = [];

const host = window.location.host;
const socket = io(host);

socket.on('updated users', (updatedUsers) => {
    users = updatedUsers;
    displayScores();
});

async function fetchQuestions() {
    const response = await fetch(`http://${host}/api`);
    const data = await response.json();

    cards = data.slice(0, columns).map(unit => {
        const difficulties = ['easy', 'medium', 'hard'];

        return difficulties.map(difficulty => {
            const questionGroup = unit.questions.find(q => q.difficulty === difficulty);
            const card = questionGroup?.cards?.[0];

            return {
                category: unit.unit,
                difficulty,
                question: card?.question ?? 'No question available',
                answer: card?.answer ?? 'No answer available',
                points: difficulty == 'easy' ? 100
                    : difficulty == 'medium' ? 200
                    : difficulty == 'hard' ? 300
                    : ''
            };
        });
    });
}

function displayQuestionsTable() {
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    const headerRow = document.createElement("tr");
    for (let i = 0; i < columns; i++) {
        const th = document.createElement("th");
        th.textContent = cards[i]?.[0]?.category;
        headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);

    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        const tr = document.createElement('tr');

        for (let colIndex = 0; colIndex < columns; colIndex++) {
            const question = cards[colIndex]?.[rowIndex];
            const td = document.createElement('td');

            if (question) {
                td.textContent = question.points;
                td.dataset.column = String(colIndex);
                td.dataset.row = String(rowIndex);
                td.addEventListener('click', displayQuestion);
            } else {
                td.textContent = '';
            }

            tr.appendChild(td);
        }

        tbody.appendChild(tr);
    }

    table.appendChild(thead);
    table.appendChild(tbody);
    document.body.appendChild(table);
}

function displayQuestion(event) {
    const cell = event.target;
    const col = Number(cell.dataset.column);
    const row = Number(cell.dataset.row);
    const question = cards[col]?.[row];

    if (!question) {
        return;
    }

    const card = document.createElement('div');
    const titleBar = document.createElement('div');
    const cardContent = document.createElement('div');

    card.classList.add('card');

    // -- Set up title bar --

    titleBar.classList.add('card-title-bar');

    const continueKey = document.createElement('h2');
    continueKey.innerHTML = `Continue <kbd>ESC</kbd>`;

    const title = document.createElement('h2');
    title.textContent = `${question.category} for ${question.points}`;

    const revealAnswerKey = document.createElement('h2');
    revealAnswerKey.innerHTML = `Reveal Answer <kbd>SPACE</kbd>`;

    // -- Set up content --

    cardContent.classList.add('card-content');

    const questionText = document.createElement('p');
    questionText.innerText = question.question;

    const labelContainer = document.createElement('label');
    labelContainer.setAttribute('for', 'input');
    labelContainer.classList.add('input');

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'input';
    input.setAttribute('placeholder', '\u00A0');

    const labelTextSpan = document.createElement('span');
    labelTextSpan.classList.add('label');
    labelTextSpan.textContent = 'Your Answer';

    const focusBgSpan = document.createElement('span');
    focusBgSpan.classList.add('focus-bg');

    labelContainer.append(input, labelTextSpan, focusBgSpan);

    const answerText = document.createElement('p');
    answerText.textContent = `Answer: ${question.answer}`;
    
    // -- Set up keyboard event listener --
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName == 'INPUT') {
            if (e.key === 'Enter') {
                const userAnswer = input.value.trim();
                const correctAnswer = question.answer;

                const fuse = new Fuse([correctAnswer], { includeScore: true });
                const result = fuse.search(userAnswer)[0];

                if (result && result.score < 0.8) {
                    alert(`Correct! The match was ${result.score}`);
                    // Update user score and scoreboard
                } else {
                    alert(`Incorrect! The correct answer was: ${correctAnswer}. The match was ${result.score}`);
                }
            } else {
                return;
            }
        }

        if (e.key === 'Escape') {
            card.style.animation = 'fadeOut 0.5s ease-out forwards';
            setTimeout(() => {
                card.remove();
            }, 500);
        } else if (e.key === ' ') {
            cardContent.appendChild(answerText);
        }
    });

    titleBar.append(continueKey, title, revealAnswerKey);
    cardContent.append(questionText, labelContainer);
    card.append(titleBar, cardContent);
    document.body.appendChild(card);
    card.style.opacity = '1';
}

async function playJeopardyGame() {
    await fetchQuestions();
    displayQuestionsTable();
}

function displayScores() {
    const scoreboard = document.getElementById('scoreboard');
    scoreboard.innerHTML = '';

    for (const user of users) {
        const name = user?.name ?? "Anonymous Player";
        const score = user?.score ?? 0;

        const scoreCard = document.createElement('div');
        scoreCard.classList.add('score-card');
        scoreCard.textContent = `${name}: ${score} points`;
        scoreboard.appendChild(scoreCard);
    }
}

window.addEventListener('load', playJeopardyGame);