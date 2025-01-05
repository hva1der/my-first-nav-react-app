// COMPONENT renders key dates for the various form types for Notes

import { formatDates } from "../../../utilities/dateUtils";

export default function KeyDatesNotes({ content }) {
  const {
    formType,
    effectiveDate,
    applicationDate,
    controlFormDate,
    controlSummonsDate,
    awardTerminatedDate,
  } = content;

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
          Kontrollnotat sendt: <b>{formatDates(controlSummonsDate)}</b>
        </p>
        <p>
          Stønad opphørt: <b>{formatDates(awardTerminatedDate)}</b>
        </p>
        <p>
          Kontrollnotat mottatt: <b>{formatDates(controlFormDate)}</b>
        </p>
      </div>
    );
  }
}
