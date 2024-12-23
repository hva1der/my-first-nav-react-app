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
import FinancialAidNotes from "./subComponents/FinancialAidNotes";
import TravelNotes from "./subComponents/TravelNotes";

export default function Notes({ content }) {
  // contents destructured for accessing texts
  const {
    applicationDate,
    effectiveDate,
    rate,
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
        Sats: <b>{rate}</b>
      </p>
      {/* Registered address (reminder for caseworker to add this to final note before saving) */}
      {rate === "EV" && <p>***Lim inn adressesøk i behandle sak oppgave***</p>}
      {rate === "EN" && <p>***Lim inn kopi av adressesøk her***</p>}
      {/* Date of last address change */}
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
      <h4>Utenlandsopphold</h4>
      <TravelNotes content={content} />
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
      <h4>Sosialstønad</h4>
      <FinancialAidNotes content={content} />

      {/* TESTING */}
      <button type="button" onClick={() => console.log(content)}>
        log content
      </button>
    </div>
  );
}
