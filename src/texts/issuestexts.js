// Descriptive names of issues, descriptions of issues etc. Sorted by issueName as defined in the issue checker functions
// In NORWEGIAN

const issuesTexts = {
  // Income issues
  excessIncome: {
    longName: "Høy inntekt",
    description: "Inntekt for høy for innvilgelse elns...",
    resolution:
      "Vurder om det er sannsynlig at inntekt vil reduseres i fremtiden. Eller, om det evt. skal vurderes å innvilge fra et tidligere tidspunkt.",
  },
  lowAward: {
    longName: "Under 2 prosent",
    description: "Stønad er under 2 prosent av høy sats... osv ...",
    resolution:
      "Vurder om det er sannsynlig at inntekt vil reduseres i fremtiden. Eller, om det evt. skal vurderes å innvilge fra et tidligere tidspunkt.",
  },
  // PLACEHOLDER issues texts
  // Institution issues
  institutionAdmittance: {
    longName: "Institusjonsopphold",
    description:
      "ADVARSEL: Funksjonalitet for institusjonsopphold er ikke implementert enda",
    resolution:
      "Dersom institusjonsoppholdet ikke står i veien for innvilgelse kan du fortsette, men du må legge inn tekst osv. manuelt ",
  },
};

export default issuesTexts;
