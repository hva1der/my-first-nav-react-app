// COMPONENT: input field for effective date (start date of award period)

import styles from "../Inputs.module.css";
import { controlClash } from "../../../utilities/dateUtils";

export default function EffectiveDate({ content, onChangeContent }) {
  const { effectiveDate } = content; // effectiveDate is set by default in App.jsx to todays date

  // controlClash returns a "clash" object specifying whether claimant will be summoned for a control (common with backdating)
  const clashes = controlClash(effectiveDate).clash;

  return (
    <div className={styles.inputSection}>
      <label>
        Virkningstidspunkt:
        <input
          type="date"
          id="effectiveDate"
          onChange={(e) => {
            onChangeContent({ effectiveDate: new Date(e.target.value) });
          }}
        />
        {/* IF controlClash -> adds button to ask IF user has to attend for control */}
        {clashes === "controlClash" && (
          <button
            type="button"
            onClick={() => {
              onChangeContent({
                controlClashAttendance: !content.controlClashAttendance,
              });
            }}
          >
            {content.controlClashAttendance
              ? "Må møte til samtale"
              : "Må ikke møte"}
          </button>
        )}
      </label>
    </div>
  );
}
