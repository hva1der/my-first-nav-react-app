import styles from "./Notes.module.css";
import { formatDates } from "../utilities/dateUtils";
import { yearlyIncome } from "../utilities/incomeUtils";

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
          content.incomes.map((income) => (
            <li key={income.id}>
              {income.source}: {yearlyIncome(income.amount)}
            </li>
          ))}
      </ul>

      {/* TESTING */}
      <button type="button" onClick={() => console.log(content)}>
        log content
      </button>
    </div>
  );
}
