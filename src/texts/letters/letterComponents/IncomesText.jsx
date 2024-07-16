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
        <p>{padIncome(incomes, "Arbeidsinntekt")}</p>
        <p>{padIncome(incomes, "Ytelser fra folketrygden")}</p>
        <p>{padIncome(incomes, "Private pensjoner")}</p>
        <p>{padIncome(incomes, "Utenlandske pensjoner")}</p>
        <p>{padIncome(incomes, "Kapitalinntekt")}</p>
        <p>---------------------------------------------------</p>
        <p>{padIncome(incomes, "Sum")}</p>
      </div>
    );
  }
}
