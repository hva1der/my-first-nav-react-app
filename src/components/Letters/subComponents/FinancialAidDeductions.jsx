// COMPONENT renders text where financial aid deductions cause reduced payment or postponed award periods

import {
  addMonths,
  formatDates,
  monthlyDiff,
} from "../../../utilities/dateUtils";

export default function FinancialAidDeductions({ content }) {
  // formatter for numbers to format x xxx
  let formatter = new Intl.NumberFormat("no-NO", {
    style: "decimal",
    currency: "NOK",
  });
  const { issues, effectiveDate, financialAidAmount } = content;
  const formattedEffDate = formatDates(effectiveDate);
  const today = new Date();
  const thisMonthEnd = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0 // zero makes it last day of previous month
  );
  const nextMonth = addMonths(today, 1);
  const formattedThisMonthEnd = formatDates(thisMonthEnd);
  const formattedNextMonth = formatDates(nextMonth);
  const formattedFAidamount = formatter.format(financialAidAmount);
  const formattedAvgAid = formatter.format(
    financialAidAmount / monthlyDiff(effectiveDate)
  );

  if (issues?.excessFinancialAid?.active) {
    // Award period postponed due to excess financialAid (+ incomes)
    return (
      <div>
        UTSATT PERIODE GRUNNET HØY SOSIALSTØNAD
        <br /> I lov om supplerende stønad til personer med kort botid i Norge
        §11 fjerde ledd, kan Nav etterbetale stønad for inntil 3 måneder forut
        for måneden søknaden ble fremsatt, hvis vilkårene er oppfylt. <br />
        <br />
        Du er i perioden {formattedEffDate} til {formattedThisMonthEnd}{" "}
        innvilget kr {formattedFAidamount} i sosialstønad fra Nav, som i
        gjennomsnitt er kr {formattedAvgAid} per måned. Dette er høyere enn
        stønadssatsen på supplerende stønad, og supplerende stønad kommer derfor
        ikke til utbetaling i denne perioden. Du er derfor innvilget supplerende
        stønad fra {formattedNextMonth}. Fradraget for sosialstønad er gjort
        etter lov om supplerende stønad til personer med kort botid i Norge §11
        femte ledd.
      </div>
    );
  } else if (financialAidAmount > 0) {
    return (
      <div>
        REDUSERT UTBETALING GRUNNET SOSIALSTØNAD
        <br /> I lov om supplerende stønad til personer med kort botid i Norge
        §11 fjerde ledd, kan Nav etterbetale stønad for inntil 3 måneder forut
        for måneden søknaden ble fremsatt, hvis vilkårene er oppfylt. <br />
        <br />
        Når du får etterbetalt supplerende stønad skal vi gjøre fradrag for
        sosialstønad som du har fått utbetalt i samme periode. Dette følger av
        lov om supplerende stønad §11 femte ledd. <br />
        <br />
        Du har fått utbetalt sosialstønad fra Nav. Du fikk kr{" "}
        {formattedFAidamount} i perioden {formattedEffDate} til{" "}
        {formattedThisMonthEnd}. Etter etablert praksis skal vi gjøre fradrag
        for gjennomsnittlig utbetalt sosialstønad. Vi har derfor gjort fradrag
        for kr {formattedAvgAid} per måned i perioden {formattedEffDate} til{" "}
        {formattedThisMonthEnd}.
      </div>
    );
  }
}
