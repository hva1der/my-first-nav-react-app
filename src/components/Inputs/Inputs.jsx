import { controlClash } from "../../utilities/dateUtils";
import styles from "./Inputs.module.css";
import ApplicationAttendance from "./subComponents/ApplicationAttendance";
import Incomes from "./subComponents/Incomes";
import Residency from "./subComponents/Residency";
import Savings from "./subComponents/Savings";
import Tasks from "../Tasks/Tasks";
import { checkForInputIssues } from "../../utilities/issuesUtils";
import { useEffect } from "react";
import Institutions from "./subComponents/Institutions";
import Passports from "./subComponents/Passports";

export default function Inputs({ onShowLetter, onChangeContent, content }) {
  const issues = { ...content.issues } || {};
  // Function to update content.issues - used at each user input
  function onUpdateIssues(testFunction) {
    // check for issue updates: returns -falsy- or a new/updated issue object in format {issueName: {active, terminal, resolution}}
    const issueUpdate = checkForInputIssues(content, testFunction);
    if (issueUpdate) {
      const issueName = Object.keys(issueUpdate)[0];
      issues[issueName] = issueUpdate[issueName]; // this contains the 3 key:value pairs under each issueName
      onChangeContent({ issues });
    }
  }

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
        {/* INPUT start date of award period */}
        <label>
          Virkningstidspunkt:
          <input
            type="date"
            id="effectiveDate"
            onChange={(e) => {
              onChangeContent({ effectiveDate: e.target.value });
            }}
          />
          {/* IF controlClash -> adds button to ask IF user has to attend for control */}
          {controlClash(content.effectiveDate).clash === "controlClash" && (
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

        {/* INPUT confirm attendance at application */}
        <ApplicationAttendance
          content={content}
          onChangeContent={onChangeContent}
        />
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
        {/* Institution admittance */}
        <Institutions content={content} onChangeContent={onChangeContent} />
        {/* Right to Reside */}
        <Residency
          content={content}
          onChangeContent={onChangeContent}
          onUpdateIssues={onUpdateIssues}
        />
        {/* Travel documents PLACEHOLDER */}
        <Passports content={content} onChangeContent={onChangeContent} />

        {/* INPUT Incomes COMPONENT */}
        <Incomes
          oldIncomes={content.incomes}
          onChangeContent={onChangeContent}
          onUpdateIssues={onUpdateIssues}
        />
        <Savings content={content} onChangeContent={onChangeContent} />
      </form>
      <button onClick={onShowLetter}>Show letter</button>
      {/* Tasks modal for handling issues */}
      <Tasks content={content} />
    </div>
  );
}
