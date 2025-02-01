// COMPONENT handles user input for passport validity

import { useState } from "react";
import styles from "../Inputs.module.css";

export default function Passports({ content, onChangeContent }) {
  const { validPassport } = content;
  // Local state tracking if claimant has presented with passport
  const [hasPassport, setHasPassport] = useState(true);

  // Handles user toggling whether claimant has passport
  const handleChangeHasPassport = (e) => {
    const updatedHasPassport = !e.target.checked;
    setHasPassport(updatedHasPassport);
    if (updatedHasPassport) {
      // If the box is unchecked (passport presented), allow date input again
      onChangeContent({ validPassport: undefined });
    } else {
      // If the box is checked (no passport), clear/reset the date and confirm -false- the user has no passport
      onChangeContent({ validPassport: false });
    }
  };

  return (
    <div className={styles.inputLine}>
      <label>
        Utløpsdato pass:
        <input
          type="date"
          disabled={!hasPassport}
          value={validPassport || ""}
          // update parent state "content" with passport expiry date (reset to undefined if the hasPassport box is checked and unchecked again)
          onChange={(e) => onChangeContent({ validPassport: e.target.value })}
        />
      </label>
      <label>
        <input
          type="checkBox"
          // the value is opposite, i.e. checked indicates the claimant has -not- presented a passport
          checked={!hasPassport}
          onChange={handleChangeHasPassport}
        />
        Ikke fremvist pass
      </label>
    </div>
  );
}
