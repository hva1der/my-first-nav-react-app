//
// COMPONENT renders letter text for attendance if controls or new period dates <= decision date

import { controlClash } from "../../../utilities/dateUtils";

// Render 1 of 3 statements ***NB: change to take from basetexts, instead of specified here! ***
export default function ControlClashText({
  newPeriodStartDate,
  attendance = false,
}) {
  const controlClashDisplay = controlClash(newPeriodStartDate);

  if (attendance && controlClashDisplay.clash) {
    return (
      <p>
        MÅ MØTE TIL KONTROLLSAMTALE <br />
        Du må møte til kontrollsamtale...
      </p>
    );
  } else if (controlClashDisplay.clash === "applyAgain") {
    return (
      <p>
        OPPHØR AV STØNADSPERIODEN <br />
        Stønadsperioden opphører...
      </p>
    );
  } else if (controlClashDisplay.clash === "controlClash") {
    return (
      <p>
        MÅ IKKE MØTE TIL KONTROLLSAMTALE <br />
        Automatisk innkalling kan ikke stoppes...
      </p>
    );
  }
}
