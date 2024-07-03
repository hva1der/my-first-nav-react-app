import { controlClash } from "../utilities/dateUtils";
import styles from "./Inputs.module.css";

export default function Inputs({ onShowLetter, onChangeContent, content }) {
  return (
    <div className={styles.inputsField}>
      <form>
        <label>
          Søknadsdato:
          <input
            type="date"
            id="applicationDate"
            onChange={(e) => {
              onChangeContent({ applicationDate: e.target.value });
            }}
          />
        </label>
        <label>
          Virkningstidspunkt:
          <input
            type="date"
            id="newPeriodStartDate"
            onChange={(e) => {
              onChangeContent({ newPeriodStartDate: e.target.value });
            }}
          />
          {/* IF controlClash -> adds button to ask IF user has to attend for control */}
          {controlClash(content.newPeriodStartDate).clash ===
            "controlClash" && (
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
        <label>
          Sats:
          <input
            type="text"
            id="rate"
            onChange={(e) => {
              onChangeContent({ rate: e.target.value });
            }}
          />
        </label>
      </form>
      <button onClick={onShowLetter}>Show letter</button>
      <button
        onClick={() =>
          console.log(document.getElementById("applicationDate").value)
        }
      >
        log content
      </button>
    </div>
  );
}
