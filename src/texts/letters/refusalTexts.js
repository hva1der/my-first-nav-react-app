// Texts used in Refusal letters

export const refusalTexts = {
  // Initial text specifies application date and confirms refusal
  applicationRefused: (letterDates) => {
    return `Søknaden din av ${letterDates.formattedAppDate} er avslått.`;
  },

  // Refusal grounds to follow
};
