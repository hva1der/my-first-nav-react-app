// COMPONENT summarises users savgins

import { checkSavings } from "../../../utilities/issuesUtils";

// QUICK FIX: Start this off as a single input field for total savings, but in future add:
//      - Inputs for different types of savings (cars, property etc)
//      - Alternative/competing sources of info, ex: user statement vs Skattemelding

export default function Savings({ content, onChangeContent }) {
  return (
    <div>
      <h4>Formue</h4>
      <label>
        Brukers totale formue
        <input
          placeholder={content.claimantSavings}
          onChange={(e) =>
            onChangeContent({ savings: e.target.value }, "checkSavings")
          }
        />
      </label>
      {/* NB: This should render conditionally only if user is EU or EO (Preview: not implemented functionality for partner's savings)  */}
      <label>
        Ektefelles totale formue
        <input
          placeholder={content.partnerSavings}
          onChange={(e) =>
            onChangeContent({ partnerSavings: e.target.value }, "checkSavings")
          }
        />
      </label>
    </div>
  );
}
