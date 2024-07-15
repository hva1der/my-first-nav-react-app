import styles from "./Letters.module.css";
import {
  formatDates,
  awardPeriod,
  canApplyAgain,
} from "../utilities/dateUtils";
import basetexts from "../texts/letters/baseTexts";

//testing
import ControlClashText from "../texts/letters/letterComponents/ControlClashText";
import IncomesText from "../texts/letters/letterComponents/IncomesText";

export default function Letters({ content }) {
  return (
    <div className={styles.letterGlobal}>
      <p>
        Søknaden din av {formatDates(content.applicationDate).join(".")} er
        innvilget. Du får supplerende stønad i perioden{" "}
        {awardPeriod(content.newPeriodStartDate).periodStart.join(".")} til{" "}
        {awardPeriod(content.newPeriodStartDate).periodEnd.join(".")}. Du kan
        søke ny periode i{" "}
        {canApplyAgain(content.newPeriodStartDate).newApplicationMonth}{" "}
        {canApplyAgain(content.newPeriodStartDate).newApplicationYear}.
      </p>
      <ControlClashText
        newPeriodStartDate={content.newPeriodStartDate}
        attendance={content.controlClashAttendance}
      />
      <IncomesText incomes={content.incomes} rate={content.rate} />
    </div>
  );
}
