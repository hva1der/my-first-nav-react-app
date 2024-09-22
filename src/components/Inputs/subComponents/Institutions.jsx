// COMPONENT registers claimant stays at institution

// PROBLEM: No checker function

export default function Institutions({ content, onChangeContent }) {
  return (
    <div>
      <h4>Institusjonsopphold</h4>
      <label>
        Ja
        <input
          type="radio"
          name="institutionRadio"
          value={"yes"}
          onChange={(e) => onChangeContent({ institution: e.target.value })}
        />
      </label>
      <label>
        Nei
        <input
          type="radio"
          name="institutionRadio"
          value={"no"}
          onChange={(e) => onChangeContent({ institution: e.target.value })}
        />
      </label>
    </div>
  );
}
