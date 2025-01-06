// COMPONENT renders key dates for the various form types for Notes

import { addMonths, formatDates } from "../../../utilities/dateUtils";

export default function KeyDatesNotes({ content }) {
  const {
    formType,
    effectiveDate,
    applicationDate,
    controlFormDate,
    controlSummonsDate,
    awardTerminatedDate,
  } = content;

  let defaultTerminationDate = addMonths(controlSummonsDate, 0, 0);
  // if (formatDates(controlSummonsDate)) {

  //   // a valid summons date has been inputted by caseworker -> award automatically terminates on last day of same month
  //   terminationDate = addMonths(controlSummonsDate, 0, 0)
  // }

  if (formType !== "control") {
    return (
      <div>
        <p>
          {/* Application date */}
          Søknadsdato: <b>{formatDates(applicationDate)}</b>
        </p>
        {/* Effective date */}
        <p>
          Virkningstidspunkt: <b>{formatDates(effectiveDate)}</b>
        </p>
      </div>
    );
  } else if (formType === "control") {
    return (
      <div>
        <p>
          Virkningstidspunkt: <b>{formatDates(effectiveDate)}</b>
        </p>
        <p>
          Innkalling sendt: <b>{formatDates(controlSummonsDate)}</b>
        </p>
        <p>
          Stønad opphørt:{" "}
          <b>
            {formatDates(awardTerminatedDate) ||
              formatDates(defaultTerminationDate)}
          </b>
        </p>
        <p>
          Kontrollnotat mottatt: <b>{formatDates(controlFormDate)}</b>
        </p>
      </div>
    );
  }
}
