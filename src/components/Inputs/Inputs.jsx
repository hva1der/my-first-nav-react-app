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
import FirstResidency from "./subComponents/FirstResidency";
import FormSelector from "./subComponents/FormSelector";
import ApplicationDate from "./subComponents/ApplicationDate";
import EffectiveDate from "./subComponents/EffectiveDate";
import Rates from "./subComponents/Rates";
import AddressChange from "./subComponents/AddressChange";
import ControlDates from "./subComponents/ControlDates";

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

  return (
    <div className={styles.inputsField}>
      {/* Select form type: First time application, new period or control forms */}
      <FormSelector onChangeContent={onChangeContent} />
      {/* INPUT application date (if formType is an application) */}
      <ApplicationDate content={content} onChangeContent={onChangeContent} />
      {/* INPUT start date of award period */}
      <EffectiveDate content={content} onChangeContent={onChangeContent} />
      {/* INPUT dates relevant for control forms (renders only for formType: control) */}
      <ControlDates content={content} onChangeContent={onChangeContent} />
      {/* INPUT confirm attendance at application */}
      <ApplicationAttendance
        content={content}
        onChangeContent={onChangeContent}
      />
      {/* Radio to select benefit rate */}
      <Rates content={content} onChangeContent={onChangeContent} />
      {/* Date of last adress change */}
      <AddressChange content={content} onChangeContent={onChangeContent} />
      {/* Institution admittance */}
      <Institutions content={content} onChangeContent={onChangeContent} />
      {/* Original right to reside - only for first time applications */}
      <FirstResidency content={content} onChangeContent={onChangeContent} />
      {/* Current right to Reside */}
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

      {/* Financial aid PLACEHOLDER */}
      <FinancialAid content={content} onChangeContent={onChangeContent} />

      {/* Tasks modal for handling issues */}
      <Tasks content={content} />
    </div>
  );
}
