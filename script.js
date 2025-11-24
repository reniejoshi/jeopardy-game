let questions = [];

async function fetchQuestions() {
    const response = await fetch(`https://opentdb.com/api.php?amount=3&category=${generateRandomCategory()}&difficulty=easy&type=multiple`);
    const data = await response.json();

    questions = data.results.map(result => ({
        type: result.type,
        difficulty: result.difficulty,
        category: result.category,
        question: result.question,
        correctAnswer: result.correct_answer,
        incorrectAnswers: result.incorrect_answers
    }));

    displayQuestions();
}

function displayQuestions() {
    const table = document.createElement("table");

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const th = document.createElement("th");
    th.textContent = questions[0].category;
    headerRow.appendChild(th);
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    questions.forEach((question) =>{
        const tr = document.createElement("tr");
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

        tr.appendChild(td);
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    document.body.appendChild(table);
}

function generateRandomCategory() {
    const min = 1, max = 24;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

fetchQuestions();