// Utilities for rendering text

import { travelDetails } from "./dateUtils";
import { allIssues } from "./issuesUtils";

// Function determines the issue "type". utilised in solutionParams below
function issueType(issue) {
  let type;
  const travelIssues = [
    "pastLongStay",
    "pastShortStay",
    "plannedLongStay",
    "plannedShortStay",
    "willMissControl",
  ];
}
// --------------
// Function finds the required params to dynamically render text for Task/issue solutions
export function solutionParams(content, issue) {
  // input issue as a string
  let params;

  switch (issue) {
    case "travelIssues":
      //* Solution texts for travel issues require departure and arrival dates
      //* formatted as  "dd.mm.yyyy", along with duration in days without dep and arr dates (-2)
      //! Placeholder: currently only implemented to work with the first registered stay - expect errors
      const stay = content.staysAbroad?.[0] || {
        departure: new Date(),
        arrival: new Date(),
      };
      params = travelDetails(
        stay.departure,
        stay.arrival,
        content.applicationDate
      ); //* stay relation to applicationDate determines how to handle task
  }

  return params;
}
