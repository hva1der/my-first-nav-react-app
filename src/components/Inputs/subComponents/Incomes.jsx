//
// COMPONENT inputs for categorised incomes

import { useState } from "react";
import { addBlankIncome, allIncomeTypes } from "../../../utilities/incomeUtils";
import styles from "../Inputs.module.css";

export default function Incomes({ content, onChangeContent }) {
  const { rate, incomes, partnerIncomes } = content;

  // function adds a new income to the income array,
  function handleSubmitNewIncome(e, targetIncomes = "incomes") {
    e.preventDefault();
    // get form data
    const form = e.target;
    const formData = new FormData(form); //* For FormData key is the form input's "name" and value is "value"
    // get the selected income type
    const selectedIncomeType = formData.get("selectedIncomeType");
    // find expanded details for the selected income type
    const incomeTypeDetails = allIncomeTypes.find(
      (income) => income.incomeType === selectedIncomeType
    );
    const oldIncomes = content[targetIncomes] || [];
    // create a new income object with default details, and a unique id
    const newIncome = { ...incomeTypeDetails, id: crypto.randomUUID() };
    const updatedIncomes = [...oldIncomes, newIncome];
    // update parent content with new income
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
          {/* map through income types */}
          {allIncomeTypes.map((income) => (
            <option key={income.incomeType} value={income.incomeType}>
              {income.incomeType}
            </option>
          ))}
        </select>
        {/* Add income button */}
        <button type="submit">Legg til inntekt</button>
      </form>

      {(rate === "EN" || rate === "EO") && ( // TODO: "EN" for testing, remember to change to "EU"
        <div>
          <h5>Ektefelles inntekter</h5>
          <form onSubmit={(e) => handleSubmitNewIncome(e, "partnerIncomes")}>
            {/* Select income type to add */}
            <select name="selectedIncomeType" defaultValue="alderspensjon">
              {/* map through income types */}
              {allIncomeTypes.map((income) => (
                <option key={income.incomeType} value={income.incomeType}>
                  {income.incomeType}
                </option>
              ))}
            </select>
            {/* Add income button */}
            <button type="submit">Legg til inntekt</button>
          </form>
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
