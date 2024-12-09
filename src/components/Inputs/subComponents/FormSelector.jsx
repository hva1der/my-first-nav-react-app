// COMPONENT renders buttons to select form type

import styles from "../Inputs.module.css";
import { inputLabels } from "../../../texts/inputTexts";

export default function FormSelector({ onChangeContent }) {
  // Function handles select form type
  function handleFormSelect(e) {
    onChangeContent({ formType: e.target.value });
  }

  return (
    // Form type selectors. In a div for rendering as a row of buttons
    <div className={styles.selectFormBtnsRow}>
      {/* 3 options for form: first time applicants, new period, and control */}
      <button type="button" value="firstApplication" onClick={handleFormSelect}>
        {inputLabels.selectFormBtns.firstTimeApply}
      </button>
      <button type="button" value="newPeriod" onClick={handleFormSelect}>
        {inputLabels.selectFormBtns.newPeriod}
      </button>
      <button type="button" value="control" onClick={handleFormSelect}>
        {inputLabels.selectFormBtns.control}
      </button>
    </div>
  );
}
