//
// COMPONENT: Parent for TasksModal.jsx
// code from App.jsx here: https://stackblitz.com/edit/stackblitz-starters-tkpczr?file=src%2FApp.js,src%2Fcomponents%2FModal%2FModal.jsx

import { useState } from "react";
import TasksModal from "./TasksModal";
import { allIssues } from "../../../../utilities/issuesUtils";
import styles from "./Tasks.module.css";

export default function Tasks({ content }) {
  const [isTasksModalOpen, setTasksModalOpen] = useState(false);

  // functions to open and close Tasks modal
  const handleOpenTasksModal = () => {
    setTasksModalOpen(true);
  };
  const handleCloseTasksModal = () => {
    setTasksModalOpen(false);
  };

  // FUNCTION sets color of Tasks button depending on presence of terminal = red, non-terminal = yellow, resolved = green, or no issues = grey/default
  // TEMPORARY: only setting red or grey
  const tasksBtnColor = () => {
    if (content.issues) {
      for (let i = 0; i < allIssues.length; i++) {
        if (content.issues[allIssues[i]]?.active) {
          // Terminal issues present, alert user with red button
          return styles.redBtn;
        }
      }
    }
    // otherwise keep button grey
    return "greyBtn";
  };

  return (
    <div>
      <button onClick={handleOpenTasksModal} className={tasksBtnColor()}>
        Oppgavemeny
      </button>
      {/* (Modal only appears on above button click) */}
      <TasksModal
        isOpen={isTasksModalOpen}
        onClose={handleCloseTasksModal}
        content={content}
      ></TasksModal>
    </div>
  );
}
