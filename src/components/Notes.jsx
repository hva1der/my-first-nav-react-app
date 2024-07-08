import styles from "./Notes.module.css";
import { formatDates } from "../utilities/dateUtils";

export default function Notes({ content }) {
  return (
    <div className={styles.notesText}>
      <p>
        Søknadsdato: <b>{formatDates(content.applicationDate).join(".")}</b>
      </p>
      <p>
        Virkningstidspunkt:{" "}
        <b>{formatDates(content.newPeriodStartDate).join(".")}</b>
      </p>
      <p>
        Sats: <b>{content.rate}</b>
      </p>
      <h4>Inntekter</h4>
      <ul>
        {content.incomes &&
          content.incomes.map((income) => {
            <li>{income.type}</li>;
          })}
      </ul>
    </div>
  );
}
