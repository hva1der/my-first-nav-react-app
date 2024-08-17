//
// COMPONENT renders incomes overview section of letters (simplified text if there are no incomes)

import { padIncome, netAward } from "../../../utilities/incomeUtils";

export default function IncomesText({ rate, incomes, effectiveDate }) {
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
        <p>---------------------------------------------------</p>
        <p></p>

        <p>
          Du får {netAward(incomes, rate, effectiveDate).yearly} per år og{" "}
          {netAward(incomes, rate, effectiveDate).monthly} kroner per måned
          supplerende stønad.
        </p>
      </div>
    );
  }
}
