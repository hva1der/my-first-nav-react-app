//
// COMPONENT renders incomes overview section of letters (simplified text if there are no incomes)

import { padIncome } from "../../../utilities/incomeUtils";

export default function IncomesText({ rate, incomes }) {
  // PROBLEM: Change to render nothing if no income?
  if (!incomes || !incomes[0].amount) {
    return (
      <div>
        <p>Skal det vere med noen tekst hvis det ikke er inntekt?</p>
      </div>
    );
  }
  /* TEXT if user is single (EN∕EV) */
  if (rate === "EV" || rate === "EN") {
    return (
      /* STYLE prevents html from deleting white spaces
      FIX - move to CSS module etc */
      <div style={{ whiteSpace: "pre" }}>
        <p>BEREGNING for enslig</p>
        <p>{padIncome(incomes[0])}</p>
        <p>{padIncome({ type: "Ytelser fra folketrygden", amount: 6000 })}</p>
      </div>
    );
  }
}

// NOTES for 150724:
// Need to be working with combined sums of incomes of each type
// -> keeping in mind decimals/ divide by 12 issue
// Padding not workin as intended in letter
