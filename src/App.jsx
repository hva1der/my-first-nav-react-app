import { useState } from "react";
import styles from "./App.module.css";
import Inputs from "./components/Inputs";
import Notes from "./components/Notes";
import Letters from "./components/Letters";

export default function App() {
  const [content, setContent] = useState({
    applicationDate: "01.01.2024",
    newPeriodStartDate: "01.01.2024",
    rate: "EV",
  });
  const onChangeContent = (newContent) => {
    setContent({ ...content, ...newContent });
  };

  const [showLetter, setShowLetter] = useState(true);

  return (
    <div className={styles.mainContent}>
      {/* INPUT FIELDS */}
      <Inputs
        content={content}
        onChangeContent={onChangeContent}
        onShowLetter={() => setShowLetter(!showLetter)}
      />

      {/* OUTPUT FIELDS */}
      <div className={styles.outputsField}>
        {/* Notes */}
        <div className={styles.textBox}>
          <Notes content={content} />
        </div>

        {/* Letter */}
        <div className={styles.textBox}>
          {/* Button to hide content (in case people find it distracting to have live updates) */}
          {showLetter && <Letters content={content} />}
        </div>
      </div>
    </div>
  );
}
