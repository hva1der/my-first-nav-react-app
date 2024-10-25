import { baseTexts } from "../../texts/baseTexts";
import { refusalTexts } from "../../texts/Letters/refusaltexts";
import { formatLetterDates } from "../../utilities/dateUtils";
import styles from "./Letters.module.css";

// COMPONENT renders refusal letters
export default function Refusal({ content }) {
  // currently set to format dates as dd.mm.yyyy
  const letterDates = formatLetterDates(content);
  return (
    <div className={styles.letterGlobal}>
      {/* Initial text confirms refusal of application of "applicationDate" */}
      <p>{refusalTexts.applicationRefused(letterDates)}</p>
      {/* Grounds */}
      <p>BEGRUNNELSE</p>
      {/* Complaints guidance */}
      <p>
        {baseTexts.complaints.title} <br />
        {baseTexts.complaints.paragraphs[0]} <br />
        <br />
        {baseTexts.complaints.paragraphs[1]} <br />
        <br />
        {baseTexts.complaints.paragraphs[2]}
      </p>
      {/* Closing salutation and organisation signature */}
      <p>
        <br />
        {baseTexts.close} <br />
        {baseTexts.department}
      </p>
    </div>
  );
}
