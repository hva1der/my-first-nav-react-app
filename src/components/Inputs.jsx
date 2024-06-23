import styles from "./Inputs.module.css";

export default function Inputs({ onShowLetter, onChangeContent }) {
  return (
    <div className={styles.inputsField}>
      <form>
        <label>
          Søknadsdato:
          <input
            type="date"
            id="applicationDate"
            onChange={(e) => {
              e.preventDefault;
              onChangeContent({ applicationDate: e.target.value });
            }}
          />
        </label>
        <label>
          Sats:
          <input
            type="text"
            id="rate"
            onChange={(e) => {
              onChangeContent({ rate: e.target.value });
            }}
          />
        </label>
      </form>
      <button onClick={onShowLetter}>Show letter</button>
      <button
        onClick={() =>
          console.log(document.getElementById("applicationDate").value)
        }
      >
        log content
      </button>
    </div>
  );
}
