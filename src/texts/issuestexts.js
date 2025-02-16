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
  // Attendance issues
  validNonAttendance: {
    longName: `Gyldig fravær`,
    description: `Bruker har ikke møtt. Det foreligger både gyldig fullmakt og legeerklæring.`,
    hasSolutions: true,
    possibleSolutions: ["copyForRep"],
    solutionTexts: {
      copyForRep: {
        inputText: "Send kopi til fullmektig",
        title: "Slik lager du oversendelsesbrev til fullmektig:",
        paragraphs: (params) => [
          {
            text: `Opprett fritekstbrev uten purring, med teksten: `,
          },
          {
            text: `Fordi du er registrert som fullmektig for ---NAVN PÅ BRUKER---, 
            mottar du kopi av vedtak om supplerende stønad.`,
          },
          {
            text: `(Husk å endre adresse til fullmektig.)`,
          },
        ],
      },
    },
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

  // TODO add styling "italicsLegal" to paras with legal quotes etc (simple italics)
  // Ongoing residency issues
  noResidency: {
    // Claimant has no right to reside in Norway. Benefit refused permanently, unless this is awarded
    longName: `Ikke oppholdstillatelse`,
    description: `Bruker har ikke oppholdstillatelse i Norge. Stønad skal avslås etter §3, første ledd.`,
    hasSolutions: false,
    info: [
      {
        style: `italicsLegal`,
        text: `Supplerande stønad vert gitt til personar som er busette i Noreg og som anten har fylt 67 år eller er uføre flyktningar. Ein person vert rekna som busett dersom han eller ho er registrert i folkeregisteret og har norsk statsborgarskap, eller med heimel i utlendingslova har fått permanent opphaldsløyve eller mellombels opphaldsløyve som gir grunnlag for permanent opphaldsløyve`,
      },
      {
        text: `Bruker kan tidligst få SU fra måned etter oppholdstillatelse evt. blir innvilget.`,
      },
    ],
    refusalGrounds: `Vedtaket er fattet etter §3 i lov om supplerende stønad for personar med kort butid i Noreg.`,
  },
  expiredResidency: {
    // Expirer R2R. Benefit refused until renewed.
    longName: `Utløpt oppholdstillatelse`,
    description: `Bruker har ikke gyldig oppholdstillatelse i Norge. Stønad skal avslås etter §3, første ledd.`,
    hasSolutions: false,
    info: [
      {
        style: `italicsLegal`,
        text: `Supplerande stønad vert gitt til personar som er busette i Noreg og som anten har fylt 67 år eller er uføre flyktningar. Ein person vert rekna som busett dersom han eller ho er registrert i folkeregisteret og har norsk statsborgarskap, eller med heimel i utlendingslova har fått permanent opphaldsløyve eller mellombels opphaldsløyve som gir grunnlag for permanent opphaldsløyve`,
      },
      {
        text: `Bruker kan tidligst få SU fra måned etter oppholdstillatelse evt. blir fornyet, eller innvilget på nytt grunnlag.`,
      },
    ],
    refusalGrounds: `Vedtaket er fattet etter §3 i lov om supplerende stønad for personar med kort butid i Noreg.`,
  },
  lapsingResidency: {
    // * Non terminal issue*. Should trigger task creation w/ reminder to check residency rights have been renewed by next control meeting
  },
  // EEA, but not permanent => terminal
  // Expired
  // -------------------------
  // PASSPORT issues
  noPassport: {
    // User has indicated claimant has failed to produce a passport (required)
    longName: "Ikke fremvist pass",
    description: "Bruker har ikke fremvist pass. Søknad er ugyldig. ",
    hasSolutions: true,
    possibleSolutions: [
      "questionAttendance",
      "fetchPassport",
      "dontFetchPassport",
    ],
    solutionTexts: {
      // Solution: assume failure to produce passport is because the application was sent by post. Require personal attendance.
      questionAttendance: {
        inputText: `Krav om personlig oppmøte`,
        title: `Krav sendt i posten er ugyldig. Krev personling oppmøte.`,
        paragraphs: (params) => [
          {
            style: `boldSolution`,
            text: `Opprett fritekstbrev uten purring, med teksten:`,
          },
          {
            text: `Vi har *params.applicationDate* mottat en søknad om supplerende stønad. Det ser ut som at søknaden 
            er sendt i posten.`,
          },
          {
            text: `Det er krav om personlig oppmøte på det lokale Nav kontoret ved søknad om supplerende stønad. Dette 
            må bekreftes med fremvisning av originale pass som skal kontrolleres, kopieres, og sendes med søknaden. Pass 
            skal forevises hver gang du er på lokalkontoret til kontrollsamtale og ved krav om ny stønadsperiode. Pass 
            skal bekrefte at det er deg personlig som møter, og pass skal sjekkes for eventuelle stempel fra 
            utenlandsopphold.`,
          },
          {
            text: `Vi ber om at du møter på ditt lokale Nav-kontor så fort som mulig, og senest innen 14 dager. Du må forevise 
            alle gyldige pass for kontroll og kopiering.`,
          },
          {
            text: `Vi gjør oppmerksom på at dersom du ikke møter innen fristen kan søknaden bli avslått, jf. §18 i lov om 
            supplerende stønad for personer med kort botid i Norge.`,
          },
        ],
      },
      // Fetch valid passport
      fetchPassport: {
        inputText: `Innhent pass fra bruker`,
        title: `Søknad fremsatt uten gyldig pass anses som ugyldig. Bruker må møte med pass.`,
        paragraphs: (params) => [
          {
            style: `boldSolution`,
            text: `Opprett fritekstbrev uten purring, med teksten:`,
          },
          {
            text: `Vi viser til søknad om supplerende stønad mottatt *params.applicationDate*. Det var ikke fremvist pass.`,
          },
          {
            text: `I tillegg til kravet om personlig oppmøte ved Nav når man søker om supplerende stønad, stilles det 
            krav om at man fremviser originale pass som skal kontrolleres. Passet skal bekrefte at det er deg personlig 
            som møter, og pass skal sjekkes for eventuelle stempel fra utenlandsopphold.`,
          },
          {
            text: `Vi ber deg derfor om å levere kopi av gyldig pass, eller eventuelt bekreftelse fra passkontoret på 
            at nytt pass ikke er utstedt, så fort som mulig og senest innen 14 dager.`,
          },
          {
            text: `Vi gjør oppmerksom på at dersom vi ikke mottar dokumentasjonen innen fristen kan søknaden bli avslått, 
            jf. §18 i lov om supplerende stønad for personer med kort botid i Norge. Det er derfor viktig at du gir beskjed 
            til Nav dersom du trenger mer tid for å innhente dokumentasjon.`,
          },
        ],
      },
      // Don't fetch passport. Refuse application immediately. Prompt user to give grounds for this option.
      dontFetchPassport: {
        inputText: `Ikke innhent pass`,
        title: `Det innhentes ikke pass fra bruker. Du bør oppgi årsak. Søknad avslås.`,
      },
    },
  },
  passportExpiredApp: {
    // claimant passport expired before application date
    longName: "Utløpt pass",
    description: "Brukers pass er utløpt.",
    hasSolutions: true,
    possibleSolutions: ["fetchPassport", "dontFetchPassport"],
    solutionTexts: {
      fetchPassport: {
        inputText: `Innhent gyldig pass fra bruker`,
        title: `Utløpt pass kan ikke kontrolleres for utenlandsopphold. Bruker må fremvise nytt pass, eller 
        bekreftelse på at nytt pass ikke er utstedt.`,
        paragraphs: (params) => [
          {
            style: `boldSolution`,
            text: `Opprett fritekstbrev uten purring, med teksten:`,
          },
          {
            text: `Vi viser til søknad om supplerende stønad mottatt *params.applicationDate*. Passet du leverte 
            var gyldig til *params.passportExpiry* og er dermed utgått.`,
          },
          {
            text: `I tillegg til kravet om personlig oppmøte ved Nav når man søker om supplerende stønad, stilles det 
            krav om at man fremviser originale pass som skal kontrolleres. Passet skal bekrefte at det er deg personlig 
            som møter, og pass skal sjekkes for eventuelle stempel fra utenlandsopphold.`,
          },
          {
            text: `Vi ber deg derfor om å levere kopi av gyldig pass, eller eventuelt bekreftelse fra passkontoret på 
            at nytt pass ikke er utstedt, så fort som mulig og senest innen 14 dager.`,
          },
          {
            text: `Vi gjør oppmerksom på at dersom vi ikke mottar dokumentasjonen innen fristen kan søknaden bli avslått, 
            jf. §18 i lov om supplerende stønad for personer med kort botid i Norge. Det er derfor viktig at du gir beskjed 
            til Nav dersom du trenger mer tid for å innhente dokumentasjon.`,
          },
        ],
      },
      dontFetchPassport: {
        inputText: `Ikke innhent gyldig pass`,
        title: `Det innhentes ikke gyldig pass fra bruker. Du bør oppgi årsak. Søknad avslås.`,
      },
    },
  },
  passportExpiredCtrl: {
    // claimant passport expired before attendance for control
    longName: "Utløpt pass",
    description:
      "Brukers pass er utløpt. Stønad skal opphøres dersom bruker ikke fremviser gyldig pass innen 4 uker.",
    hasSolutions: true,
    possibleSolutions: ["fetchPassport", "dontFetchPassport"],
    solutionTexts: {
      fetchPassport: {
        inputText: `Innhent gyldig pass fra bruker`,
        title: `Bruker må fremvise gyldig pass til kontroll innen 4 uker, ellers skal stønaden opphøres`,
        paragraphs: (params) => [
          {
            style: `boldSolution`,
            text: `Opprett fritekstbrev uten purring "Varsel om opphør", med teksten:`,
          },
          {
            text: `Passet du leverte til kontrollsamtale *params.controlFormDate* var gyldig til *params.passportExpiry* 
            og er dermed utløpt.`,
          },
          {
            text: `I tillegg til krav om personlig oppmøte er der krav om å fremivse gyldig pass... ...`,
          },
          {
            text: `Vi gjør oppmerksom på at dersom vi ikke mottar dokumentasjonen innen fristen vil stønaden opphøre fra 
            *params.terminationDate*, jf. §18 i lov om supplerende stønad for personer med kort botid i Norge. 
            Det er derfor viktig at du gir beskjed til Nav dersom du trenger mer tid for å innhente dokumentasjon.`,
          },
        ],
      },
      dontFetchPassport: {
        inputText: `Ikke innhent gyldig pass`,
        title: `Det innhentes ikke gyldig pass fra bruker. Du bør oppgi årsak. Søknad avslås.`,
      },
    },
  },
  passportExpiresSoon: {
    longName: "Pass utløper snart",
    description:
      "Pass utløper før neste gang bruker skal møte. Vurder å sende påminnelse.",
    hasSolutions: true,
    possibleSolutions: ["sendReminder", "dontSendReminder"],
    solutionTexts: {
      sendReminder: {
        inputText: `Send påminnelse`,
        title: `Send påminnelse til bruker om at de må fornye pass før neste kontrollsamtale/søknad`,
        paragraphs: (params) => [
          {
            style: `boldSolution`,
            text: `Opprett brev til bruker "Passet ditt utløper snart", med følgende tekst:`,
          },
          {
            text: `Tekst som forklarer at passet utløper før neste kontrollsamtale, i MÅNED.`,
          },
          {
            style: `boldSolution`,
            text: `Opprett oppgave i Gosys med frist til *params.nextControlDeadline* om å sjekke at pass er fornyet..`,
          },
        ],
      },
      dontSendReminder: {
        inputText: `Ikke send påminnelse`,
        title: `Sender ikke påminnelse om utløp av pass til bruker`,
      },
    },
  },
  //
  // ---------------------
  // Savings issues
  excessSavings: {
    longName: "Formue over 0,5G",
    description: "Ved formue over 0,5G skal søknaden avslås etter §8.",
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
