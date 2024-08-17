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
        {awardPeriod(content.effectiveDate).periodStart.join(".")} til{" "}
        {awardPeriod(content.effectiveDate).periodEnd.join(".")}. Du kan søke ny
        periode i {canApplyAgain(content.effectiveDate).newApplicationMonth}{" "}
        {canApplyAgain(content.effectiveDate).newApplicationYear}.
      </p>
      <ControlClashText
        effectiveDate={content.effectiveDate}
        attendance={content.controlClashAttendance}
      />
      <IncomesText
        incomes={content.incomes}
        rate={content.rate}
        effectiveDate={content.effectiveDate}
      />
    </div>
  );
}
