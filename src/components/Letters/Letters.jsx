import styles from "./Letters.module.css";
import {
  formatDates,
  awardPeriod,
  canApplyAgain,
} from "../../utilities/dateUtils";
import ControlClashText from "./subComponents/ControlClashText";
import IncomesText from "./subComponents/IncomesText";

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
      <IncomesText
        incomes={content.incomes}
        rate={content.rate}
        newPeriodStartDate={content.newPeriodStartDate}
      />
    </div>
  );
}
