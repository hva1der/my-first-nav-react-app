// COMPONENT registers claimant stays at institution

import styles from "../Inputs.module.css";

//! PROBLEM: No checker function

export default function Institutions({ content, onChangeContent }) {
  const { formType } = content;

  if (formType !== "control") {
    return (
      <div className={styles.inputLine}>
        <label>
          Institusjonsopphold:
          <input
            type="radio"
            name="institutionRadio"
            value={"yes"}
            onChange={(e) =>
              onChangeContent(
                { institution: e.target.value },
                "checkInstitutions"
              )
            }
          />
          Ja
        </label>
        <label>
          <input
            type="radio"
            name="institutionRadio"
            value={"no"}
            onChange={(e) =>
              onChangeContent(
                { institution: e.target.value },
                "checkInstitutions"
              )
            }
          />
          Nei
        </label>
      </div>
    );
  }
}
