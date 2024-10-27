import { baseTexts } from "../../texts/baseTexts";
import issuesTexts from "../../texts/issuestexts";
import { refusalTexts } from "../../texts/Letters/refusaltexts";
import { formatLetterDates } from "../../utilities/dateUtils";
import styles from "./Letters.module.css";

// COMPONENT renders refusal letters
export default function Refusal({ content, liveIssues }) {
  // currently set to format dates as dd.mm.yyyy
  const letterDates = formatLetterDates(content);
  return (
    <div className={styles.letterGlobal}>
      {/* Initial text confirms refusal of application of "applicationDate" */}
      <p>{refusalTexts.applicationRefused(letterDates)}</p>
      {/* Grounds - (placeholder - currently only shows § ground for each issue, repeated simply) */}
      <div>
        BEGRUNNELSE <br />
        {/* Map through array of issues that are both active and terminal - prints grounds from issuesTexts */}
        {liveIssues.map((issue, index) => (
          <div key={index}>{issuesTexts[issue].refusalGrounds}</div>
        ))}
      </div>
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
