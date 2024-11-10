// COMPONENT prints travel/staysAbroad details in Notes

import { travelTexts } from "../../../texts/notesTexts";
import {
  daysBetween,
  defaultDateFormat,
  travelDetails,
} from "../../../utilities/dateUtils";

export default function TravelNotes({ content }) {
  const { effectiveDate, staysAbroad } = content;

  if (staysAbroad?.length > 0) {
    return (
      <ul>
        {staysAbroad.map((stay) => {
          const {
            departure = "AVREISE",
            arrival = "ANKOMST",
            netDuration = 0,
          } = travelDetails(effectiveDate, stay.date1, stay.date2);
          return (
            <li key={stay.id}>
              {travelTexts.simpleStay(departure, arrival, netDuration)}
            </li>
          );
        })}
      </ul>
    );
  }

  return <div>hello</div>;
}
