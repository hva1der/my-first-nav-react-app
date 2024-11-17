// COMPONENT prints travel/staysAbroad details in Notes

import { travelTexts } from "../../../texts/notesTexts";
import { travelDetails } from "../../../utilities/dateUtils";

export default function TravelNotes({ content }) {
  const { effectiveDate, staysAbroad } = content;

  if (staysAbroad?.length > 0) {
    if (staysAbroad?.[0].departure && staysAbroad?.[0].arrival) {
      // render only once both dates are entered
      return (
        <ul>
          {staysAbroad.map((stay) => {
            // travelDetails returns an object with journey details
            const {
              type,
              formatDeparture,
              formatArrival,
              grossDuration,
              netDuration,
            } = travelDetails(stay.departure, stay.arrival, effectiveDate);
            return (
              <li key={stay.id}>
                {/* Access the relevant text in travelTexts using the `type` property */}
                {travelTexts[type](
                  formatDeparture,
                  formatArrival,
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
