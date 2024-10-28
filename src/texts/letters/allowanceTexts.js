// Texts used in Allowance letter for new period and first time applications
// NB: Some of the old texts are still in 'Letters/subComponents/' (old format)

export const allowanceTexts = {
  // Initial text specifies applicaton date and award period.
  appAwardPeriod: (letterDates) => {
    return `Søknaden din av ${letterDates.formattedAppDate} er innvilget. 
    Du får supplerende stønad i perioden ${letterDates.formattedStartDate} 
    til ${letterDates.formattedEndDate}. Du kan søke ny periode i 
    ${letterDates.newApplicationMonth} ${letterDates.newApplicationYear}.`;
  },
};

// Not yet implemented/transferred to new format:
/* Text to be printed if awarding decision date coincides with control dates (i.e. in backdating cases) */
// controlClashText: {
//   attendance: {
//     controlClash: "Må møte til kontroll",
//     applyAgain: "Må møte for å søke ny periode",
//   },
//   noAttendance: {},
// },
