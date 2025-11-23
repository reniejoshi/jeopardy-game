let question = {};

async function fetchQuestion() {
    const response = await fetch('https://opentdb.com/api.php?amount=1&category=18&difficulty=easy&type=multiple');
    const data = await response.json();
    const result = data.results[0];

    question = {
        type: result.type,
        difficulty: result.difficulty,
        category: result.category,
        question: result.question,
        correctAnswer: result.correct_answer,
        incorrectAnswers: result.incorrect_answers
    };
}

fetchQuestion();