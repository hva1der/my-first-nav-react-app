//
// IMPORTS
// ------------------------------------------------------------------
import { netAward, benefitYear } from "./incomeUtils";
import { RATES } from "../constants";
// ------------------------------------------------------------------
// FUNCTIONS TO TEST FOR ISSUES (used in issuechecker function below)
// *** All functions MUST only take 'content' as a parameter ***
// All testing functions return ONE issue object in format: { issueType: "parent input field", issue: "name of issue", terminal: boolean, resolution: "solution text"/defualt -false- }
// If there is NO issue, the function still returns an issue object, but with {issue: false}
// ------------------------------------------------------------------
// Function tests if combined incomes exceed award rate
export function checkIncomes(content) {
  const { rate, effectiveDate } = content;
  const incomes = content.incomes || [];
  const yearlyNet = netAward(incomes, rate, effectiveDate).yearly;
  const awardingYear = benefitYear(effectiveDate);
  const issueType = "income";

  if (yearlyNet <= 0) {
    return {
      issueType,
      issue: "Excess income",
      terminal: true,
      resolved: false,
    };
    // No payment if award is -less- than 2 % of high rate of benefit of the awarding year
    // *** Possible issue *** Confirm rounding works correctly
  } else if (yearlyNet < Math.ceil(RATES[awardingYear]["EN"] * 0.02)) {
    return { issueType, issue: "Low award", terminal: true, resolution: false };
  } else {
    return { issueType, issue: false, terminal: false, resolution: false };
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

// *** new NEW attempt *** using state again
// useEffect in Inputs will OVERWRITE content.issues after this function has run (IF there are any changes)

export function newCheckForInputIssues(content) {
  let oldIssues = content.issues ? [...content.issues] : [];
  let newIssues = [];
  // Loop through testing functions
  for (let i = 0; i < tests.length; i++) {
    const testFunction = tests[i];
    const newIssue = testFunction(content);
    // If an issue is detected check if it is already registered in content.issues
    if (newIssue.issue) {
      // .some checks if a callback function on any element of an array returns true
      const isIssuePresent = oldIssues.some(
        (oldIssue) => oldIssue.issue === newIssue.issue
      );
      // add any new issues
      if (!isIssuePresent) {
        newIssues.push(newIssue);
      }

      /* If an issue has been entered with a resolution, and the issue still exists - it needs to be added
      to newIssues, WITH it's current resolution text. */
      if (isIssuePresent) {
        if (issue.resolution) {
          let resolvedIssue = { issueType: oldIssues.issueType };
        }
      }

      // in case a solution has been registered for an issue, but a value is entered that removes the issue:
      if (isIssuePresent) {
        if (oldIssues.resolution) {
        }
      }
    }
  }
  // Finally, return newIssues, which should contain: a) any new issues b) any old issues
  // c) any old issues that have now been resolved, BUT already had a resolution text.

  return oldIssues;
}

// New attempt using an Issues object, rather than array. AND checking individually at each Input
export function NEWcheckIncomes(content) {
  const { rate, effectiveDate } = content;
  const incomes = content.incomes || [];
  const yearlyNet = netAward(incomes, rate, effectiveDate).yearly;
  const awardingYear = benefitYear(effectiveDate);

  if (yearlyNet <= 0) {
    return {
      excessIncome: { active: true, terminal: true, resolution: false },
    };
    // No payment if award is -less- than 2 % of high rate of benefit of the awarding year
    // *** Possible issue *** Confirm rounding works correctly
  } else if (yearlyNet < Math.ceil(RATES[awardingYear]["EN"] * 0.02)) {
    return { lowAward: { active: true, terminal: true, resolution: false } };
  } else {
    // else return names of potential issues (used by checker function to check for saved solutions)
    return { noIssues: ["excessIncome", "lowAward"] };
  }
}
// For this option, use an object of tests instead - NB to access 'testFunction' must be a string!
// Returns either -falsy- or an issue object
const testsObj = { checkIncomes };
export function checkIssues(content, testFunction = "allTests") {
  let issueUpdate = {};
  const oldIssues = { ...content.issues } || {};
  const test = testsObj[testFunction];
  // result should be an object in this format: {issueName: {active: boolean, terminal: boolean, resolution: false or string}}
  const result = test(content);
  // Object.keys returns an array of keys. result will always only have a single object, so [0] will be the issueName as a string (or undefined if the tesfunction hasn't detected any issues and returned an empty object {})
  const issue = Object.keys(result)[0];

  // if there is no issue now, check if the issue has been registered in the past - if active set active:false
  // (In order to preserve user inputted solutions)
  if (issue === "noIssues") {
    const inactiveIssues = issue.noIssues; // (if there are no current issues the test functions return an [array] of the issues they test for)
    for (let i = 0; i < inactiveIssues.length; i++) {
      if (oldIssues.inactiveIssues[i]) {
        // update only if the issue is not already set to active:false (Don't need to check if the issue is resolved, just set to inactive - resolved state icon will still render (if desireable))
        if (oldIssues.inactiveIssues[i].active) {
          oldIssues.inactiveIssues[i].active = false;
          // return update to be processed by onChangeContent
          return oldIssues.inactiveIssues[i];
        }
      }
    }
  }

  // NEXT, if there is an issue, check to see if it needs updating
  if (issue && issue !== "noIssues") {
    // return the issue if it isn't already registered
    if (!oldIssues.issue) {
      return result;
      // if the issue is registered but inactive, set active:true
    } else if (!oldIssues.issue.active) {
      oldIssues.issue.active = true;
      return oldIssues.issue;
      // otherwise return falsy => triggering no state update
    } else return;
  }
}

// NEXT task 300824: define the onChangeIssues function in Inputs and TEST!
// NB: need to change to access issue with oldIssues[issue], rather than '.' ?

// THIS IS GOOD! I'M LEARNING ABOUT OBJECTS etc.! I'm not just struggling pontlessly!!
