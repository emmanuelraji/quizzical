import React, { useState, useEffect } from "react";
import { clsx } from "clsx";
import fetchQuestions from "./lib/fetchQuestions";

import "./App.css";

import Start from "./components/Start";

function App() {
  const [questions, setQuestions] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(false);

  const correctAnswers = questions?.map((question) => question.correct_answer);
  const userAnswers = questions?.map((question) => {
    return question.answer_choices?.find((choice) => choice.isSelected);
  });

  console.log(correctAnswers);
  console.log(userAnswers);
  console.log(questions);

  useEffect(() => {
    loadQuestions();
  }, []);

  async function loadQuestions() {
    const trivia = await fetchQuestions();
    setQuestions(trivia);
  }

  function selectAnswerChoice(questionId, choiceId) {
    setQuestions((questions) => {
      return questions.map((question) => {
        if (question.id == questionId) {
          console.log("matched");
          return {
            ...question,
            answer_choices: question.answer_choices.map((choice) =>
              choice.id === choiceId
                ? { ...choice, isSelected: !choice.isSelected }
                : { ...choice, isSelected: false },
            ),
          };
        }
        return question;
      });
    });
  }

  function startNewGame() {
    loadQuestions();
    setTimeout(() => {
      setIsGameOver(false);
    }, 300);
  }

  function renderGameButton() {
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
        <p>You scored {} correct answers</p>
        <button onClick={startNewGame}>Play again</button>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      {isInitialLoad && <Start />}
      <div>
        {questions?.map((question, index) => (
          <React.Fragment key={index}>
            <h2>{question.question}</h2>
            <div className="answer-choices">
              {question.answer_choices?.map((choice, index) => {
                const isCorrect = correctAnswers.includes(choice.text);
                return (
                  <button
                    key={index}
                    className={clsx({
                      selected: choice.isSelected,
                      correct: isCorrect && isGameOver,
                      incorrect: !isCorrect && isGameOver && choice.isSelected,
                    })}
                    onClick={() => selectAnswerChoice(question.id, choice.id)}
                  >
                    {choice.text}
                  </button>
                );
              })}
            </div>
          </React.Fragment>
        ))}
      </div>
      {renderGameButton()}
    </React.Fragment>
  );
}

export default App;
