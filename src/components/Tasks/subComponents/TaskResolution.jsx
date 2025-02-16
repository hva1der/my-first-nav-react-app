// COMPONENT renders issue descriptions and solutions

import styles from "../Tasks.module.css";
import { useEffect, useState } from "react";
import issuesTexts from "../../../texts/issuestexts";
import { solutionParams } from "../../../utilities/textUtils";

export default function TaskResolution({ content, selectedIssue }) {
  const { hasSolutions, possibleSolutions, solutionTexts } =
    issuesTexts[selectedIssue] || issuesTexts.dummyIssue; // * hasSolutions is set to "false" in the dummy issue
  const [selectedSolution, setSelectedSolution] = useState("choose");

  //* SolutionParams returns data used to dynamically render solution parameters for the selected issue.
  const params = hasSolutions && solutionParams(content, selectedIssue);

  // effect to reset solution selector when a new issue is selected
  // ? unneccessary use of effect? move to ex: pass a prop from parent instead?
  useEffect(() => {
    if (hasSolutions) {
      setSelectedSolution("choose");
    }
  }, [selectedIssue]);

  return (
    <div>
      {/* Title/short description of issue */}
      <p>
        <b>{issuesTexts[selectedIssue].description}</b>
      </p>
      {/* TERMINAL issues - no solutions. Renders explanation, § etc. */}
      {!hasSolutions && (
        <div>
          {issuesTexts[selectedIssue]?.info?.map((paragraph, index) => (
            <p key={index} className={styles[paragraph?.style]}>
              {paragraph.text}
            </p>
          ))}
        </div>
      )}

      {/* NON-TERMINAL issues - renders with possible solutions selector etc.  */}
      {/* Select field for possible solutions */}
      {hasSolutions && (
        <select
          name="selectedSolution"
          value={selectedSolution}
          onChange={(e) => {
            setSelectedSolution(e.target.value);
          }}
        >
          <option value="choose" disabled>
            --Velg--
          </option>
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
            ?.paragraphs?.(params)
            ?.map((para, index) => (
              // Apply a style if the "style" prop exists; otherwise, no styling is applied.
              <p key={index} className={styles[para?.style]}>
                {para.text}
              </p>
            ))}
        </div>
      )}
    </div>
  );
}
