//
// Any longer texts for notes are stored here
// ISSUE: Consider reformatting to match format of letter texts (i.e. having a parent object)

import { formatDates } from "../utilities/dateUtils";

// Application Attendance: possible grounds for failing to attend
export const attendanceTexts = {
  validFail: "Det foreligger både gyldig legeerklæring og fullmakt.",
  noRep: "Personen som leverte søknad har ikke fullmakt. ",
  noMedEv: "Ikke gyldig legeerklæring.",
  noGrounds: "Det foreligger hverken fullmakt eller legeerklæring.",
};
// Stays at institutions
export const institutionTexts = { yes: "Ja", no: "Nei" };
// Right to reside
export const residencyTexts = {
  permanent: "Permanent",
  temporary: "Midlertidig",
  none: "Ikke gyldig opphold",
};
// Passport
export const passportTexts = { yes: "Ja", no: "Nei" };
// Travel
export const travelTexts = {
  // Entire stay is after effectiveDate (within new award period)
  afterDate: (departure, arrival, grossDuration, netDuration) =>
    `Utenlandsopphold ${departure} - ${arrival}, ${netDuration} dager.`,
  // Departure date is before effectiveDate
  acrossDate: (departure, arrival, grossDuration, netDuration) =>
    `Utenlandsopphold ${departure} - ${arrival}, 
  ${grossDuration} dager totalt. ${netDuration} dager i ny periode.`,
  // Whole stay is before effecttiveDate (before award period, so not relevant) // ? Refactor? Duplictes code with "acrossDate" above
  beforeDate: (departure, arrival, grossDuration, netDuration) =>
    `Utenlandsopphold ${departure} - ${arrival}, 
  ${grossDuration} dager totalt. ${netDuration} dager i ny periode.`,
  // Default text when no stays have been registered
  noStaysAbroad: "Ingen utenlandsopphold.",
};
// Savings
// Incomes
// Financial aid
export const financialAidTexts = {
  noBackdate: "Ikke aktuelt, ingen tilbakedatering.",
  no: "Nei, bekreftet av:",
  fetching: (effectiveDate) => `Innhenter sosialstønad fra ${effectiveDate}:`,
  yes: {
    calculation: (
      effectiveDate,
      financialAidAmount,
      averageFinancialAid
    ) => `Bruker har mottatt sosialstønad på
   ${financialAidAmount} kroner i perioden ${effectiveDate} til dags dato. I snitt utgjør dette
   ${averageFinancialAid} per måned.`,
    excessAid: `Utbetalt SU etter fradrag for inntekt og sosialstønad er under 2% av sats for EN.
    Bruker innvilges derfor utsatt periode SU.`,
    noExcess: `Beløpet trekkes fra utbetalt SU.  FI fra neste måned uten fradrag for sos. `,
  },
};

// Confirmation questions (checked for foreign pension, council pensions etc. - tick boxes)
