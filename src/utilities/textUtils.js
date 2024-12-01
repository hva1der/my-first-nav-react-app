// Utilities for rendering text

import { travelDetails } from "./dateUtils";
import { issueTypes } from "./issuesUtils";

// Function determines the issue "type". utilised in solutionParams below
export function findIssueType(issue) {
  return issueTypes[issue];
}
// --------------
// Function finds the required params to dynamically render text for Task/issue solutions
export function solutionParams(content, issue = "dummyIssue") {
  // input issue as a string
  const issueType = findIssueType(issue);
  let params = {};

  switch (issueType) {
    case "dummyIssue":
      // no issue is selected/provided, return blank object (no dynamic render in dummy texts)
      params = { dummyParam: "***test dummy param***" };
      break;
    case "travelIssue":
      //* Solution texts for travel issues require departure and arrival dates
      //* formatted as  "dd.mm.yyyy", along with duration in days without dep and arr dates (-2)
      //! Placeholder: currently only implemented to work with the first registered stay - expect errors
      console.log("travel issue selected"); // TESTING
      const stay = content.staysAbroad?.[0] || {
        departure: new Date(),
        arrival: new Date(),
      };
      params = travelDetails(
        stay.departure,
        stay.arrival,
        content.applicationDate
      ); //* stay relation to applicationDate determines how to handle task
      break;
  }

  return params;
}
