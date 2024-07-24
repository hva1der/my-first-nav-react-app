//
// COMPONENT checks right to reside for claimant.

export default function Residency({ content, onChangeContent }) {
  return (
    <div>
      <label>
        Lovlig opphold:
        <select
          value={content.residency || "--Velg--"}
          onChange={(e) => onChangeContent({ residency: e.target.value })}
        >
          <option disabled>--Velg--</option>
          <option value={"Permanent"}>Permanent oppholdstillatelse</option>
          <option value={"Temporary"}>Midlertidig oppholdstillatelse</option>
          <option value={"None"}>Ikke gyldig opphold</option>
        </select>
      </label>
      {content.residency === "Temporary" && (
        <label>
          Utløpsdato:
          <input
            type="date"
            onChange={(e) =>
              onChangeContent({ residencyExpiry: new Date(e.target.value) })
            }
          />
        </label>
      )}
    </div>
  );
}
