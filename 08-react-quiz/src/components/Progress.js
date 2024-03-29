import { useQuiz } from "../contexts/QuizContext";

function Progress() {
  const { index, points, answer, numQuestions, maxPossiblePoints } = useQuiz();
  return (
    <header className="progress">
      <progress value={index + Number(answer !== null)} max={numQuestions} />
      <p>
        Question{" "}
        <strong>
          {index + 1} / {numQuestions}
        </strong>
      </p>
      <p>
        <strong>
          {points} / {maxPossiblePoints}
        </strong>
      </p>
    </header>
  );
}

export default Progress;
