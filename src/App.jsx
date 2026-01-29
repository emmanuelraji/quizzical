import React, { useState } from "react";

import "./App.css";

import Start from "./components/Start";
import Quiz from "./components/Quiz";

function App() {
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  function startQuiz() {
    setIsInitialLoad(false);
  }

  return (
    <React.Fragment>
      {isInitialLoad ? <Start startQuiz={startQuiz} /> : <Quiz />}
    </React.Fragment>
  );
}

export default App;
