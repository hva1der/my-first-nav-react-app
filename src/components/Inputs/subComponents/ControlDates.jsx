// COMPONENT input dates specific to control forms
import styles from "../Inputs.module.css";

export default function ControlDates({ content, onChangeContent }) {
  const { formType } = content;

  if (formType === "control") {
    // control forms require specific dates for date of summons for control, date benefit terminated (due to failure to attend for control) and date they (eventually) attended for control
    return (
      <div className={styles.inputSection}>
        <label>
          Innkalling sendt:
          <input
            type="date"
            id="controlSummonsDate"
            onChange={(e) => {
              onChangeContent({ controlSummonsDate: new Date(e.target.value) });
            }}
          />
        </label>
        <label>
          Stønad opphørt:
          <input
            type="date"
            id="awardTerminatedDate"
            onChange={(e) => {
              onChangeContent({
                awardTerminatedDate: new Date(e.target.value),
              });
            }}
          />
        </label>
        <label>
          Kontrollnotat mottatt
          <input
            type="date"
            id="controlFormDate"
            onChange={(e) => {
              onChangeContent({ controlFormDate: new Date(e.target.value) });
            }}
          />
        </label>
      </div>
    );
  }
}
