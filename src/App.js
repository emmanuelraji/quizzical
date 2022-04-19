import React from "react";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import generateState from "./api/data";
import "./App.css";

const App = () => {
  const [startQuiz, setStartQuiz] = React.useState(false);
  const [quizData, setQuizData] = React.useState([]);
  const [checkGame, setCheckGame] = React.useState(false);
  const [score, setScore] = React.useState(0);

  function start() {
    setStartQuiz((prevState) => !prevState);
    generateState().then((data) => setQuizData(data));
  }

  function handleClick(idQuest, id) {
    setQuizData((prevState) =>
      prevState.map((question) => {
        const arr = question.answer_choices.map((item) => {
          if (item.id === id) {
            return { ...item, isHeld: !item.isHeld };
          } else if (item.id !== id && question.id === idQuest) {
            return { ...item, isHeld: false };
          } else {
            return item;
          }
        });
        return { ...question, answer_choices: arr };
      })
    );
  }

  function checkAnswers() {
    setCheckGame((prevState) => !prevState);
    let count = 0;
    quizData.forEach((item) => {
      item.answer_choices.forEach((item) => {
        if (item.isHeld && item.isCorrect) {
          count++;
        }
      });
      setScore(count);
    });
  }

  function playAnotherGame() {
    setCheckGame((prevState) => !prevState);
    generateState().then((data) => setQuizData(data));
  }

  return (
    <>
      {!startQuiz ? (
        <Home start={start} />
      ) : (
        <Quiz
          checkGame={checkGame}
          handleClick={handleClick}
          data={quizData}
          playAnotherGame={playAnotherGame}
          score={score}
          checkAnswers={checkAnswers}
        />
      )}
    </>
  );
};

export default App;
