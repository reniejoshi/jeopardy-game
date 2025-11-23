const questionElement = document.getElementById("question");
const categoryElement = document.getElementById("category");

async function question() {
    const response = await fetch('https://opentdb.com/api.php?amount=1&category=18&difficulty=easy&type=multiple');
    const data = await response.json();
    const result = data.results[0];
    questionElement.textContent = result.question;
    categoryElement.textContent = result.category;
}

question();