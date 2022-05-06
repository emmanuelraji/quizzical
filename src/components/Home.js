import React from "react";

export default function Home(props) {
  return (
    <div className="main">
      <p className="header-primary">Quizzical</p>
      <p className="header-secondary">
        A trivia game for learning and testing yourself on different topics
      </p>
      <button className="start-btn" onClick={props.start}>
        Start Quiz
      </button>
    </div>
  );
}
