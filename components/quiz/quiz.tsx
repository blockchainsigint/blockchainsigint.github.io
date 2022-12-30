import { useState } from "react";
import styles from "./counters.module.css";

interface Props {
  label: string;
  answers: { value: string; correct?: boolean }[];
}

export const Quiz = (props: Props) => {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  const checkSubmitCorrectAnswers = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("you clicked those checkboxes", e.target);
    //get checked checkboxes
    const checkedCheckboxes = Array.from(e.target as HTMLFormElement).filter(
      (input) => input.checked
    ) as HTMLInputElement[];
    //get values of checked checkboxes
    const checkedValues = checkedCheckboxes.map((input) => input.value);
    //get correct answers
    const correctAnswers = props.answers.filter((answer) => answer.correct);
    //get values of correct answers
    const correctValues = correctAnswers.map((answer) => answer.value);
    //compare checked values with correct values
    const correct = checkedValues.every((value) =>
      correctValues.includes(value)
    );
    console.log("correct?", correct);
  };

  return (
    <form onSubmit={checkSubmitCorrectAnswers}>
      {
        /* map answers with a checkbox */
        props.answers.map((answer, index) => {
          return (
            <div key={index}>
              <input type="checkbox" name={"quiz"} value={answer.value} />
              <label htmlFor={answer.value}>{answer.value}</label>
            </div>
          );
        })
      }
      <button type="submit">Submit</button>
    </form>
  );
};
