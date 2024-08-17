//
// IMPORTS
// ------------------------------------------------------------------
import { netAward, benefitYear } from "./incomeUtils";
import { RATES } from "../constants";
// ------------------------------------------------------------------
// FUNCTIONS TO TEST FOR ISSUES (used in issuechecker function below)
// *** All functions MUST only take 'content' as a parameter ***
// ------------------------------------------------------------------
// Function tests if combined incomes exceed award rate
export function checkIncomes(content) {
  // ****************** PROBLEM: I haven't renamed to effectiveDate yet! in content *******************
  const { rate, effectiveDate } = content;
  const incomes = content.incomes || [];
  const yearlyNet = netAward(incomes, rate, effectiveDate).yearly;
  const awardingYear = benefitYear(effectiveDate);

  if (yearlyNet <= 0) {
    return { issue: "Excess income", terminal: true, resolved: false };
    // No payment if award is -less- than 2 % of high rate of benefit of the awarding year
    // *** PROBLEM *** This needs to be rounded to an integer, not 2% exactly
  } else if (yearlyNet < RATES[awardingYear]["EN"] * 0.02) {
    return { issue: "Low award", terminal: true, resolved: false };
  } else {
    return { issue: false, terminal: false, resolved: false };
  }
}
//
// *** Further functions here to check for all conceivable issues ***
//

// ------ Array of testing functions ---------------------
const tests = [checkIncomes];
// -------------------------------------------------------
//
// ***NEW*** FUNCTION to test for issues
// New versio avoids using state (as much as possible?) so it can run at start of Inputs to determine rendering etc.

export function checkForInputIssues(content, issues = []) {
  // loop through testing functions
  for (let i = 0; i < tests.length; i++) {
    const testFunction = tests[i];
    const newIssue = testFunction(content);
    // (testing functions return 'undefined' if there are no issues found)
    if (newIssue) {
      issues.push(newIssue);
    }
  }
  console.log("testing issues: " + issues[0].issue);
  return issues;
}

// ***OLD***FUNCTION works in steps and:
// 1. sets all existing issues in 'issues' to "active: false" (in case issues have been resolved, but should not be deleted because the user has entered a "resolution:" text)
// 2. checks for issues in inputs. Re-activates any old issues that are still present, and adds any new issues to the issues array
// parameters: content, renderIssues
// returns updated renderIssues array
// Tests is an array of testing functions (above)

/* const tests = [checkIncomes];
// for testing - renderIssues will be specified in Component and used to determine rendering of issues/markers
const renderIssues = [];
export function checkForInputIssues(content, renderIssues) {
  //
  // *** Missing: set all existing issues to 'active: false' ***
  //
  const oldIssues = content.issues;
  // loop through and run all testing functions
  for (let i = 0; i < tests.length; i++) {
    const testingFunction = tests[i];
    const newIssue = testingFunction(content);
    // (testing functions return 'undefined' if there is no issue detected)
    if (newIssue) {
      // check if issue is already present
      if (oldIssues.issue === issue) {
      }
    }
  }
  // Update (a NON-state) array variable here that is used for rendering issue markers/colouring etc.
  // This variable will reset to a blank array on every render(?)
} */
