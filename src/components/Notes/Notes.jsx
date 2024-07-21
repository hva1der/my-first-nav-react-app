import styles from "./Notes.module.css";
import { formatDates } from "../../utilities/dateUtils";
import { yearlyIncome } from "../../utilities/incomeUtils";

export default function Notes({ content }) {
  return (
    <div className={styles.notesText}>
      {/* Application date */}
      <p>
        Søknadsdato: <b>{formatDates(content.applicationDate).join(".")}</b>
      </p>
      {/* Personal attendance at application */}
      <p>Personlig fremmøte: {content.attendance}</p>
      {content.attendance === "Nei" && <p>{content.noAttGrounds}</p>}
      {/* Effective date */}
      <p>
        Virkningstidspunkt:{" "}
        <b>{formatDates(content.newPeriodStartDate).join(".")}</b>
      </p>
      {/* Benefit rate */}
      <p>
        Sats: <b>{content.rate}</b>
      </p>
      {/* Incomes */}
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
