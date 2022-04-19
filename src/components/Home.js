import React from "react";

export default function Home(props) {
  return (
    <div className="main">
      <p className="title">Quizzical</p>
      <p>Some description if needed</p>
      <button className="start-btn" onClick={props.start}>
        Start Quiz
      </button>
    </div>
  );
}
