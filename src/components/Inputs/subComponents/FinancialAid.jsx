// COMPONENT checks for financial aid
// *PLACEHOLDER*

import { monthlyDiff } from "../../../utilities/dateUtils";
import { checkFinancialAid } from "../../../utilities/issuesUtils";

export default function FinancialAid({ content, onChangeContent }) {
  // Render only IF backdating the award
  if (monthlyDiff(content.effectiveDate) > 1) {
    return (
      <div>
        <h4>Sosialstønad</h4>
        <label>
          Ja
          <input
            type="radio"
            name="financialAidRadio"
            value={"yes"}
            onChange={(e) =>
              onChangeContent(
                { financialAid: e.target.value },
                "checkFinancialAid"
              )
            }
          />
        </label>
        <label>
          Nei
          <input
            type="radio"
            name="financialAidRadio"
            value={"no"}
            onChange={(e) =>
              onChangeContent(
                { financialAid: e.target.value },
                "checkFinancialAid"
              )
            }
          />
        </label>
        <label>
          Innhenter
          <input
            type="radio"
            name="financialAidRadio"
            value={"fetching"}
            onChange={(e) =>
              onChangeContent(
                { financialAid: e.target.value },
                "checkFinancialAid"
              )
            }
          />
        </label>
        {content.financialAid === "yes" && (
          <label>
            Sum:
            <input
              type="number"
              onChange={(e) =>
                onChangeContent(
                  { financialAidAmount: e.target.value },
                  "checkFinancialAid"
                )
              }
            />
          </label>
        )}
      </div>
    );
  }
}
