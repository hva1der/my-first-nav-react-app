// COMPONENT handles rendering of financialAid notes

import { formatDates, monthlyDiff } from "../../../utilities/dateUtils";
import { financialAidTexts } from "../../../texts/notesTexts";

export default function FinancialAidNotes({ content }) {
  const { effectiveDate, financialAid, financialAidAmount, issues } = content;
  const formattedEffDate = formatDates(effectiveDate);
  const monthsOfBackdating = monthlyDiff(effectiveDate);
  const averageFinancialAid = financialAidAmount / monthsOfBackdating;
  if (monthsOfBackdating <= 1) {
    // No backdating, can't make deductions for financial aid
    return <p>{financialAidTexts.noBackdate}</p>;
  }
  if (financialAid) {
    // FA has been registered
    switch (financialAid) {
      case "no":
        return <p>{financialAidTexts.no}</p>;
      case "fetching":
        return <p>{financialAidTexts.fetching(formattedEffDate)}</p>;
      case "yes":
        return (
          <div>
            <p>
              {financialAidTexts.yes.calculation(
                formattedEffDate,
                financialAidAmount,
                averageFinancialAid
              )}
            </p>
            <p>
              {issues?.excessFinancialAid?.active
                ? financialAidTexts.yes.excessAid
                : financialAidTexts.yes.noExcess}
            </p>
          </div>
        );
    }
  }
}

// income + FA exceeds reduces award below 2% min for payment
