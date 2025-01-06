// COMPONENT checks for valid passport(s)
// *PLACEHOLDER*

import styles from "../Inputs.module.css";

export default function Passports({ content, onChangeContent }) {
  return (
    <div className={styles.inputLine}>
      <label>
        Gyldig pass:
        <input
          type="radio"
          name="passportRadio"
          value={"yes"}
          onChange={(e) => onChangeContent({ validPassport: e.target.value })}
        />
        Ja
      </label>
      <label>
        <input
          type="radio"
          name="passportRadio"
          value={"no"}
          onChange={(e) => onChangeContent({ validPassport: e.target.value })}
        />
        Nei
      </label>
    </div>
  );
}
