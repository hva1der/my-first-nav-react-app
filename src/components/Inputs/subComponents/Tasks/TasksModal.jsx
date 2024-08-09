//
// COMPONENT: Popup/Modal/Dialog box that contains instructions and text for tasks to be created in Gosys
// *** Aim to make this reausable so I can replicate it in other projects...? ***

import { useEffect, useRef, useState } from "react";

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
/* 
showModal() makes it modal - only object user can interact with

show() makes it non-modal - such as a for a tooltip 'on hover' functionality

*** Will be using 'useRef' or useEffect hooks ?
*/

/* THINK ABOUT RENAMING STUFF
-> Write some pseudo code etc. for what I actually want from this
and what is most user friendly
*/

export default function TasksModal({ isOpen, onClose, children }) {
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
  // The meat of the matter *** Delete comment once understood ***
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

  return (
    <dialog ref={modalRef} onKeyDown={handleKeyDown}>
      {/* Do need the IF test in the example here?? "hasCloseBtn" ?? */}
      <button onClick={handleCloseModal}>Lukk</button>
      {children}
    </dialog>
  );
}
