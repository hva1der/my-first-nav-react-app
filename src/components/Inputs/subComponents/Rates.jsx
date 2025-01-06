// COMPONENT: radio input to select benefit rate

import styles from "../Inputs.module.css";

export default function Rates({ content, onChangeContent }) {
  return (
    <div className={styles.inputLine}>
      <label>
        Sats:
        <input
          type="radio"
          name="rateSelector"
          value="EV"
          onChange={(e) => {
            onChangeContent({ rate: e.target.value }, "checkIncomes");
          }}
        ></input>{" "}
        EV
      </label>
      <label>
        <input
          type="radio"
          name="rateSelector"
          value="EN"
          onChange={(e) => {
            onChangeContent({ rate: e.target.value }, "checkIncomes");
          }}
        ></input>{" "}
        EN
      </label>
    </div>
  );
}
