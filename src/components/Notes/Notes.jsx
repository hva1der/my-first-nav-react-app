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
  firstResidencyTexts,
} from "../../texts/notesTexts";
import FinancialAidNotes from "./subComponents/FinancialAidNotes";
import TravelNotes from "./subComponents/TravelNotes";
import KeyDatesNotes from "./subComponents/KeyDatesNotes";
import IncomesNotes from "./subComponents/IncomesNotes";

export default function Notes({ content }) {
  // contents destructured for accessing texts
  const {
    formType,
    applicationDate,
    effectiveDate,
    rate,
    institution,
    firstResidency,
    residency,
    validPassport,
    travel,
    financialAid,
    addressChangedDate,
    attendance,
    noAttGrounds,
  } = content;

  return (
    <div className={styles.notesText}>
      {/* Key dates: application date, effective date, and control dates */}
      <KeyDatesNotes content={content} />
      {/* Personal attendance at application */}
      <p>
        Personlig fremmøte:{" "}
        <b>{attendance ? "Ja" : attendanceTexts[noAttGrounds]}</b>
      </p>
      {content.attendance === "Nei" && <p>{content.noAttGrounds}</p>}
      {/* Benefit rate */}
      <p>
        Sats: <b>{rate}</b>
      </p>
      {/* Registered address (reminder for caseworker to add this to final note before saving) */}
      {formType !== "control" && rate === "EV" && (
        <p>***Lim inn adressesøk i behandle sak oppgave***</p>
      )}
      {formType !== "control" && rate === "EN" && (
        <p>***Lim inn kopi av adressesøk her***</p>
      )}
      {/* Date of last address change */}
      {formType !== "control" && (
        <p>
          Siste adresseendring: <b>{formatDates(addressChangedDate)}</b>
        </p>
      )}
      {/* Stays at institutions */}
      {formType !== "control" && (
        <p>
          Institusjonsopphold: <b>{institutionTexts[institution] || ""}</b>
        </p>
      )}
      {/* First residency rights/ground */}
      {formType === "firstApplication" && (
        <p>
          Første oppholdstillatelse: {firstResidencyTexts?.[firstResidency]}
        </p>
      )}
      {/* Right to reside */}
      {formType !== "control" && (
        <p>
          Lovlig opphold: <b>{residencyTexts[residency] || ""}</b>
          {residency === "temporary" && `, utløper: "dato"`}
        </p>
      )}
      {/* Passport */}
      <p>
        Gyldig pass: <b>{passportTexts[validPassport] || ""}</b>
      </p>
      {/* Travel */}
      <h4>Utenlandsopphold</h4>
      <TravelNotes content={content} />
      {/* Savings - PLACEHOLDER functionality */}
      <p>Formue: {(+content.savings || 0) + (+content.partnerSavings || 0)}</p>

      {/* Incomes */}
      <IncomesNotes content={content} />

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
