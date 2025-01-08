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

  // termination date for failure to attend for control defaults to end of same month the summons was sent
  const defaultTerminationDate = addMonths(controlSummonsDate, 0, 0);

  const defaultStartDate = addMonths(controlSummonsDate, 1, 1);

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
        {/* Control summons sent date */}
        <p>
          Innkalling sendt: <b>{formatDates(controlSummonsDate)}</b>
        </p>
        {/* Date of automated termination due to failure to attende for control */}
        <p>
          Stønad opphørt:{" "}
          <b>
            {formatDates(awardTerminatedDate) ||
              formatDates(defaultTerminationDate)}
          </b>
        </p>
        {/* Control form received date */}
        <p>
          Kontrollnotat mottatt: <b>{formatDates(controlFormDate)}</b>
        </p>
        {/* Award reinstated from date */}
        <p>
          Setter i gang stønad fra: <b>{formatDates(defaultStartDate)}</b>{" "}
        </p>
      </div>
    );
  }
}
