// COMPONENT checks for financial aid
// *PLACEHOLDER*

export default function FinancialAid({ content, onChangeContent }) {
  return (
    <div>
      <h4>Sosialstønad</h4>
      <label>
        Ja
        <input
          type="radio"
          name="financialAidRadio"
          value={"yes"}
          onChange={(e) => onChangeContent({ financialAid: e.target.value })}
        />
      </label>
      <label>
        Nei
        <input
          type="radio"
          name="financialAidRadio"
          value={"no"}
          onChange={(e) => onChangeContent({ financialAid: e.target.value })}
        />
      </label>
      <label>
        Innhenter
        <input
          type="radio"
          name="financialAidRadio"
          value={"fetching"}
          onChange={(e) => onChangeContent({ financialAid: e.target.value })}
        />
      </label>
      {content.financialAid === "yes" && (
        <label>
          Sum:
          <input
            type="number"
            onChange={(e) =>
              onChangeContent(
                { financialAidAmount: e.target.value },
                "checkFinancialAid"
              )
            }
          />
        </label>
      )}
    </div>
  );
}
