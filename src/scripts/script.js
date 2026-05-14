import { socket } from './socket.js';
import { pipeline, cos_sim } from '@huggingface/transformers';

const rows = 3;
const columns = 7;

let users = [];
let cards = [];

socket.on('updated users', (updatedUsers) => {
    users = updatedUsers;
    console.log('updated users', users);
    displayScores();
});

async function fetchQuestions() {
    const response = await fetch('/api');
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
    cell.removeEventListener('click', displayQuestion);
    cell.classList.add('inactive');

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

    const inputContainer = document.createElement('label');
    inputContainer.setAttribute('for', 'input');
    inputContainer.classList.add('input-container');

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'input';
    input.placeholder = 'Your Answer';

    inputContainer.append(input);

    const answerText = document.createElement('p');
    answerText.textContent = `Answer: ${question.answer}`;
    
    input.addEventListener('keydown', async (e) => {
        if (e.key !== 'Enter') {
            return;
        }

        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = question.answer.trim().toLowerCase();

        const accuracy = await checkAccuracy(userAnswer, correctAnswer);

        const accuracyFeedback = document.createElement('span');
        accuracyFeedback.classList.remove("correct-answer", "incorrect-answer");
        accuracyFeedback.classList.add("accuracy-feedback", accuracy == "Correct!" ? "correct-answer" : "incorrect-answer");
        accuracyFeedback.textContent = accuracy;
        inputContainer.prepend(accuracyFeedback);

        input.blur();
        input.classList.remove("correct-answer", "incorrect-answer");
        input.classList.add(accuracy == "Correct!" ? "correct-answer" : "incorrect-answer");
        input.disabled = true;

        socket.emit('update user score', accuracy == "Correct!" ? question.points : -question.points, localStorage.getItem("user_token"));
    });

    document.addEventListener('keydown', (e) => {
        if (e.target === input) {
            return;
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
    cardContent.append(questionText, inputContainer);
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

        const nameP = document.createElement('p');
        nameP.textContent = name;
        nameP.classList.add('name')

        const scoreP = document.createElement('p');
        scoreP.textContent = score;
        scoreP.classList.add('score');

        scoreCard.append(nameP, scoreP);
        scoreboard.appendChild(scoreCard);
    }
}

async function checkAccuracy(userAnswer, correctAnswer) {
    if (!userAnswer || !correctAnswer) return;

    const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

    const output1 = await extractor(correctAnswer, { pooling: 'mean', normalize: true });
    const output2 = await extractor(userAnswer, { pooling: 'mean', normalize: true });

    // Closer to 1 means more similar
    const similarity = cos_sim(output1.data, output2.data);
 
    if (similarity >= 0.8) {
        return "Correct!";
    } else {
        return "Incorrect";
    }
}

window.addEventListener('load', playJeopardyGame);