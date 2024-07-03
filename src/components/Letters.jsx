import styles from "./Letters.module.css";
import {
  formatDates,
  awardPeriod,
  canApplyAgain,
} from "../utilities/dateUtils";
import basetexts from "../texts/letters/baseTexts";

//testing
import ControlClashText from "../texts/letters/letterComponents/ControlClashText";

export default function Letters({ content }) {
  return (
    <div>
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
    </div>
  );
}
