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

      <ul>
        {incomes &&
          incomes.map((income) => (
            <li key={income.name}>
              <input
                placeholder={income.type || "type"}
                onChange={(e) => {
                  income.type = e.target.value;
                  onChangeContent((incomes) => {
                    return {
                      incomes: [...incomes],
                    };
                  });
                }}
              />
              <input placeholder={income.name || "navn"} />
              <input placeholder={income.amount || "beløp"} />
            </li>
          ))}
      </ul>

      <button
        type="button"
        onClick={() => {
          onChangeContent(
            incomes
              ? {
                  incomes: [...incomes, {}],
                }
              : { incomes: [{}] }
          );
        }}
      >
        Legg til ytelse
      </button>
    </div>
  );
}
