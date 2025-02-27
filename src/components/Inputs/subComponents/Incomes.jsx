//
// COMPONENT inputs for categorised incomes

import { useState } from "react";
import { addBlankIncome } from "../../../utilities/incomeUtils";
import styles from "../Inputs.module.css";

export default function Incomes({
  oldIncomes,
  onChangeContent,
  onUpdateIssues,
}) {
  let [incomes, setIncomes] = useState(
    oldIncomes ? oldIncomes : [addBlankIncome()]
  );
  /* Function updates parent state "content" with incomes  */
  function onUpdateIncomes(incomes) {
    setIncomes(incomes);
    onChangeContent({ incomes }, "checkIncomes");
  }

  return (
    <div>
      {/* List of income input fields */}
      <h4>Inntekter</h4>
      <ul>
        {incomes.map((income) => (
          <li key={income.id}>
            <ul>
              <li>
                {/* User selects type of income (default: social security) */}
                <label>
                  Type:
                  <select
                    value={income.type}
                    onChange={(e) => {
                      income.type = e.target.value;
                      onUpdateIncomes(incomes);
                    }}
                  >
                    <option value="Arbeidsinntekt">Arbeidsinntekt</option>
                    <option value="Ytelser fra folketrygden">
                      Ytelser fra folketrygden
                    </option>
                    <option value="Private pensjoner">Private pensjoner</option>
                    <option value="Utenlandske pensjoner">
                      Utenlandske pensjoner
                    </option>
                    <option value="Kapitalinntekt">Kapitalinntekt</option>
                  </select>
                </label>
              </li>
              <li>
                {/* User inputs source of income */}
                <label>
                  Kilde:
                  <input
                    placeholder={income.source}
                    onChange={(e) => {
                      income.source = e.target.value;
                      onUpdateIncomes(incomes);
                    }}
                  />
                </label>
              </li>
              <li>
                {/* User inputs amount of income */}
                <label>
                  Sum:
                  <input
                    /* className={
                      issues[0].issue
                        ? styles.terminalIssue
                        : "placeholder no issues"
                    } */
                    placeholder={income.amount}
                    onChange={(e) => {
                      income.amount = e.target.value;
                      onUpdateIncomes(incomes);
                    }}
                  />
                </label>
              </li>
            </ul>
          </li>
        ))}
      </ul>

      {/* Button to add new blank income input fields */}
      <button
        type="button"
        onClick={() => {
          incomes.push(addBlankIncome(incomes));
          onChangeContent({ incomes });
        }}
      >
        Ny inntekt
      </button>
    </div>
  );
}
