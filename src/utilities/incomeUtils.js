//
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
// FUNCTION sums incomes of same type. Expects an array of income objects as input (i.e. content.incomes) and a type of income sum to return
// Rounds sum to nearest integer
export function incomeSum(incomes, type) {
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

// ----------------------------------------------------------------------------------
// FUNCTION  returns rate minus total incomes = amount to be paid.
// *** Crucial *** Must increase amount by X so amount is divisible by 12
// PROBLEM: Need to confirm this is how Infotrygd works (as opposed to f.ex reducing incomes etc.)
export function awardAmount(incomes) {
  let sumOfIncomes = incomeSum(incomes, "Sum");
  return 216228 - sumOfIncomes;
}

// ----------------------------------------------------------------------------------

// testing
const testIncome = [
  { type: "typeB", amount: "d1" },
  { type: "typeA", amount: "m500" },
];

console.log(incomeSum(testIncome, "typeA"));

console.log(incomeSum(testIncome, "Sum"));

console.log(awardAmount(testIncome));

// NOTES for 170724:
// ALL instances of amounts in letters need to have spacing and the text "kroner", like 1 000 000 kroner
// => Seperate out spacing logic from padding logic!
