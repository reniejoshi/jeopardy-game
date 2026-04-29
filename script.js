const rows = 3;
const columns = 3;

let questions = [];

// TODO: Add progress bar
async function fetchQuestions() {
    for (let i = 0; i < columns; i++) {
        const response = await fetch(`https://opentdb.com/api.php?amount=3&category=${generateRandomCategory()}&difficulty=easy&type=multiple`);
        const results = (await response.json()).results;
        console.log("Response #" + i + ":");
        console.log(results);

        if (results.length == 0) {
            i--;
            await delay(6000);
            continue;
        }

        questions.push(results.map(result => ({
            type: result.type,
            difficulty: result.difficulty,
            category: result.category,
            question: result.question,
            correctAnswer: result.correct_answer,
            incorrectAnswers: result.incorrect_answers
        })));
        
        if (i < columns - 1) {
            await delay(6000);
        }
    }

    console.log("questions:");
    console.log(questions);
}

function displayQuestionsTable() {
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    const headerRow = document.createElement("tr");
    for (let i = 0; i < columns; i++) {
        const th = document.createElement("th");
        th.textContent = questions[i][0].category;
        headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);

    questions.forEach(questionsColumn => {
        const tr = document.createElement("tr");

        questionsColumn.forEach(question => {
            const td = document.createElement("td");

            switch(question.difficulty) {
                case "easy":
                    td.textContent = 100;
                    break;
                case "medium":
                    td.textContent = 200;
                    break;
                case "hard":
                    td.textContent = 300;
                    break;
            }

            td.addEventListener('click', displayQuestion);
            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    document.body.appendChild(table);
}

function displayQuestion(event) {
    const modal = document.createElement('div');
    const modalContent = document.createElement('div');

    modal.classList.add('modal');
    modalContent.classList.add('modal-content');

    modal.append(modalContent);
    document.body.append(modal);

    const cell = event.target;
    const cellRow = cell.closest('tr').rowIndex;
    const cellColumn = cell.cellIndex;
    console.log(`cell row: ${cellRow}, cell column: ${cellColumn}`);
}

function generateRandomCategory() {
    const min = 1, max = 24;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function delay(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function playJeopardyGame() {
    await fetchQuestions();
    displayQuestionsTable();
}

window.addEventListener('load', playJeopardyGame);