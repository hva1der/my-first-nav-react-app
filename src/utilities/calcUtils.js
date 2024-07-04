//
//
// Income calculations
// -------------------------------------------------------------------
// FUNCTION takes an imcome in the format d/m/y + num, ex: d1000 and returns annual income as a number
// Needs improving, fault testing, and better error handling but working ok
export function yearlyIncome(income) {
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

// testing
console.log(yearlyIncome("e10"));
