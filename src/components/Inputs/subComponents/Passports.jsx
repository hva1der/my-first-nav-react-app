// COMPONENT checks for valid passport(s)
// *PLACEHOLDER*

export default function Passports({ content, onChangeContent }) {
  return (
    <div>
      <h4>Gyldig pass</h4>
      <label>
        Ja
        <input
          type="radio"
          name="passportRadio"
          value={"yes"}
          onChange={(e) => onChangeContent({ validPassport: e.target.value })}
        />
      </label>
      <label>
        Nei
        <input
          type="radio"
          name="passportRadio"
          value={"no"}
          onChange={(e) => onChangeContent({ validPassport: e.target.value })}
        />
      </label>
    </div>
  );
}
