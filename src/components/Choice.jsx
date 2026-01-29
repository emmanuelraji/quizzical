import { clsx } from "clsx";

function Choice(props) {
  const { isGameOver, choice, correctAnswers, selectAnswerChoice, question } =
    props;
  const isCorrect = correctAnswers.includes(choice.text);

  return (
    <button
      className={clsx({
        selected: choice.selected,
        correct: isCorrect && isGameOver,
        incorrect: !isCorrect && isGameOver && choice.selected,
      })}
      onClick={() => selectAnswerChoice(question.id, choice.id)}
    >
      {choice.text}
    </button>
  );
}

export default Choice;
