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
// FUNCTION takes an imcome in the format d/m/y + num, ex: d1000 and returns annual income as a number
// Needs improving, fault testing, and better error handling but working ok
export function yearlyIncome(income) {
  if (!income) {
    return 0;
  }

  // default to amount x 12 calc if no interval specified by user
  const firstChar = income.charAt(0);
  if (!isNaN(firstChar)) {
    return income * 12;
  }
  // refactor to Switch statement?
  const interval = income.charAt(0);
  const intervals = ["d", "m", "y"];
  const multiples = [260, 12, 1];

  for (let i = 0; i < 3; i++) {
    if (interval === intervals[i]) {
      return income.split(interval)[1] * multiples[i];
    }
  }
  return `error: "${income}" is an invalid value`;
}

// FUNCTION formats numbers to be displayed in letter (namely adding spacing/padding)
// PROBLEM: Remember that numbers are sometimes changed by Infotrygd to be divisible by 12!
// -> Related: No decimals!
// Spaces depend on size of number, ex: 100, 1 000, 1 000 000
// Padding depends on size of number (after spacing) + size of income type name ("Arbeidsinntekt" needs more padding than "Ytelser fra folketrygden")
export function padIncome(income) {
  // First get the yearly sum (yearlyIncome expects input as a string)
  const yearly = yearlyIncome(income.amount.toString());
  // Format to required currency format (returns a string)
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
  let formatter = new Intl.NumberFormat("no-NO", {
    style: "decimal",
    currency: "NOK",
  });
  const formattedYearly = formatter.format(yearly) + " kroner";

  // Add padding based on .type and yearly lengths
  // ASSUMPTION: working on width of letter at 70 chars
  /* const typeLength = income.type.length;
  const missingChars = 70 - income.type.length - formattedYearly.length;
  const paddedType = income.type.padEnd(typeLength + missingChars, " "); */

  let longType = income.type;
  while (longType.length + formattedYearly.length < 50) {
    longType = longType + " ";
  }
  console.log((longType + formattedYearly).length);
  return longType + formattedYearly;
}

// testing
const testIncome = { type: "Ytelser fra folketrygden", amount: 60000 };
const testIncome2 = { type: "Ytelser fra folketrygden", amount: 600 };
console.log(padIncome(testIncome));

console.log(padIncome(testIncome2));
