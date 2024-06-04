import { useState } from "react";

import styles from "./Inputs.module.css";

export default function Inputs({ onShowLetter }) {
  return (
    <div className={styles.inputsField}>
      <input
        type="text"
        placeholder="hello"
        onChange={(e) => {
          e.preventDefault;
          /* setFirstText(e.target.value); */
        }}
      />
      <button onClick={onShowLetter}>Show letter</button>
    </div>
  );
}
