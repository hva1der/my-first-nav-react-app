import { controlClash } from "../../utilities/dateUtils";
import styles from "./Inputs.module.css";
import ApplicationAttendance from "./subComponents/ApplicationAttendance";
import Incomes from "./subComponents/Incomes";
import Residency from "./subComponents/Residency";
import Task from "./subComponents/Task";

export default function Inputs({ onShowLetter, onChangeContent, content }) {
  return (
    <div className={styles.inputsField}>
      <form>
        {/* INPUT application date */}
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
        {/* INPUT confirm attendance at application */}
        <ApplicationAttendance
          content={content}
          onChangeContent={onChangeContent}
        />
        {/* Right to Reside */}
        <Residency content={content} onChangeContent={onChangeContent} />
        {/* INPUT start date of award period - rename to "Effective Date" */}
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

        {/* Radio to select benefit rate */}
        <label>
          <input
            type="radio"
            name="rateSelector"
            value="EV"
            onChange={(e) => {
              onChangeContent({ rate: e.target.value });
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
              onChangeContent({ rate: e.target.value });
            }}
          ></input>{" "}
          EN
        </label>

        {/* INPUT Incomes COMPONENT */}
        <Incomes
          oldIncomes={content.incomes}
          onChangeContent={onChangeContent}
        />
      </form>
      <button onClick={onShowLetter}>Show letter</button>
      {/* MODAL testing */}
      <Task />
    </div>
  );
}
