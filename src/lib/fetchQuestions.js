import { nanoid } from "nanoid";
import { decode } from "html-entities";

async function fetchQuestions() {
  const response = await fetch(
    "https://opentdb.com/api.php?amount=5&type=multiple",
  );

  const jsonResponse = await response.json();

  const quiz = normalizeQuestions(jsonResponse.results);

  return quiz;
}

function normalizeQuestions(apiQuestions) {
  return apiQuestions.map((question) => {
    const answerChoices = [
      ...question.incorrect_answers.map((choice) => ({
        id: nanoid(),
        text: decode(choice),
        isSelected: false,
      })),
      {
        id: nanoid(),
        text: decode(question.correct_answer),
        isSelected: false,
      },
    ];

    return {
      id: nanoid(5),
      category: question.category,
      question: decode(question.question),
      correct_answer: decode(question.correct_answer),
      answer_choices: shuffleArray(answerChoices),
    };
  });
}

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default fetchQuestions;
