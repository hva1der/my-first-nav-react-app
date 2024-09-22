//
// COMPONENT checks right to reside for claimant.

import { checkResidency } from "../../../utilities/issuesUtils";

export default function Residency({
  content,
  onChangeContent,
  onUpdateIssues,
}) {
  return (
    <div>
      <label>
        Lovlig opphold:
        <select
          value={content.residency || "--Velg--"}
          onChange={(e) => {
            onChangeContent({ residency: e.target.value }, "checkResidency");
            // onUpdateIssues("checkResidency");
          }}
        >
          <option disabled>--Velg--</option>
          <option value={"permanent"}>Permanent oppholdstillatelse</option>
          <option value={"temporary"}>Midlertidig oppholdstillatelse</option>
          <option value={"none"}>Ikke gyldig opphold</option>
        </select>
      </label>
      {content.residency === "temporary" && (
        // Residency is temporary - record expiry date
        <label>
          Utløpsdato:
          <input
            type="date"
            onChange={(e) =>
              onChangeContent(
                { residencyExpiry: new Date(e.target.value) },
                "checkResidency"
              )
            }
          />
        </label>
      )}
    </div>
  );
}
