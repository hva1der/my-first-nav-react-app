// Descriptive names of issues, descriptions of issues etc. Sorted by issueName as defined in the issue checker functions
// In NORWEGIAN

// ! file name and imports etc should be updated to "tasksTexts.js" - will cause issues with Vercel deployment so deal with later (guidance saved in word doc on repos)

// TODO: Add new prop to "paragraphs": isBold:boolean - for formatting of text
//? Change longName to something more descriptive?
//? Consider replacing dummy issue with checks within components etc
// * "paragraphs" key of solutionTexts must be formatted as a function(?)
// * "paragraphs" takes paramaters as object "params" to enable planned replication of functionality (as opposed to taking named props that are unique to each instance)

const issuesTexts = {
  // * Dummy/placeholder text for when no issue is selected or no solution selected:
  dummyIssue: {
    longName: "No issues",
    description: "Ingen problemer funnet eller valgt",
    hasSolutions: false,
    possibleSolutions: ["dummySolution", "dummySolution2"],
    solutionTexts: {
      dummySolution: {
        inputText: "Dummy Solution input text",
        title: "This is a dummy solution.",
        paragraphs: (params) => [
          {
            style: "boldSolution",
            text: `This is for testing. ${params.dummyParam}`,
          },
          { text: "consider changing to proper placeholder text." },
        ],
      },
      dummySolution2: {
        inputText: "Dummy Solution input text 2",
        title: "This is a dummy solution. 2",
        paragraphs: (params) => [
          { text: "This is for testing. 2" },
          { text: "consider changing to proper placeholder text. 2" },
        ],
      },
    },
  },
  //* ---------------------
  // Income issues
  excessIncome: {
    longName: "Høy inntekt",
    description:
      "Brukers inntekt overstiger stønadssats og skal avslås etter §6.",
    hasSolutions: false,
    resolution:
      "Vurder om det er sannsynlig at inntekt vil reduseres i fremtiden. Eller, om det evt. skal vurderes å innvilge fra et tidligere tidspunkt.",
    refusalGrounds:
      "Vedtaket er fattet etter §6 i lov om supplerende stønad for personar med kort butid i Noreg.",
  },
  lowAward: {
    longName: "Under 2 prosent",
    description:
      "Etter fradrag for inntekter utgjør SU til utbetaling under 2% av høy sats, og skal derfor avslås etter §6 og 9.",
    resolution:
      "Vurder om det er sannsynlig at inntekt vil reduseres i fremtiden. Eller, om det evt. skal vurderes å innvilge fra et tidligere tidspunkt.",
    refusalGrounds:
      "Vedtaket er fattet etter §6 og 9 i lov om supplerende stønad for personar med kort butid i Noreg.",
  },
  // ----------------------
  // Original residency rights issues (all terminal)
  familyReunion: {
    longName: "Familieinnvandring",
    description:
      "Brukers første oppholdstillatelse var etter familieinnvandring med krav om underhold",
    resolution: "Ingen løsning. Bruker er utestengt fra SU.",
    refusalGrounds:
      "Vedtaket er fattet etter §3 i lov om supplerende stønad for personar med kort butid i Noreg.",
  },
  noResidencyBasis: {
    longName: "Ikke grunnlag for opphold",
    description:
      "Brukers første oppholdstillatelse var ikke etter hjemmel som danner grunnlag for permanent oppholdstillatelse",
    resolution: "Ingen løsning. Bruker er utestengt fra SU.",
    refusalGrounds:
      "Vedtaket er fattet etter §3 i lov om supplerende stønad for personar med kort butid i Noreg.",
  },
  // ---------------------
  // Ongoing residency issues
  // EEA, but not permanent => terminal
  // Expired
  //
  // ---------------------
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
    longName: "Sosialstønad",
    description: "Ved tilbakedatert SU skal sosialstønad gå til fradrag",
    hasSolutions: true,
    possibleSolutions: ["fetchFinancialAid"],
    solutionTexts: {
      fetchFinancialAid: {
        inputText: "Innhent sosialstønad",
        title: "Innhent sosialstønad fra Nav lokal slik:",
        paragraphs: (params) => [
          // ! Missing param for date of financial aid period
          {
            style: `boldSolution`,
            text: `Opprett vurder henvendelse oppgave til Nav lokal med frist 1 uke, og følgende tekst:`,
          },
          {
            text: `Bruker har satt frem krav om supplerende stønad. Dersom bruker eller eventuell 
          ektefelle har mottatt økonomisk sosialhjelp skal denne gå til fradrag i en evt. etterbetaling. 
          Vi ber derfor om at det oppgis hva de evt. har mottatt i økonomisk sosialhjelp per måned i 
          perioden 01xxxx til og med dags dato. Dersom det ikke er utbealt noe så bes også dette bekreftet.`,
          },
          {
            style: `boldSolution`,
            text: `Flytt frist på behandle sak oppgaven 1 uke frem i tid. La den ligge på din benk i påvente av svar.`,
          },
        ],
      },
    },
  },
  // Travel issues
  pastShortStay: {
    longName: "Reise",
    description: "Bruker har vert i utlandet under 90 dager.",
    hasSolutions: true,
    possibleSolutions: ["documented", "probable", "fetchDocs"],
    solutionTexts: {
      documented: {
        inputText: "Dokumentert",
        title: "Utenlandsoppholdet er dokumentert.",
        paragraphs: (params) => [
          { text: "Du trenger ikke gjøre noe annet. Husk å lagre." },
        ],
      },
      probable: {
        inputText: "Sannsynliggjort",
        title: "Utenlandsoppholdet er sannsynliggjort.",
        paragraphs: (params) => [
          { text: "Du trenger ikke gjøre noe annet. Husk å lagre." },
        ],
      },
      fetchDocs: {
        inputText: "Innhent opplysninger",
        title: "Utenlandsoppholdet er ikke dokumentert. Gjør følgende:",
        paragraphs: (params) => [
          {
            style: "boldSolution",
            text: `Opprett fremleggsoppgave i Mappe 2 med frist 1 mnd.`,
          },
          {
            style: "boldSolution",
            text: `Send brev til bruker med følgende tekst:`,
          },
          {
            text: `Du har opplyst om utenlandsopphold i perioden ${params.formatDeparture} til ${params.formatArrival}. 
          Dette blir ${params.grossDuration} dager når vi trekker fra ut og innreisedato`,
          },
          {
            text: `Vi ber om at du leverer dokumentasjon innen 14 dager. Hvis vi ikke mottar 
          dokumentasjon innen fristen vi stønaden opphøre etter §18.`,
          },
        ],
      },
    },
  },
  plannedShortStay: {
    longName: "Planlagt reise",
    description: "Bruker har oppgitt planlagt reise under 90 dager.",
    hasSolutions: true,
    possibleSolutions: [{ solution: "" }],
  },
  plannedLongStay: {
    longName: "Planlagt reise",
    description: "Bruker har oppgitt planlagt reise over 90 dager.",
    hasSolutions: true,
    possibleSolutions: [{}],
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
