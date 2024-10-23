import { refusalTexts } from "../../texts/Letters/refusaltexts";
import { formatLetterDates } from "../../utilities/dateUtils";
import styles from "./Letters.module.css";

// COMPONENT renders refusal letters
export default function Refusal({ content }) {
  // currently set to format dates as dd.mm.yyyy
  const letterDates = formatLetterDates;
  return (
    <div className={styles.letterGlobal}>
      {/* Initial text confirms refusal of application of "applicationDate" */}
      <p>{refusalTexts.applicationRefused(letterDates)}</p>
    </div>
  );
}
