//
// Imports
import { RATES } from "../constants.js";
//
// Income formatting
//--------------------------------------------------------------------
// FUNCTION returns a basic income object, with id = incomeArray.length
export function addBlankIncome(incomeArray = []) {
  const id = incomeArray.length;
  return { id, type: "Ytelser fra folketrygden", source: "", amount: 0 };
}
// Income calculations
// -------------------------------------------------------------------
// FUNCTION takes an imcome in the format d/m/y + num, ex: "d1000" and returns annual income as a number
// Important: Function assumes *correct* user input in above format.
export function yearlyIncome(income) {
  if (!income) {
    return 0;
  }

  // Seperate out interval character (if any)
  const interval = income.charAt(0);
  // default to amount x 12 calc if no interval specified by user
  if (!isNaN(interval)) {
    return income * 12;
  }
  // separate income amount from interval character
  const amount = income.substring(1);

  // Return income multiplied by interval
  switch (interval) {
    case "d":
      return amount * 260;
    case "m":
      return amount * 12;
    case "y":
      return amount * 1;
    default:
      return `error: "${income}" is an invalid value`;
  }
}
// ------------------------------------------------------------------------
// FUNCTION sums incomes of same type (or all incomes) Expects an array of income objects as input (i.e. content.incomes) and a type of income sum to return
// Rounds sum to nearest integer
export function incomeSum(incomes, type) {
  // Handle incomes being 'undefined' in event that function runs before an income has been registerd (i.e. when calculating financialAid where there is no other income)
  if (!incomes) {
    return 0;
  }

  let sum = 0;
  // IF type is "Sum" -> returns yearly sum of all incomes combined, regardless of type
  if (type === "Sum") {
    for (let i = 0; i < incomes.length; i++) {
      // convert income interval amount to yearly amount
      let yearlySum = yearlyIncome(incomes[i].amount);
      sum = sum + yearlySum;
    }
    // return sum rounded to nearest integer
    return Math.round(sum);

    // ELSE return yearly sum of the specified income
  } else {
    for (let i = 0; i < incomes.length; i++) {
      if (incomes[i].type === type) {
        // convert income interval amount to yearly amount
        let yearlySum = yearlyIncome(incomes[i].amount);
        sum = sum + yearlySum;
      }
    }
    return Math.round(sum);
  }
}
// ---------------------------------------------------------------------------
// FUNCTION formats numbers to be displayed in letter (namely adding spacing/padding). Expects an array of income objects as input (i.e. content.incomes) and a type
// Spaces depend on size of number, ex: 100, 1 000, 1 000 000
// Padding depends on size of number (after spacing) + size of income type name ("Arbeidsinntekt" needs more padding than "Ytelser fra folketrygden")
export function padIncome(incomes, type) {
  // Get sum of incomes
  const sum = incomeSum(incomes, type);

  // Format to required currency format (returns a string)
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
  let formatter = new Intl.NumberFormat("no-NO", {
    style: "decimal",
    currency: "NOK",
  });
  const formattedYearly = formatter.format(sum) + " kroner";

  // Add spacing determined by width of letter (set at 50 for testing)
  let longType = type;
  while (longType.length + formattedYearly.length < 50) {
    longType = longType + " ";
  }

  return longType + formattedYearly;
}

// FUNCTION returns the benefit year of the awarding period
export function benefitYear(effectiveDate) {
  // Determines what year's benefit rates to use. These values have to be updated in constants.js each May
  const currentYear = new Date().getFullYear();
  let awardStartYear;
  // check if the effective date is before or after 30/04/xx, where xx is the current, last, or year before last
  if (effectiveDate > new Date(currentYear, 3, 30)) {
    awardStartYear = "thisYear";
  } else if (effectiveDate > new Date(currentYear - 1, 3, 30)) {
    awardStartYear = "lastYear";
  } else if (effectiveDate > new Date(currentYear - 2, 3, 30)) {
    awardStartYear = "yearBeforeLast";
  }
  return awardStartYear;
}

// FUNCTION returns yearly gross award (before deducting incomes)
export function grossAward(rate, effectiveDate) {
  const awardStartYear = benefitYear(effectiveDate);
  // RATES = {lastYear: { EV: 210420, EN: 227472 ...
  const grossRate = RATES[awardStartYear][rate];
  return grossRate;
}

// ----------------------------------------------------------------------------------
// FUNCTION  returns object with yearly and monthly net award amount ()
// NOTE: due to wokrings of Infotrygd montly rate will be rounded UP to nearest integer
// PROBLEM: Unsure of workings of Infotrygd - what is actually logged as the yearly award??
export function netAward(incomes, rate, effectiveDate) {
  const grossRate = grossAward(rate, effectiveDate);
  const sumOfIncomes = incomeSum(incomes, "Sum");

  const yearlyNet = grossRate - sumOfIncomes;

  let adjustedYearly = grossRate - sumOfIncomes;
  while (adjustedYearly % 12 !== 0) {
    adjustedYearly++;
  }
  let monthlyNet = adjustedYearly / 12;

  return { yearly: yearlyNet, monthly: monthlyNet };
}
// ----------------------------------------------------------------------------------
// FUNCTION returns average monthly financialAid from effectiveDate to (and including) current month
export function monthlyAid(financialAidAmount, effectiveDate) {
  const effMonth = effectiveDate.getMonth();
  const thisMonth = new Date().getMonth();
  let difference = 0;
  if (thisMonth > effMonth) {
    // awarding month is in the previous year
    difference = 12 - effMonth + thisMonth + 1;
  } else {
    difference = thisMonth - effMonth + 1;
  }
  return financialAidAmount / difference;
}

// testing

// NOTES for 210724:
// ALL instances of amounts in letters need to have spacing and the text "kroner", like 1 000 000 kroner
// => Seperate out spacing logic from padding logic!
// Example: function awardAmount is missing spacing and currency
