// COMPONENT renders travel issue descriptions and solutions

import { useState } from "react";
import issuesTexts from "../../../texts/issuestexts";
import { solutionParams } from "../../../utilities/textUtils";

export default function TaskResolution({ content, selectedIssue }) {
  const { description, hasSolutions, possibleSolutions, solutionTexts } =
    issuesTexts[selectedIssue] || issuesTexts.dummyIssue; // * hasSolutions is set to "false" in the dummy issue
  const [selectedSolution, setSelectedSolution] = useState(
    "No solution selected"
  );

  //* SolutionParams returns data used to dynamically render solutions for the selected issue.
  const params = solutionParams(content, selectedIssue);

  return (
    <div>
      {/* Title/short description of issue */}
      <p>
        <b>{issuesTexts[selectedIssue].description}</b>
      </p>
      {/*  */}
      {/* Select field for possible solutions */}
      {hasSolutions && (
        <select
          value={selectedSolution}
          onChange={(e) => {
            setSelectedSolution(e.target.value);
          }}
        >
          <option disabled>--Velg--</option>
          {/* List possible solutions */}
          {possibleSolutions.map((solution) => (
            <option value={solution} key={solution}>
              {solutionTexts[solution].inputText}
            </option>
          ))}
        </select>
      )}
      {/* Render chosen solution (or placeholder text if none) */}
      {hasSolutions && (
        <div>
          <p>{solutionTexts[selectedSolution]?.title}</p>
          {solutionTexts[selectedSolution]
            ?.paragraphs(params)
            ?.map((para, index) => (
              <p key={index}>{para}</p>
            ))}
        </div>
      )}
    </div>
  );
}

// ! Remember: The paragraphs will have dates, amounts etc. in them => need to be functions/dynamic render
// TODO: Add new prop to "paragraphs": isBold:boolean - for formatting of text
