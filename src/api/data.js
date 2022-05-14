import { nanoid } from "nanoid";

const generateState = () => {
  const quiz = fetch(
    "https://opentdb.com/api.php?amount=5&type=multiple&encode=base64"
  )
    .then((res) => res.json())
    .then((data) =>
      data.results.map((item) => ({
        id: nanoid(),
        question: base64ToUTF8(item.question),
        answer_choices: item.incorrect_answers
          .map((item) => ({
            answer: base64ToUTF8(item),
            id: nanoid(),
            isHeld: false,
            isCorrect: false,
          }))
          .concat({
            answer: base64ToUTF8(item.correct_answer),
            id: nanoid(),
            isHeld: false,
            isCorrect: true,
          })
          .sort(() => Math.random() - 0.5),
        correct_answer: item.correct_answer,
      }))
    );

  return quiz;

  // - This function fixes the issue of not rendering html entities correctly.
  // - The data has to be encoded as base64 in the api url(e.g. &encode=base64).
  function base64ToUTF8(str) {
    return decodeURIComponent(window.atob(str));
  }
};

export default generateState;
