//
// IMPORTS
// ------------------------------------------------------------------
import { netAward, benefitYear, incomeSum } from "./incomeUtils";
import { findControlMonths, monthlyDiff } from "./dateUtils";
import { RATES } from "../constants";
// ------------------------------------------------------------------
// Array of all issues (used for accessing issues in loops)
export const allIssues = [
  // Income issues
  "excessIncome",
  "lowAward",
  // Residency issues
  "noResidency",
  "expiredResidency",
  "lapsingResidency",
  // Institution issues - PLACEHOLDER
  "institutionAdmittance",
  // Savings issues
  "excessSavings",
  // Financial Aid issues
  "excessFinancialAid",
  "fetchingFinancialAid",
];
// ------------------------------------------------------------------
// FUNCTIONS TO TEST FOR ISSUES (used in issuechecker function below)
// -------------
// Function checks for income issues (excess income, or award under 2%)
export function checkIncomes(content) {
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
    // no issues detected: return names of potential issues (used by checker function to check for saved solutions)
    return { noIssues: ["excessIncome", "lowAward"] };
  }
}
// --------------
// Function checks for residency issues (expired or soon to expire residency rights)
export function checkResidency(content) {
  const { applicationDate, effectiveDate } = content;
  const residency = content?.residency;
  const residencyExpiry = content?.residencyExpiry;
  const nextControlMonth = findControlMonths(effectiveDate)[0]; // findControlMonths() returns array of 3 dates (1st of months) claimant has to appear for control after

  if (residency === "none") {
    // claimant has no right to reside
    return {
      noResidency: { active: true, terminal: true, resolution: false },
    };
  }
  if (residency === "temporary") {
    // residency is limited - handle depending on when it expires
    if (residencyExpiry < applicationDate) {
      // residency was expired at time of application => application is invalid
      return {
        expiredResidency: { active: true, terminal: true, resolution: false },
      };
    } else if (residencyExpiry <= nextControlMonth) {
      // residency expires before next control month => user needs to apply for renewed residency prior to control
      return {
        lapsingResidency: { active: true, terminal: false, resolution: false },
      };
    }
  }
  // no issues detected: return names of potential issues (used by checker function to check for saved solutions)
  return {
    noIssues: ["noResidency", "expiredResidency", "lapsingResidency"],
  };
}
// --------------
// Function checks for institution issues
// PLACEHOLDER - full functionality not implemented
export function checkInstitutions(content) {
  const { institution } = content;

  if (institution === "yes") {
    return {
      institutionAdmittance: {
        active: true,
        terminal: true,
        resolution: false,
      },
    };
  }
  return { noIssues: ["institutionAdmittance"] };
}
// --------------
// Function checks for savings issues
import { SAVINGSLIMITS } from "../constants"; // Move import to top if used elsewhere also
export function checkSavings(content) {
  const { effectiveDate } = content;
  const savings = +content.savings;
  const partnerSavings = +content.partnerSavings || 0;
  const combinedSavings = savings + partnerSavings; // need alt for before savings are defined?
  const awardingYear = benefitYear(effectiveDate); // benefitYear returns the benefit year (01.05-30.04.yy) of the awarding period

  if (combinedSavings > SAVINGSLIMITS[awardingYear]) {
    return {
      excessSavings: {
        active: true,
        terminal: true,
        resolution: false,
      },
    };
  }
  return { noIssues: ["excessSavings"] };
}
// --------------
// Function checks for financial aid issues (all(?) non-terminal)
export function checkFinancialAid(content) {
  const { rate, effectiveDate, financialAid, financialAidAmount, incomes } =
    content;
  const yearlyAward = netAward(incomes, rate, effectiveDate).yearly;
  const yearlyAid = (financialAidAmount / monthlyDiff(effectiveDate)) * 12;
  const awardingYear = benefitYear(effectiveDate);
  const awardLowerLimit = Math.ceil(RATES[awardingYear]["EN"] * 0.02);

  if (yearlyAward - yearlyAid <= awardLowerLimit) {
    // can't add financial Aid to incomes deductions in Infotrygd if award would be < 2% of EN rate
    return {
      excessFinancialAid: { active: true, terminal: false, resolved: false },
    };
  }
  if (financialAid === "fetching") {
    // used to create task for case manager to fetch FA info from Nav local offices
    return {
      fetchingFinancialAid: { active: true, terminal: false, resolved: false },
    };
  }
  // No financial Aid issues detected
  return {
    noIssues: ["excessFinancialAid"],
  };
}

// ********* Obejct of tests to be used in checker function *******************
const tests = {
  checkIncomes,
  checkResidency,
  checkInstitutions,
  checkSavings,
  checkFinancialAid,
};
// ****************************************************************************

// FUNCTION tests for issues using checkers defined above. NB to access 'testFunction' must be a string!
// Returns either -falsy-, if there are no relevant changes, or an issue object with an updated/new issue
export function checkForInputIssues(content, testFunction = "allTests") {
  const oldIssues = { ...content.issues } || {};
  const test = tests[testFunction];
  // result should be an object in this format: {issueName: {active: boolean, terminal: boolean, resolution: false or string}}
  const result = test(content);
  // Object.keys returns an array of keys. result will always only have a single object, so [0] will be the issueName as a string (or undefined if the tesfunction hasn't detected any issues and returned an empty object {})
  const issue = Object.keys(result)[0];

  // if there is no issue now, check if the issue has been registered in the past - if active set active:false
  // (In order to preserve user inputted solutions)
  if (issue === "noIssues") {
    const inactiveIssues = result["noIssues"]; // (if there are no current issues the test functions return an [array] of the issues they test for)
    for (let i = 0; i < inactiveIssues.length; i++) {
      const inactiveIssue = inactiveIssues[i];
      // update only if the issue is not already registered
      if (oldIssues[inactiveIssue]) {
        // update only if the issue is not already set to active:false (Don't need to check if the issue is resolved, just set to inactive - resolved state icon will still render (if desireable))
        if (oldIssues[inactiveIssue].active) {
          oldIssues[inactiveIssue].active = false;
          // return update to be processed by onChangeContent
          return { [inactiveIssue]: oldIssues[inactiveIssue] };
        }
      }
    }
  }

  // NEXT, if there is an issue, check to see if it needs updating
  if (issue && issue !== "noIssues") {
    // return the issue if it isn't already registered
    if (!oldIssues[issue]) {
      return result;
      // if the issue exists but is inactive, reactivate it
    } else if (!oldIssues[issue].active) {
      oldIssues[issue].active = true;
      return { [issue]: oldIssues[issue] };
      // otherwise return falsy => triggering no state update
    } else return;
  }
}

// FUNCTION checks for presence of issues to conditionally render Allowance or Refusal letters
export function terminalIssues(content) {
  let activeTerminal = [];
  if (content.issues) {
    // get array of issueNames to loop through issues
    const issueNames = Object.keys(content.issues);
    for (let i = 0; i < issueNames.length; i++) {
      if (
        content.issues[issueNames[i]].terminal &&
        content.issues[issueNames[i]].active
      ) {
        // Push active issues to array
        activeTerminal.push(issueNames[i]);
      }
    }
    if (activeTerminal.length !== 0) {
      // active and terminal issues are present, return names of those issues
      return activeTerminal;
    }
  }
  return false;
}
