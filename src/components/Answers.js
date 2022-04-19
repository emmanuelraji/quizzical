export default function Answers(props) {
  const styles = {
    getStyle() {
      if (props.isHeld & !props.game) {
        return { backgroundColor: "#d6dbf5", border: "1px solid #d6dbf5" };
      } else if (props.isHeld && props.game && !props.isCorrect) {
        return {
          backgroundColor: "#F8BCBC",
          border: "1px solid #F8BCBC",
          opacity: "50%",
        };
      } else if (props.game && props.isHeld && props.isCorrect) {
        return { backgroundColor: "#94D7A2", border: "1px solid #94D7A2" };
      } else if (props.game && props.isCorrect) {
        return { backgroundColor: "#94D7A2", border: "1px solid #94D7A2" };
      } else if (props.game && !props.isHeld) {
        return { opacity: "50%", border: "1px solid rgb(41, 50, 100, .5)" };
      }
    },
  };
  return (
    <button
      className="answers-btn"
      onClick={props.handleClick}
      style={styles.getStyle()}
    >
      {props.answer}
    </button>
  );
}
