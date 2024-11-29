//
// COMPONENT: Popup/Modal/Dialog box that contains instructions and text for tasks to be created in Gosys
// *** Aim to make this reausable so I can replicate it in other projects...? ***

import { useEffect, useRef, useState } from "react";
import { allIssues } from "../../utilities/issuesUtils";
import issuesTexts from "../../texts/issuestexts";
import styles from "./Tasks.module.css";
import TaskResolution from "./subComponents/TaskResolution";

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
/* 
showModal() makes it modal - only object user can interact with

show() makes it non-modal - such as a for a tooltip 'on hover' functionality
*/

export default function TasksModal({ isOpen, onClose, content, children }) {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  // ref
  const modalRef = useRef(null);

  /* 090824: Try to understand this part better! */
  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
    setIsModalOpen(false);
  };

  /* Enable use of escape key to close modal */
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };
  // The meat of the matter *** Delete comment once below fully understood ***
  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const modalElement = modalRef.current;

    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isModalOpen]);

  // State for rendering currently selected issue within the modal
  const [selectedIssue, setSelectedIssue] = useState("dummyIssue"); // change to a blank issue?

  // Array of currently active issues
  let currentIssues = [];
  if (content.issues) {
    for (let i = 0; i < allIssues.length; i++) {
      if (content.issues[allIssues[i]]?.active) {
        currentIssues.push(allIssues[i]);
      }
    }
  }

  return (
    <dialog ref={modalRef} onKeyDown={handleKeyDown}>
      {/* Modal content */}
      <div className={styles.modalContent}>
        {/* Do need the IF test in the example here?? "hasCloseBtn" ?? */}
        <button className={styles.btnCloseModal} onClick={handleCloseModal}>
          Lukk
        </button>

        {/* Row of buttons to select issue out of currently active issues */}
        <div>
          {currentIssues.map((issue) => (
            <button onClick={() => setSelectedIssue(issue)} key={issue}>
              {issuesTexts[issue]?.longName || "error no longName"}
            </button>
          ))}
        </div>

        {/* Issue solution options */}
        <TaskResolution content={content} selectedIssue={selectedIssue} />
      </div>
    </dialog>
  );
}
