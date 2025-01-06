// COMPONENT input dropdown menu to select claimants first right to reside in Norway

import { useState } from "react";
import styles from "../Inputs.module.css";

export default function FirstResidency({ content, onChangeContent }) {
  const { formType, firstResidency } = content;

  // state for EEA permanent residency checkbox
  const [eeaPermRes, setEeaPermRes] = useState(false);
  const handlChangeEEA = (e) => {
    setEeaPermRes(e.target.checked);
    onChangeContent({ EEAPermanentResidency: e.target.checked });
  };

  if (formType === "firstApplication") {
    return (
      <div className={styles.inputLine}>
        <label>
          Første oppholdstillatelse:
          <select
            value={firstResidency || "--Velg--"}
            onChange={(e) => {
              onChangeContent({ firstResidency: e.target.value }); //! Missing issue checker
            }}
          >
            <option disabled>--Velg--</option>
            <option value={"refugee"}>Flyktning</option>
            <option value={"noFamilyReunion"}>IKKE familegjenforening</option>
            <option value={"familyReunion"}>Familiegjenforening</option>
            <option value={"EEA"}>EØS</option>
            <option value={"nordic"}>Nordisk statsborger</option>
          </select>
        </label>
        {firstResidency === "EEA" && (
          // first R2R was via EEA route, has claimant been awarded permanent EEA residency?
          <label>
            Varig oppholdsbevis?
            <input
              type="checkBox"
              checked={eeaPermRes}
              onChange={handlChangeEEA}
            />
          </label>
        )}
      </div>
    );
  }
}
