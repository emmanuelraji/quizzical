import React from "react";
import Choice from "./Choice";

export default function Question(props) {
  const { question, correctAnswers, selectAnswerChoice, isGameOver } = props;

  return (
    <React.Fragment>
      <section>
        <h2>{question.question}</h2>
        <div className="answer-choices">
          {question.answer_choices?.map((choice) => (
            <Choice
              key={choice.id}
              choice={choice}
              correctAnswers={correctAnswers}
              selectAnswerChoice={selectAnswerChoice}
              question={question}
              isGameOver={isGameOver}
            />
          ))}
        </div>
      </section>
    </React.Fragment>
  );
}
