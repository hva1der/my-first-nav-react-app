// COMPONENT prints travel/staysAbroad details in Notes

import { travelTexts } from "../../../texts/notesTexts";
import { travelDetails } from "../../../utilities/dateUtils";

export default function TravelNotes({ content }) {
  const { effectiveDate, staysAbroad } = content;

  if (staysAbroad?.length > 0) {
    if (staysAbroad?.[0].date1 && staysAbroad?.[0].date2) {
      // render only once both dates are entered
      return (
        <ul>
          {staysAbroad.map((stay) => {
            // travelDetails returns an object with journey details
            const { type, departure, arrival, grossDuration, netDuration } =
              travelDetails(effectiveDate, stay.date1, stay.date2);
            return (
              <li key={stay.id}>
                {/* Access the relevant text in travelTexts using the `type` property */}
                {travelTexts[type](
                  departure,
                  arrival,
                  grossDuration,
                  netDuration
                )}
              </li>
            );
          })}
        </ul>
      );
    }
  }
  // No stays abroad confirmation text
  return <div>{travelTexts.noStaysAbroad}</div>;
}
