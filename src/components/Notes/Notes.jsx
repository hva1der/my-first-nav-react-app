import styles from "./Notes.module.css";
import { formatDates } from "../../utilities/dateUtils";
import { yearlyIncome } from "../../utilities/incomeUtils";
import {
  attendanceTexts,
  institutionTexts,
  residencyTexts,
  passportTexts,
  travelTexts,
  financialAidTexts,
} from "../../texts/notesTexts";

export default function Notes({ content }) {
  // contents destructured for accessing texts
  const {
    applicationDate,
    effectiveDate,
    institution,
    residency,
    validPassport,
    travel,
    financialAid,
  } = content;

  return (
    <div className={styles.notesText}>
      {/* Application date */}
      <p>
        Søknadsdato: <b>{formatDates(applicationDate).join(".")}</b>
      </p>
      {/* Effective date */}
      <p>
        Virkningstidspunkt: <b>{formatDates(effectiveDate).join(".")}</b>
      </p>
      {/* Personal attendance at application */}
      <p>
        Personlig fremmøte: <b>{content.attendance}</b>
      </p>
      {content.attendance === "Nei" && <p>{content.noAttGrounds}</p>}
      {/* Benefit rate */}
      <p>
        Sats: <b>{content.rate}</b>
      </p>
      {/* Stays at institutions */}
      <p>
        Institusjonsopphold: <b>{institutionTexts[institution] || ""}</b>
      </p>

      {/* Right to reside */}
      <p>
        Lovlig opphold: <b>{residencyTexts[residency] || ""}</b>
        {residency === "temporary" && `, utløper: "dato"`}
      </p>
      {/* Passport */}
      <p>
        Gyldig pass: <b>{passportTexts[validPassport] || ""}</b>
      </p>
      {/* Travel */}
      <p>
        Utenlandsopphold: <b>{travelTexts[travel] || ""}</b>
      </p>
      {/* Savings */}
      <p>Formue: {(+content.savings || 0) + (+content.partnerSavings || 0)}</p>

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

      {/* Financial aid */}
      <p>
        Sosialstønad: <b>{financialAidTexts(financialAid, effectiveDate)}</b>
      </p>

      {/* TESTING */}
      <button type="button" onClick={() => console.log(content)}>
        log content
      </button>
    </div>
  );
}
