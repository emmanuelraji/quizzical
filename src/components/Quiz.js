import Answers from "./Answers";

export default function Quiz(props) {
  const { checkGame, handleClick, data, checkAnswers, score, playAnotherGame } =
    props;

  const quiz = data.map((questions, index) => {
    const answers = questions.answer_choices;
    return (
      <div key={index}>
        <h3>{questions.question}</h3>
        <div className="btn-container">
          {answers.map((item, index) => (
            <Answers
              key={index}
              {...item}
              handleClick={() => handleClick(questions.id, item.id)}
              game={checkGame}
            />
          ))}
        </div>
        <hr />
      </div>
    );
  });

  const buttons = !checkGame ? (
    <div className="check-ans">
      <button className="check-ans-btn" onClick={checkAnswers}>
        Check Answers
      </button>
    </div>
  ) : (
    <div className="score-display">
      <p>
        You scored {score}/{data.length} correct answers
      </p>
      <button className="check-ans-btn" onClick={playAnotherGame}>
        Play Again
      </button>
    </div>
  );

  return (
    <div className="container">
      {quiz}
      {buttons}
    </div>
  );
}
