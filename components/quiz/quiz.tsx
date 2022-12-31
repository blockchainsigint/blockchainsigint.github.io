import { useState } from "react";

interface Props {
  label: string;
  answers: { value: string; correct?: boolean }[];
}

export const Quiz = (props: Props) => {
  const [correct, setCorrect] = useState("");
  const checkSubmitCorrectAnswers = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("you clicked those checkboxes", e.target);
    //get checked checkboxes
    const checkedCheckboxes = Array.from(e.target as HTMLFormElement).filter(
      (input: HTMLInputElement) => input.checked
    ) as HTMLInputElement[];
    //get values of checked checkboxes
    const checkedValues = checkedCheckboxes.map((input) => input.value);
    //get correct answers
    const correctAnswers = props.answers.filter((answer) => answer.correct);
    //get values of correct answers
    const correctValues = correctAnswers.map((answer) => answer.value);
    //compare checked values and correct values equals
    console.log("checkedValues", checkedValues);
    console.log("correctValues", correctValues);

    const correct = checkedValues.every(
      (value) =>
        correctValues.includes(value) &&
        checkedValues.length === correctValues.length
    );

    setCorrect(correct ? "Risposta corretta" : "Risposta errata");
  };

  return (
    <form onSubmit={checkSubmitCorrectAnswers}>
      <div style={{ padding: "8px 0px" }}>
        <h3>{props.label}</h3>
      </div>
      {
        /* map answers with a checkbox */
        props.answers.map((answer, index) => {
          return (
            <div key={index}>
              <input type="checkbox" name={"quiz"} value={answer.value} />
              <label htmlFor={answer.value} style={{ marginLeft: "0.5rem" }}>
                {answer.value}
              </label>
            </div>
          );
        })
      }
      <button
        type="submit"
        style={{
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "8px 12px",
          margin: "12px 0 0",
        }}
      >
        Rispondi
      </button>
      <div style={{ padding: "8px 0px" }}>
        <div>{correct}</div>
      </div>
    </form>
  );
};
