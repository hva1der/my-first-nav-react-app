// Utilities for rendering text

import { formatDates, travelDetails } from "./dateUtils";
import { issueTypes } from "./issuesUtils"; // Issues are grouped by type to reduce duplication

// Object of param finder functions - returns the desired params (as an object)
// Used in dynamically rendering texts - namely/for now, in the Tasks modal
const paramFinders = {
  // params for "dummy issue" which acts as a placeholder for errors or where params are not required (app would otherwise return errors when tryong to find params)
  dummyIssue: (content) => {
    return { dummyParam: "***test dummy param***" };
  },
  //* -------------------------------------------------

  //* ------------------------------------------------
  // financial aid issues requrie the date from which financial aid info is to be fetched from
  financialAidIssue: (content) => {
    // TODO (soon) - add params for text for "excessFinancialAid(?) "
    const { effectiveDate } = content;
    const formatEffDate = formatDates(effectiveDate); // Financial aid is fetched from start date of award period, if the award is backdated
    // TODO: (FUTURE) implement functionality for where effDate is a different date than start of period - ex: SU FI - Possibly has to be categorized as a different issue(type) entirely, with different params
    return { fetchFinancialAidFrom: formatEffDate };
  },
  //* -----------------------------------------------------
  // travel issue texts require departure and arrival dates, along with the duration of the journey
  travelIssue: (content) => {
    //! Placeholder: currently only implemented to work with the first registered stay - expect errors where there are multiple stays abroad registered
    const stay = content.staysAbroad?.[0] || {
      departure: new Date(),
      arrival: new Date(),
    };
    // travelDetails returns a travel details object: { departure: "formatted date", arrival, grossDuration, netDuration };
    return travelDetails(stay.departure, stay.arrival, content.applicationDate);
  },
};
// **************************************************************************************************
// Function returns the required params to dynamically render text for Task/issue solutions
// takes the relevant issue to find params for as input (along with content)
export function solutionParams(content, issue = "dummyIssue") {
  const issueType = issueTypes[issue]; // Issues are grouped by type to reduce duplication
  const paramFinder = paramFinders[issueType] || paramFinders.dummyIssue; // the paramater finder function for the selected issue type (or dummyIssue which provides dummy values. ex used in function which require no params)
  const params = paramFinder(content); // finder function returns params formatted in their final print form (usually a string)
  return params;
}
