// NOTES
// -> Consider what date format to have saved from input
//      * Basic string: "yyyy-mm-dd"
//      * Array of above string split by "-": [yyyy, mm, dd] *** Probably best option? ***
//      * Object in format {day: dd, monht: mm, year:yy/yyyy}
//
// VARIABLES
const months = [
  "januar",
  "februar",
  "mars",
  "april",
  "mai",
  "juni",
  "juli",
  "august",
  "september",
  "oktober",
  "november",
  "desember",
];
//-----------------------------------------------------------------------------
// FUNCTIONS
// ----------------------------------------------------------------------------
// # Internal functions #
//--------------------------
// Function to convert JS Dates to display format dd.mm.yyyy - takes a JS Date string and returns an array ["dd", "mm", yyyy]

function formatDates(date) {
  // "pad" dates so the appear in format 01.01.2024, rather than 1.1.2024
  const padZero = (date) => date.toString().padStart(2, "0");

  return [
    padZero(date.getDate()),
    padZero(date.getMonth() + 1),
    date.getFullYear(),
  ];
}

// Function to increase a date by X months. Defaults  to 1st day of month, but can set day to 0 to get last day of previous month
// ref: https://www.w3resource.com/javascript-exercises/javascript-date-exercise-9.php
function addMonths(date, numOfMonths, day = 1) {
  !day && numOfMonths++;
  const currentDate = new Date(date);
  const newDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + numOfMonths,
    day
  );
  return newDate;
}

// ### Exported functions ###
// ---------------------------------------------------------------------------
// FUNCTION to determine 12 month award period
// returns 2 array objects: periodStart: ["dd", "mm", yyyy] and periodEnd: ["dd", "mm", yyyy]
export function awardPeriod(startOfPeriod) {
  // convert HTML date format to JS Date format
  const startDate = new Date(startOfPeriod);
  // Calculate the end date by adding 11 months and setting the date to the last day of that month
  const endDate = addMonths(startDate, 11, 0);

  const periodStart = formatDates(startDate);
  const periodEnd = formatDates(endDate);

  // using arrays so I can easily convert to display in other formats, ex: periodEnd.join("") for ddmmyyyy
  return { periodStart, periodEnd };
}
// -----------------------
// FUNCTION to determine date (month + year) user can apply for new award period
export function canApplyAgain(startOfPeriod) {
  const startDate = new Date(startOfPeriod);

  const newApplicationDate = addMonths(startDate, 11);

  const newApplicationMonth = months[newApplicationDate.getMonth()];
  const newApplicationYear = newApplicationDate.getFullYear();

  return { newApplicationMonth, newApplicationYear };
}

// ------------------------
// FUNCTION to see if a backdated award causes a control meeting to be called the same date as the award letter is issued
// returns a "clash" object either false or specifying the clash as 4, 8, or 11 months into the period
export function controlClash(startOfPeriod) {
  const startDate = new Date(startOfPeriod);
  const today = new Date();
  const controlMonths = [4, 8, 11];

  for (let i = 0; i < 3; i++) {
    if (
      addMonths(startDate, controlMonths[i]).getMonth() === today.getMonth()
    ) {
      return { clash: controlMonths[i] };
    }
  }
  return { clash: false };
}

// TESTING
const testDate = "2023-07-01";
console.log(canApplyAgain(testDate));

console.log(controlClash(testDate));

console.log(awardPeriod(testDate));
