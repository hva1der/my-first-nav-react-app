// Texts used in Allowance letter for new period and first time applications
// NB: Some of the old texts are still in 'Letters/subComponents/' (old format)

export const allowedTexts = {
  // Initial text specifies applicaton date and award period.
  appAwardPeriod: (letterDates) => {
    return `Søknaden din av ${letterDates.formattedAppDate} er innvilget. 
    Du får supplerende stønad i perioden ${letterDates.formattedStartDate} 
    til ${letterDates.formattedEndDate}. Du kan søke ny periode i 
    ${letterDates.newApplicationMonth} ${letterDates.newApplicationYear}.`;
  },
};
