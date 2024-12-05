import { controlClash } from "../../utilities/dateUtils";
import styles from "./Inputs.module.css";
import ApplicationAttendance from "./subComponents/ApplicationAttendance";
import Incomes from "./subComponents/Incomes";
import Residency from "./subComponents/Residency";
import Savings from "./subComponents/Savings";
import Tasks from "../Tasks/Tasks";
import { checkForInputIssues } from "../../utilities/issuesUtils";
import Institutions from "./subComponents/Institutions";
import Passports from "./subComponents/Passports";
import Travel from "./subComponents/Travel";
import FinancialAid from "./subComponents/FinancialAid";
import { inputLabels } from "../../texts/inputTexts";

export default function Inputs({ onChangeContent, content }) {
  const issues = { ...content.issues } || {};
  // Function to update content.issues - used at each user input
  //? Is this outdated/no longer used?
  function onUpdateIssues(testFunction) {
    // check for issue updates: returns -falsy- or a new/updated issue object in format {issueName: {active, terminal, resolution}}
    const issueUpdate = checkForInputIssues(content, testFunction);
    if (issueUpdate) {
      const issueName = Object.keys(issueUpdate)[0];
      issues[issueName] = issueUpdate[issueName]; // this contains the 3 key:value pairs under each issueName
      onChangeContent({ issues });
    }
  }

  // Function handle select form type
  function handleFormSelect(e) {
    onChangeContent({ formType: e.target.value });
  }

  return (
    <div className={styles.inputsField}>
      <form>
        {/* Form type selectors. In a div for rendering as a row of buttons */}
        <div className={styles.selectFormBtnsRow}>
          {/* 3 options for form: first time applicants, new period, and control */}
          <button
            type="button"
            value="firstApplication"
            onClick={handleFormSelect}
          >
            {inputLabels.selectFormBtns.firstTimeApply}
          </button>
          <button type="button" value="newPeriod" onClick={handleFormSelect}>
            {inputLabels.selectFormBtns.newPeriod}
          </button>
          <button type="button" value="control" onClick={handleFormSelect}>
            {inputLabels.selectFormBtns.control}
          </button>
        </div>
        {/* INPUT application date */}
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
        {/* INPUT start date of award period */}
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

        {/* Travel PLACEHOLDER */}
        <Travel content={content} onChangeContent={onChangeContent} />

        {/* INPUT Incomes COMPONENT */}
        <Incomes
          oldIncomes={content.incomes}
          onChangeContent={onChangeContent}
          onUpdateIssues={onUpdateIssues}
        />

        {/* Savings */}
        <Savings content={content} onChangeContent={onChangeContent} />
      </form>

      {/* Financial aid PLACEHOLDER */}
      <FinancialAid content={content} onChangeContent={onChangeContent} />

      {/* Tasks modal for handling issues */}
      <Tasks content={content} />
    </div>
  );
}
