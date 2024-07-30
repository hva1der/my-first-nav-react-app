//
// COMPONENT: Popup/Modal/Dialog box that contains instructions and text for tasks to be created in Gosys

import { useState } from "react";

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
/* 
The CSS ::backdrop pseudo-element can be used to style the backdrop of a modal dialog, 
which is displayed behind the <dialog> element when the dialog is displayed using the 
HTMLDialogElement.showModal() method. For example, this pseudo-element could be used to blur, 
darken, or otherwise obfuscate the inert content behind the modal dialog. 

The autofocus attribute should be added to the element the user is expected to interact with 
immediately upon opening a modal dialog. If no other element involves more immediate interaction, 
it is recommended to add autofocus to the close button inside the dialog, or the dialog itself if 
the user is expected to click/activate it to dismiss.

showModal() makes it modal - only object user can interact with

show() makes it non-modal - such as a for a tooltip 'on hover' functionality

*** Will be using 'useRef' or useEffect hooks ?


*/

/* THINK ABOUT RENAMING STUFF
-> Write some pseudo code etc. for what I actually want from this
and what is most user friendly
*/

export default function Task() {
  const [openTask, setOpenTask] = useState(false);

  const handleOpenTask = () => {
    setOpenTask(true);
  };

  const handleCloseTask = () => {
    setOpenTask(false);
  };

  return (
    <div>
      <button id="openModal" onClick={handleOpenTask}>
        Open the modal
      </button>
      <dialog id="modal" className="modal">
        <button
          id="closeModal"
          className="modal-close-btn"
          onClick={handleCloseTask}
        >
          Close
        </button>
        <p>Is this a popup?</p>
      </dialog>
    </div>
  );
}
