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
          name="passportRadio"
          value={"yes"}
          onChange={(e) => onChangeContent({ FinancialAid: e.target.value })}
        />
      </label>
      <label>
        Nei
        <input
          type="radio"
          name="passportRadio"
          value={"no"}
          onChange={(e) => onChangeContent({ FinancialAid: e.target.value })}
        />
      </label>
    </div>
  );
}
