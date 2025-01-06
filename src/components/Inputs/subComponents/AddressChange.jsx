// COMPONENT: input field for date of claimants last address change.

import styles from "../Inputs.module.css";

export default function AddressChange({ content, onChangeContent }) {
  const { formType } = content;

  if (formType !== "control") {
    // (address change only checked during applications, not for controls)
    return (
      <div className={styles.inputLine}>
        <label>
          Siste adresseendring:
          <input
            type="date"
            id="addressChange"
            onChange={(e) => {
              onChangeContent({ addressChange: new Date(e.target.value) });
            }}
          />
        </label>
      </div>
    );
  }
}
