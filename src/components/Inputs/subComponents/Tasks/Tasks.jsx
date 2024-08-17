//
// COMPONENT: to gather logic that is in App.jsx in this example: https://stackblitz.com/edit/stackblitz-starters-tkpczr?file=src%2FApp.js,src%2Fcomponents%2FModal%2FModal.jsx

import { useState } from "react";
import TasksModal from "./TasksModal";

export default function Tasks({ content, issues }) {
  const [isTasksModalOpen, setTasksModalOpen] = useState(false);

  // functions to open and close Tasks modal
  const handleOpenTasksModal = () => {
    setTasksModalOpen(true);
  };
  const handleCloseTasksModal = () => {
    setTasksModalOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpenTasksModal}>Oppgavemeny</button>
      {/* (Modal only appears on above button click) */}
      <TasksModal isOpen={isTasksModalOpen} onClose={handleCloseTasksModal}>
        <button>test btn</button>
        <p>{content.applicationDate.getFullYear()}</p>
        {/* TESTING issues */}
        {issues.map((issueObj) => {
          return <button key={issueObj.issue}>{issueObj.issue}</button>;
        })}
      </TasksModal>
    </div>
  );
}
