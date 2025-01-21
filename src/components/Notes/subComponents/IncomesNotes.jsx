// COMPONENT renders incomes

import { yearlyIncome } from "../../../utilities/incomeUtils";

export default function IncomesNotes({ content }) {
  const incomes = content?.incomes;

  // * PLACEHOLDER functions to display income calc in format intervalAmount x interval = sum.
  // To be replaced/refactored when new income fields are added
  function findInterval(income) {
    if (!income) return income; // new income fields are added with default value zero
    const interval = income.charAt(0); // this will be the (optional) character added by user (d for x260, m for x12 and y for x1)
    if (!isNaN(interval) || interval === "m") {
      return "12";
    } else if (interval === "d") {
      return "260";
    } else if (interval === "y") {
      return "1";
    } else return "invalid character";
  }

  function removeInterval(income) {
    if (!income) return income; // new income fields are added with value zero
    const interval = income.charAt(0); //
    if (!isNaN(interval)) {
      return income;
    } else return income.slice(1); // if the first char is NaN, remove it
  }
  // -----------------------------------------

  return (
    <div>
      <h4>Inntekter</h4>
      <ul>
        {incomes &&
          incomes.map((income) => (
            <li key={income.id}>
              {income.source}: {removeInterval(income.amount)} x{" "}
              {findInterval(income.amount)} = {yearlyIncome(income.amount)}
            </li>
          ))}
      </ul>
    </div>
  );
}
