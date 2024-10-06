// COMPONENT checks for stays abroad
// *PLACEHOLDER*

export default function Travel({ content, onChangeContent }) {
  return (
    <div>
      <h4>Utenlandsopphold</h4>
      <label>
        Ja
        <input
          type="radio"
          name="passportRadio"
          value={"yes"}
          onChange={(e) => onChangeContent({ travel: e.target.value })}
        />
      </label>
      <label>
        Nei
        <input
          type="radio"
          name="passportRadio"
          value={"no"}
          onChange={(e) => onChangeContent({ travel: e.target.value })}
        />
      </label>
    </div>
  );
}
