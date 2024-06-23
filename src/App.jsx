import { useState } from "react";
import styles from "./App.module.css";
import Inputs from "./components/Inputs";
import Notes from "./components/Notes";

// add simple input on left and a textbox on the right that simply displays the inputted data again

export default function App() {
  const [firstText, setFirstText] = useState("Nothing added yet");
  const [showLetter, setShowLetter] = useState(true);

  return (
    <div className={styles.mainContent}>
      <Inputs onShowLetter={() => setShowLetter(!showLetter)} />

      {/* OUTPUT FIELDS */}
      <div className={styles.outputsField}>
        {/* Notes */}
        <div className={styles.textBox}>
          <Notes />
        </div>

        {/* Letter */}
        <div className={styles.textBox}>{showLetter && <p>{firstText}</p>}</div>
      </div>
    </div>
  );
}
