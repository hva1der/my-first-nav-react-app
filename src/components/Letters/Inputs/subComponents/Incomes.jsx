//
// COMPONENT form with inputs for categorised incomes
//      - each category to have option to add X income entries
// PROBLEM: Needs to work also for users partners incomes

export default function Incomes({ incomes, onChangeContent }) {
  /* function to add income details to content  */
  function addIncomeType(newType) {
    onChangeContent({
      incomes: {},
    });
  }

  return (
    <div>
      {/* NEW VERSION */}
      <h4>Inntekter</h4>
    </div>
  );
}
