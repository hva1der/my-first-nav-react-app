// COMPONENT: input field for application date

import styles from "../Inputs.module.css";

export default function ApplicationDate({ content, onChangeContent }) {
  const { formType } = content;

  if (formType !== "control") {
    // for all forms other than control, application Date is required input
    return (
      <div className={styles.inputSection}>
        <label>
          Søknadsdato:
          <input
            type="date"
            id="applicationDate"
            onChange={(e) => {
              onChangeContent({ applicationDate: new Date(e.target.value) });
            }}
          />
        </label>
      </div>
    );
  }
}
