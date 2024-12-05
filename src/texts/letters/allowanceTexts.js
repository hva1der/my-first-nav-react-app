// Texts used in Allowance letter for new period and first time applications
// NB: Some of the old texts are still in 'Letters/subComponents/' (old format)

export const oldAllowanceTexts = {
  // Initial text specifies applicaton date and award period.
  appAwardPeriod: (letterDates) => {
    return `Søknaden din av ${letterDates.formattedAppDate} er innvilget. 
    Du får supplerende stønad i perioden ${letterDates.formattedStartDate} 
    til ${letterDates.formattedEndDate}. Du kan søke ny periode i 
    ${letterDates.newApplicationMonth} ${letterDates.newApplicationYear}.`;
  },
};

// NEW from 021224:

// * Dynamically render by setting the "key" equal to content.formType ("firstApplication", "newPeriod", or "control")
// * Object format in order to specify styling for each title and paragraph. i.e. for each paragraph: {style:, text:}

// Headers used in multiple sections below
import { baseHeaders } from "../baseTexts";
const { importantHeader } = baseHeaders;

// Main text parent export
export const allowanceTexts = {
  // SECTION detailing key info for user at start of letter
  introHighlights: {
    // First time applicants get a longer version with additional info
    firstApplication: [
      { style: "capsHeader", text: "VIKTIG" },
      {
        style: "firstPara",
        text: `Vi ber deg om å lese veiledningen... Lorem Ipsum is simply dummy text of
        the printing and typesetting industry. Lorem Ipsum has been the
        industry's standard dummy text ever since the 1500s, when an unknown
        printer took a galley`,
      },
      {
        text: `Vi vil presisere at du ikke kan oppholde deg i utlandet... Lorem Ipsum
        is simply dummy text of the printing and typesetting industry. Lorem
        Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley`,
      },
      {
        text: `Dersom du mottar utenlandsk pensjon... Lorem Ipsum is simply dummy text
        of the printing and typesetting industry. Lorem Ipsum has been the
        industry's standard dummy text ever since the 1500s, when an unknown
        printer took a galley`,
      },
    ],
    // repeat applicants get shorter version with additional header
    newPeriod: [
      { style: "capsHeader", text: "VIKTIG" },
      {
        style: "firstPara",
        text: `Vi ber deg om å lese veiledningen... Lorem Ipsum is simply dummy text of
        the printing and typesetting industry. Lorem Ipsum has been the
        industry's standard dummy text ever since the 1500s, when an unknown
        printer took a galley`,
      },
      { style: "capsHeader", text: "UTENLANDSK PENSJON" },
      {
        style: "firstPara",
        text: `Vi vil presisere at du ikke kan oppholde deg i utlandet... Lorem Ipsum
        is simply dummy text of the printing and typesetting industry. Lorem
        Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley`,
      },
    ],
    // TODO: Undedetermined text for controls. Use same as for newPeriod?
    control: [],
  },
  // -------------------------
  // SECTION texts detailing what claimant must do in cases of late applications causing potential clashes with control meetings
  // TODO: Convert current component form (ControlClashText.jsx) to new objec form
  // -------------------------
  // SECTION detailing deductions (if any) due to Financial Aid
  // TODO: Convert current component form (FinancialAidDeductions.jsx) to new object form
  // -------------------------
  // SECTION detailing grounds for decision
  //* Header is the same for all alternatives here, so separated the logic
  groundsSectionHeader: { style: `capsHeader`, text: "BEGRUNNELSE" },
  decisionGrounds: {
    firstApplication: [
      {
        style: `firstPara`,
        text: `Vedtaket er gjort etter lov om supplerende stønad til personer med kort
      botid i Norge, pragrafene 3, 5, 6 og 7.`,
      },
    ],
    newPeriod: [
      {
        style: `firstPara`,
        text: `Vedtaket er gjort etter lov om supplerende stønad til personer med kort
      botid i Norge, pragrafene 3, 5, 6 og 7.`,
      },
    ],
    control: [
      {
        style: `firstPara`,
        text: `Vedtaket er gjort etter lov om supplerende stønad til personer med kort
      botid i Norge, pragrafene 18 og 21.`,
      },
    ],
  },
  // -----------------
  // SECTION single paragraph w/o header about income deductions. Differs for EN/EV vs EU/EO rates
  // TODO: Add missing functionality for text for couples (EU/EO)
  // ? and a third option where the partner is a refugee (EUF)?
  deductionsInfo: {
    text: `Stønaden reduseres hvis du har arbeidsinntekt... Lorem Ipsum is simply
        dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the industry's standard`,
  },
  // -----------------
  // SECTION assessment of original right to reside in Norway
  // * Only renders for first time applications
  originalResidency: {
    firstApplication: [
      {
        style: "capsHeader",
        text: `VURDERING AV FØRSTE VEDTAK OM OPPHOLD I NORGE`,
      },
      {
        style: "firstPara",
        text: `Ved behandlingen av din søknad har vi lagt til grunn... Lorem Ipsum is
          simply dummy text of the printing and typesetting industry. Lorem Ipsum
          has been the industry's standard dummy text ever since the 1500s, when
          an unknown printer took a galley.`,
      },
    ],
  },
  // -----------------
  // SECTION assessment of living situation (same assessment as used to determine rate)
  // * header is duplicated to allow for 2 simple different renders where "rate" is EN or EV,
  //* but otherwise (i.e. for couple rates) returns nothing
  livingSituation: {
    EN: [
      {
        style: `capsHeader`,
        text: `VURDERING AV BOFORHOLD`,
      },
      {
        style: `firstPara`,
        text: `Vi legger til grunn at du ikke er bosatt med andre voksne...`,
      },
    ],
    EV: [
      {
        style: `capsHeader`,
        text: `VURDERING AV BOFORHOLD`,
      },
      {
        style: `firstPara`,
        text: `Vi legger til grunn at du deler bolig med andre voksne...`,
      },
    ],
  },
  // -----------------
  // SECTION tax information for first time applications
  taxInfo: {
    firstApplication: [
      { ...importantHeader },
      {
        style: `firstPara`,
        text: `Du bør kontakte skatteetaten for å få vurdert om du skal ha frikort.`,
      },
    ],
  },
};
