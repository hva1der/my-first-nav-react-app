// Descriptive names of issues, descriptions of issues etc. Sorted by issueName as defined in the issue checker functions
// In NORWEGIAN

// NB file name and imports etc should be updated to "tasksTexts.js" - will cause issues with Vercel deployment so deal with later (guidance saved in word doc on repos)

const issuesTexts = {
  // Income issues
  excessIncome: {
    longName: "Høy inntekt",
    description: "Inntekt for høy for innvilgelse elns...",
    resolution:
      "Vurder om det er sannsynlig at inntekt vil reduseres i fremtiden. Eller, om det evt. skal vurderes å innvilge fra et tidligere tidspunkt.",
    refusalGrounds:
      "Vedtaket er fattet etter §6 i lov om supplerende stønad for personar med kort butid i Noreg.",
  },
  lowAward: {
    longName: "Under 2 prosent",
    description: "Stønad er under 2 prosent av høy sats... osv ...",
    resolution:
      "Vurder om det er sannsynlig at inntekt vil reduseres i fremtiden. Eller, om det evt. skal vurderes å innvilge fra et tidligere tidspunkt.",
    refusalGrounds:
      "Vedtaket er fattet etter §6 og 9 i lov om supplerende stønad for personar med kort butid i Noreg.",
  },
  // Savings issues
  excessSavings: {
    longName: "Formue over 0,5G",
    description:
      "Ved formue over 0,5G, for tiden 62 014, skal søknaden avslås etter §8.",
    resolution:
      "Bruk excell arket -navn på excel ark- for formuesvurdering. Det må evt. vurderes tilpasning og utestengelse.",
    refusalGrounds:
      "Vedtaket er fattet etter §8 i lov om supplerende stønad for personar med kort butid i Noreg.",
  },
  // Financial aid issues (all non-terminal)
  fetchingFinancialAid: {
    longName: "Innhenting av sosialstønad fra Nav lokal",
    description:
      "Opprett Vurder henvendelse oppgave til Nav lokal med tema SU og frist 1 uke.",
    resolution: `Bruker har satt frem krav om supplerende stønad. Dersom bruker eller eventuell 
      ektefelle har mottatt økonomisk sosialhjelp skal denne gå til fradrag i en evt. etterbetaling. 
      Vi ber derfor om at det oppgis hva de evt. har mottatt i økonomisk sosialhjelp per måned i 
      perioden 01xxxx til og med dags dato. Dersom det ikke er utbealt noe så bes også dette bekreftet.`,
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
