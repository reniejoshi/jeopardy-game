let questions = [];

async function fetchQuestions() {
    const response = await fetch('https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple');
    const data = await response.json();

    questions = data.results.map(result => ({
        type: result.type,
        difficulty: result.difficulty,
        category: result.category,
        question: result.question,
        correctAnswer: result.correct_answer,
        incorrectAnswers: result.incorrect_answers
    }));
}

fetchQuestions();