import styles from "./Letters.module.css";
import { formatLetterDates } from "../../utilities/dateUtils";
import ControlClashText from "./subComponents/ControlClashText";
import IncomesText from "./subComponents/IncomesText";
import {
  oldAllowanceTexts,
  allowanceTexts,
} from "../../texts/letters/allowanceTexts";
import FinancialAidDeductions from "./subComponents/FinancialAidDeductions";

export default function Allowance({ content }) {
  // currently set to format dates as dd.mm.yyyy
  const letterDates = formatLetterDates(content);
  const { rate, formType } = content;

  return (
    <div className={styles.letterGlobal}>
      {/* Initial text detailing award period */}
      <p>{oldAllowanceTexts.appAwardPeriod(letterDates)}</p>
      {/* "Important" default instructions for user. 2 options: first time applicants and recurring periods */}

      {allowanceTexts.introHighlights[formType].map((para, index) => (
        <p key={index} className={styles[para?.style]}>
          {para.text}
        </p>
      ))}

      {/* Instructions to handle control attendance when backdating applications */}
      <ControlClashText
        effectiveDate={content.effectiveDate}
        attendance={content.controlClashAttendance}
      />
      {/* Deductions for financial aid (if applicable) */}
      <FinancialAidDeductions content={content} />

      {/* Decision grounds */}
      <p className={styles[allowanceTexts.groundsSectionHeader.style]}>
        {allowanceTexts.groundsSectionHeader.text}
      </p>
      {allowanceTexts.decisionGrounds[formType].map((para, index) => (
        <p key={index} className={styles[para?.style]}>
          {para.text}
        </p>
      ))}

      {/* Incomes that reduce award */}
      <p>{allowanceTexts.deductionsInfo.text}</p>

      {/* Assessment of original residency rights (only for first time applications) */}
      {allowanceTexts.originalResidency[formType]?.map((para, index) => (
        <p key={index} className={styles[para?.style]}>
          {para.text}
        </p>
      ))}

      {/* Living situation */}
      {allowanceTexts.livingSituation[rate]?.map((para, index) => (
        <p key={index} className={styles[para?.style]}>
          {para.text}
        </p>
      ))}

      {/* Income calculations (if any) */}
      <IncomesText
        incomes={content.incomes}
        rate={content.rate}
        effectiveDate={content.effectiveDate}
      />

      {/* Payment schedule */}
      <p>
        UTBETALING <br />
        Stønaden utbetales den 20. hver måned... Lorem Ipsum is simply dummy
        text of the printing and typesetting industry. Lorem Ipsum has been the
        industry's standard
      </p>

      {/* Tax information */}
      {allowanceTexts.taxInfo[formType]?.map((para, index) => (
        <p key={index} className={styles[para?.style]}>
          {para.text}
        </p>
      ))}

      {/* Guidance and complaints */}
      <p>
        VEILEDNING OG KLAGE <br />
        Dersom du har spørsmål... Lorem Ipsum is simply dummy text of the
        printing and typesetting industry. Lorem Ipsum has been the industry's
        standard
        <br /> <br />
        Du kan klage på dette vedtaket... Lorem Ipsum is simply dummy text of
        the printing and typesetting industry
        <br /> <br />
        Vi gjør oppmerksom på at du etter forvaltningsloven...
      </p>

      {/* Obligations */}
      <p>
        DINE PLIKTER <br />
        Det er viktig at du melder fra om endringer... <br />
        - Du endrer boforhold <br />
        - Du planlegger utenlandsopphold <br />
        - osv. <br />
      </p>

      {/* Signature */}
      <p>Med vennlig hilsen -saksbehandler- </p>
    </div>
  );
}
