import React, { useState, useEffect } from "react";
import fetchQuestions from "../lib/fetchQuestions";

import Spinner from "./Spinner";
import Question from "./Question";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const correctAnswers = questions?.map((question) => question.correct_answer);
  const userAnswers = questions?.map((question) => {
    return question.answer_choices?.find((choice) => choice.selected);
  });

  useEffect(() => {
    loadQuestions();
  }, []);

  async function loadQuestions() {
    setLoading(true);
    try {
      const trivia = await fetchQuestions();
      setQuestions(trivia);
    } finally {
      setLoading(false);
    }
  }

  function selectAnswerChoice(questionId, choiceId) {
    setQuestions((questions) => {
      return questions.map((question) => {
        if (question.id == questionId) {
          return {
            ...question,
            answer_choices: question.answer_choices.map((choice) =>
              choice.id === choiceId
                ? { ...choice, selected: !choice.selected }
                : { ...choice, selected: false },
            ),
          };
        }
        return question;
      });
    });
  }

  function startNewQuiz() {
    setIsGameOver(false);
    loadQuestions();
  }

  function renderGameButton() {
    const incorrectAnswers = userAnswers?.filter((choice) =>
      correctAnswers.includes(choice?.text),
    ).length;

    if (!isGameOver) {
      return (
        <button
          onClick={() => setIsGameOver(true)}
          disabled={userAnswers?.includes(undefined)}
        >
          Check Asnwer
        </button>
      );
    }

    return (
      <React.Fragment>
        <p>{`You scored ${incorrectAnswers} out of ${correctAnswers.length} correct answers`}</p>
        <button onClick={startNewQuiz}>Play again</button>
      </React.Fragment>
    );
  }

  return (
    <main>
      {loading ? (
        <Spinner />
      ) : (
        questions?.map((question) => (
          <Question
            key={question.id}
            question={question}
            correctAnswers={correctAnswers}
            selectAnswerChoice={selectAnswerChoice}
            isGameOver={isGameOver}
          />
        ))
      )}
      {!loading && renderGameButton()}
    </main>
  );
}

export default Quiz;
