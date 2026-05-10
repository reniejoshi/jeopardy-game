const rows = 3;
const columns = 7;

let cards = [];

async function fetchQuestions() {
    const response = await fetch('http://localhost:3000/api');
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

    const answerText = document.createElement('p');
    answerText.textContent = `Answer: ${question.answer}`;
    
    // -- Set up keyboard event listener --
    document.addEventListener('keydown', (e) => {
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
    cardContent.appendChild(questionText);
    card.append(titleBar, cardContent);
    document.body.appendChild(card);
    card.style.opacity = '1';
}

async function playJeopardyGame() {
    await fetchQuestions();
    displayQuestionsTable();
}

window.addEventListener('load', playJeopardyGame);