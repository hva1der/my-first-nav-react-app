//
// Any longer texts for notes are stored here
// ISSUE: Consider reformatting to match format of letter texts (i.e. having a parent object)

import { formatDates } from "../utilities/dateUtils";

// Application Attendance Texts for actions taken where a claimant has failed to attend personally to apply for the benefit
// OLD VERSION - keep until update to below format
export const appAttTexts = {
  validFail: "Det foreligger både gyldig legeerklæring og fullmakt.",
  noRep: "Personen som leverte søknad har ikke fullmakt. ",
  noMedEv: "Ikke gyldig legeerklæring.",
  noGrounds: "Det foreligger hverken fullmakt eller legeerklæring.",
};

// NEW FORMAT

// Attendance at application
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
export const travelTexts = { yes: "Ja", no: "Nei" };
// Savings
// Incomes
// Financial aid
export const financialAidTexts = (financialAid, effectiveDate) => {
  switch (financialAid) {
    case "no":
      return `Nei`;
    case "fetching":
      return `Innhenter sosialstønad fra ${formatDates(effectiveDate).join(
        "."
      )}`;
    // PLACEHOLDER pending implementation of financial Aid calculation
    case "yes":
      return `Ja`;
  }
};
// Confirmation questions (checked for foreign pension, council pensions etc. - tick boxes)
