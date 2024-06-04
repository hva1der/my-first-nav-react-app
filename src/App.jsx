import { useState } from "react";

import styles from "./App.module.css";

// add simple input on left and a textbox on the right that simply displays the inputted data again

export default function App() {
  const [firstText, setFirstText] = useState("Nothing added yet");
  const [showLetter, setShowLetter] = useState(true);

  return (
    <div className={styles.mainContent}>
      <div className={styles.inputsField}>
        <input
          type="text"
          placeholder="hello"
          onChange={(e) => {
            e.preventDefault;
            setFirstText(e.target.value);
          }}
        />
        <button onClick={() => setShowLetter(!showLetter)}>Show letter</button>
      </div>

      {/* OUTPUT FIELDS */}
      <div className={styles.outputsField}>
        <div className={styles.notesField}>
          <p className={styles.content}>another line of content</p>
        </div>

        <div className={styles.letterField}>
          {showLetter && <p className={styles.content}>{firstText}</p>}
        </div>
      </div>
    </div>
  );
}
