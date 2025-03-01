//
// COMPONENT inputs for categorised incomes

import { useState } from "react";
import { addBlankIncome } from "../../../utilities/incomeUtils";
import styles from "../Inputs.module.css";
import { incomeCategories } from "../../../utilities/incomeUtils";

export default function Incomes({ content, onChangeContent }) {
  const { rate, incomes, partnerIncomes } = content;

  // state for managing adding of new income of type x
  const [incomeToAdd, setIncomeToAdd] = useState("");

  // function adds a new income to the income array,
  // TODO: with specified parameters, based on the type of income
  // NEW add income function - form submit version
  function handleSubmitNewIncome(e, targetIncomes = "incomes") {
    e.preventDefault();
    // get form data
    const form = e.target;
    const formData = new FormData(form);
    // get the selected income type
    const incomeType = formData.get("selectedIncomeType");
    const oldIncomes = content[targetIncomes] || [];
    const newIncome = { type: incomeType, id: crypto.randomUUID() };
    const updatedIncomes = [...oldIncomes, newIncome];

    onChangeContent({ [targetIncomes]: updatedIncomes }, "checkIncomes");
  }

  // function updates an (existing) income in the array of incomes (belonging to claimant or partner)
  function handleUpdateIncome(
    targetIncomes = "incomes", // defaults to claimants own incomes
    incomeID, // id of the income to update
    valueToUpdate, // startDate or amount (or frequency?)
    newValue
  ) {
    // get current list of incomes for the relevant recipient
    const oldIncomes = content[targetIncomes];
    // update value for the specified incomeID and valueToUpdate
    const updatedIncomes = oldIncomes.map((income) =>
      income.id === incomeID ? { ...income, [valueToUpdate]: newValue } : income
    );
    onChangeContent({ [targetIncomes]: updatedIncomes }, "checkIncomes");
  }

  // Function deletes income with specified ID
  function handleDeleteIncome(targetIncomes = "incomes", incomeID) {
    const oldIncomes = content[targetIncomes];
    const updatedIncomes = oldIncomes.filter(
      (income) => income.id !== incomeID
    );
    onChangeContent({ [targetIncomes]: updatedIncomes }, "checkIncomes");
  }

  return (
    <div>
      <h4>Inntekter</h4>
      <form onSubmit={(e) => handleSubmitNewIncome(e, "incomes")}>
        {/* Select income type to add */}
        <select name="selectedIncomeType" defaultValue="alderspensjon">
          <option disabled>--Velg--</option>
          <option value={"alderspensjon"}>Alderspensjon</option>
          <option value={"arbeidsavklaringspenger"}>
            Arbeidsavklaringspenger
          </option>
        </select>
        {/* Add income button */}
        <button type="submit">Legg til inntekt</button>
      </form>

      {(rate === "EN" || rate === "EO") && ( // TODO: "EN" for testing, remember to change to "EU"
        <div>
          <h5>Ektefelles inntekter</h5>
        </div>
      )}
    </div>
  );
}

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// find existing incomes of same type
// const oldIncomesOfType = oldIncomes.filter(
//   (income) => income.type === incomeType
// );
//
//
//
//

// export default function Incomes({ oldIncomes, onChangeContent }) {
//   let [incomes, setIncomes] = useState(
//     oldIncomes ? oldIncomes : [addBlankIncome()]
//   );
//   /* Function updates parent state "content" with incomes  */
//   function onUpdateIncomes(incomes) {
//     setIncomes(incomes);
//     onChangeContent({ incomes }, "checkIncomes");
//   }

//   return (
//     <div>
//       {/* List of income input fields */}
//       <h4>Inntekter</h4>
//       <ul>
//         {incomes.map((income) => (
//           <li key={income.id}>
//             <ul>
//               <li>
//                 {/* User selects type of income (default: social security) */}
//                 <label>
//                   Type:
//                   <select
//                     value={income.type}
//                     onChange={(e) => {
//                       income.type = e.target.value;
//                       onUpdateIncomes(incomes);
//                     }}
//                   >
//                     <option value="Arbeidsinntekt">Arbeidsinntekt</option>
//                     <option value="Ytelser fra folketrygden">
//                       Ytelser fra folketrygden
//                     </option>
//                     <option value="Private pensjoner">Private pensjoner</option>
//                     <option value="Utenlandske pensjoner">
//                       Utenlandske pensjoner
//                     </option>
//                     <option value="Kapitalinntekt">Kapitalinntekt</option>
//                   </select>
//                 </label>
//               </li>
//               <li>
//                 {/* User inputs source of income */}
//                 <label>
//                   Kilde:
//                   <input
//                     placeholder={income.source}
//                     onChange={(e) => {
//                       income.source = e.target.value;
//                       onUpdateIncomes(incomes);
//                     }}
//                   />
//                 </label>
//               </li>
//               <li>
//                 {/* User inputs amount of income */}
//                 <label>
//                   Sum:
//                   <input
//                     /* className={
//                       issues[0].issue
//                         ? styles.terminalIssue
//                         : "placeholder no issues"
//                     } */
//                     placeholder={income.amount}
//                     onChange={(e) => {
//                       income.amount = e.target.value;
//                       onUpdateIncomes(incomes);
//                     }}
//                   />
//                 </label>
//               </li>
//             </ul>
//           </li>
//         ))}
//       </ul>

//       {/* Button to add new blank income input fields */}
//       <button
//         type="button"
//         onClick={() => {
//           incomes.push(addBlankIncome(incomes));
//           onChangeContent({ incomes });
//         }}
//       >
//         Ny inntekt
//       </button>
//     </div>
//   );
// }
