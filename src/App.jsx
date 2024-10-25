import { useState } from "react";
import styles from "./App.module.css";
import Inputs from "./components/Inputs/Inputs";
import Notes from "./components/Notes/Notes";
import Allowance from "./components/Letters/Allowance";
import Refusal from "./components/Letters/Refusal";
import { checkForInputIssues, terminalIssues } from "./utilities/issuesUtils";

export default function App() {
  const [content, setContent] = useState({
    applicationDate: new Date(),
    effectiveDate: new Date(),
    rate: "EV",
  });

  // Function updates content, and optionally checks for application issues
  function onChangeContent(newContent, testFunction) {
    // Create copy of content and update it with changes
    let updatedContent = { ...content, ...newContent };
    if (!testFunction) {
      // add new content without checking for issues
      setContent(updatedContent);
      return;
    }
    // check for issue updates: returns -falsy- or a new/updated issue object in format {issueName: {active, terminal, resolution}}
    const issueUpdate = checkForInputIssues(updatedContent, testFunction);
    if (issueUpdate) {
      const issueName = Object.keys(issueUpdate)[0];
      updatedContent.issues = updatedContent.issues || {};
      updatedContent.issues[issueName] = issueUpdate[issueName];
    }
    setContent(updatedContent);
  }

  // testing
  terminalIssues(content);

  return (
    <div className={styles.mainContent}>
      {/* INPUT FIELDS */}
      <Inputs content={content} onChangeContent={onChangeContent} />

      {/* OUTPUT FIELDS */}
      <div className={styles.outputsField}>
        {/* Notes */}
        <div className={styles.textBox}>
          <Notes content={content} />
        </div>

        {/* Letter */}
        <div className={styles.textBox}>
          {terminalIssues(content) ? (
            // At least one terminal issue is present => render Refusal letter
            <Refusal content={content} />
          ) : (
            // No terminal issues => render Allowance letter
            <Allowance content={content} />
          )}
        </div>
      </div>
    </div>
  );
}
