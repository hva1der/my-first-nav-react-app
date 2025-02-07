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
      onChangeContent({ validPassport: undefined }, "checkPassport");
    } else {
      // If the box is checked (no passport), clear/reset the date and confirm -false- the user has no passport
      onChangeContent({ validPassport: false }, "checkPassport");
    }
  };

  // Convert validPassport from js Date to "yyyy-mm-dd" so it can be read/displayed as a value in the input field
  let displayPassportDate;
  if (validPassport) {
    displayPassportDate = validPassport.toISOString().split("T")[0]; // (ISOString returns date in the format: "2025-02-05T21:19:56.239Z")
  }

  return (
    <div className={styles.inputLine}>
      <label>
        Utløpsdato pass:
        <input
          type="date"
          id="passportDate"
          disabled={!hasPassport}
          value={displayPassportDate || ""}
          // update parent state "content" with passport expiry date (reset to undefined if the hasPassport box is checked and unchecked again)
          onChange={(e) =>
            onChangeContent(
              { validPassport: new Date(e.target.value) },
              "checkPassport"
            )
          }
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
