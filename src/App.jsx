import React, { useState, useEffect } from "react";
import fetchQuestions from "./lib/fetchQuestions";

import "./App.css";

import Start from "./components/Start";
import Quiz from "./components/Quiz";
import Spinner from "./components/Spinner";

function App() {
  const [questions, setQuestions] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const correctAnswers = questions?.map((question) => question.correct_answer);
  const userAnswers = questions?.map((question) => {
    return question.answer_choices?.find((choice) => choice.selected);
  });

  useEffect(() => {
    loadQuestions();
  }, []);

  async function loadQuestions() {
    setIsLoading(true);
    const trivia = await fetchQuestions();
    setQuestions(trivia);
    setIsLoading(false);
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

  function startQuiz() {
    setIsInitialLoad(false);
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
    <React.Fragment>
      {isInitialLoad && <Start startQuiz={startQuiz} />}
      {isLoading && <Spinner />}
      {!isLoading && !isInitialLoad && (
        <Quiz
          questions={questions}
          correctAnswers={correctAnswers}
          isGameOver={isGameOver}
          selectAnswerChoice={selectAnswerChoice}
          renderGameButton={renderGameButton}
        />
      )}
    </React.Fragment>
  );
}

export default App;
