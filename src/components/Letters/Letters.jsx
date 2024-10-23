import styles from "./Letters.module.css";
import { formatLetterDates } from "../../utilities/dateUtils";
import ControlClashText from "./subComponents/ControlClashText";
import IncomesText from "./subComponents/IncomesText";
import { allowedTexts } from "../../texts/Letters/AllowedTexts";

export default function Letters({ content }) {
  // currently set to format dates as dd.mm.yyyy
  const letterDates = formatLetterDates(content);

  return (
    <div className={styles.letterGlobal}>
      {/* Initial text detailing award period */}
      <p>{allowedTexts.appAwardPeriod(letterDates)}</p>
      {/* "Important" default instructions for user. 2 options: first time applicants and recurring periods */}
      <p>
        VIKTIG <br />
        Vi ber deg om å lese veiledningen... Lorem Ipsum is simply dummy text of
        the printing and typesetting industry. Lorem Ipsum has been the
        industry's standard dummy text ever since the 1500s, when an unknown
        printer took a galley
      </p>

      <p>
        Vi vil presisere at du ikke kan oppholde deg i utlandet... Lorem Ipsum
        is simply dummy text of the printing and typesetting industry. Lorem
        Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley
      </p>

      <p>
        Dersom du mottar utenlandsk pensjon... Lorem Ipsum is simply dummy text
        of the printing and typesetting industry. Lorem Ipsum has been the
        industry's standard dummy text ever since the 1500s, when an unknown
        printer took a galley
      </p>

      {/* Instructions to handle control attendance when backdating applications */}
      <ControlClashText
        effectiveDate={content.effectiveDate}
        attendance={content.controlClashAttendance}
      />

      {/* Decision grounds */}
      <p>
        BEGRUNNELSE <br />
        Vedtaket er gjort etter lov om supplerende stønad til personer med kort
        botid i Norge, pragrafene 3, 5, 6 og 7.
      </p>

      {/* Initial residency rights (only for first time applications) */}
      <p>
        VURDERING AV FØRSTE VEDTAK OM OPPHOLD I NORGE <br />
        Ved behandlingen av din søknad har vi lagt til grunn... Lorem Ipsum is
        simply dummy text of the printing and typesetting industry. Lorem Ipsum
        has been the industry's standard dummy text ever since the 1500s, when
        an unknown printer took a galley.
      </p>

      {/* Living situation */}
      <p>
        VURDERING AV BOFORHOLD <br />
        {(content.rate === "EV" &&
          "Vi legger til grunn at du deler bolig med andre voksne...") ||
          "Vi legger til grunn at du ikke er bosatt med andre voksne..."}
      </p>

      {/* Incomes that reduce award */}
      <p>
        Stønaden reduseres du du har arbeidsinntekt... Lorem Ipsum is simply
        dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the industry's standard
      </p>

      {/* Income calculations (if any) */}
      <IncomesText
        incomes={content.incomes}
        rate={content.rate}
        effectiveDate={content.effectiveDate}
      />

      {/* Payment schedule */}
      <p>
        UTBETALING <br />
        Stønaden utbetales den 20. hver måned... Lorem Ipsum is simply dummy
        text of the printing and typesetting industry. Lorem Ipsum has been the
        industry's standard
      </p>

      {/* Tax information */}
      <p>
        VIKTIG <br />
        Du bør kontakte skatteetaten for å få vurdert om du skal ha frikort.
      </p>

      {/* Guidance and complaints */}
      <p>
        VEILEDNING OG KLAGE <br />
        Dersom du har spørsmål... Lorem Ipsum is simply dummy text of the
        printing and typesetting industry. Lorem Ipsum has been the industry's
        standard
        <br /> <br />
        Du kan klage på dette vedtaket... Lorem Ipsum is simply dummy text of
        the printing and typesetting industry
        <br /> <br />
        Vi gjør oppmerksom på at du etter forvaltningsloven...
      </p>

      {/* Obligations */}
      <p>
        DINE PLIKTER <br />
        Det er viktig at du melder fra om endringer... <br />
        - Du endrer boforhold <br />
        - Du planlegger utenlandsopphold <br />
        - osv. <br />
      </p>

      {/* Signature */}
      <p>Med vennlig hilsen -saksbehandler- </p>
    </div>
  );
}
