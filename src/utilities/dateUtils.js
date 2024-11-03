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
// NB: also exported!
export function formatDates(date) {
  // ensure format of date is JS Date
  const ensureDate = new Date(date);
  // "pad" dates so the appear in format 01.01.2024, rather than 1.1.2024
  const padZero = (date) => date.toString().padStart(2, "0");

  return [
    padZero(ensureDate.getDate()),
    padZero(ensureDate.getMonth() + 1),
    ensureDate.getFullYear(),
  ];
}
// -------------------------
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
// --------------------------
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

  // return arrays for easy conversion to display in other formats, ex: periodEnd.join("") for ddmmyyyy
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
// -----------------------
// FUNCTION combines the above functions to return object with all values formatted for output
// to be used at initial part of award allowed letters to display award period info.
// *DATE FORMAT: set to dd.mm.yyyy
export function formatLetterDates(content) {
  const { applicationDate, effectiveDate } = content;
  const formattedAppDate = formatDates(applicationDate).join(".");
  const formattedStartDate = awardPeriod(effectiveDate).periodStart.join(".");
  const formattedEndDate = awardPeriod(effectiveDate).periodEnd.join(".");
  const { newApplicationMonth, newApplicationYear } =
    canApplyAgain(effectiveDate);

  return {
    formattedAppDate,
    formattedStartDate,
    formattedEndDate,
    newApplicationMonth,
    newApplicationYear,
  };
}
// ------------------------
// FUNCTION to determine control period expiry months
// returns array of 3 dates: 4, 8 and 11 months after startDate
export function findControlMonths(effectiveDate) {
  const controlMonths = [
    addMonths(effectiveDate, 4),
    addMonths(effectiveDate, 8),
    addMonths(effectiveDate, 11),
  ];
  return controlMonths;
}
// -------------------------
// FUNCTION to see if a backdated award causes a control meeting to be called the same date as the award letter is issued
// returns a "clash" object either false or specifying a clash with a control meeting (or in rarer case needing to apply for a new award period altogether - i.e. backdating cases)
export function controlClash(effectiveDate) {
  const today = new Date();
  const controlMonths = findControlMonths(effectiveDate);

  if (today >= controlMonths[2]) {
    return { clash: "applyAgain" };
  } else if (today >= controlMonths[0]) {
    return { clash: "controlClash" };
  } else return { clash: false };
}
// ----------------------------
// FUNCTION finds difference in months between 2 dates (including both start and end months)
// Important: dates need to be in consecutive order. date2 defaults to date Today
export function monthlyDiff(startDate, endDate = new Date()) {
  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth();

  const endYear = endDate.getFullYear();
  const endMonth = endDate.getMonth();

  // Calculate the difference in years and months
  const yearDifference = endYear - startYear;
  const monthDifference = endMonth - startMonth;

  // Total difference in months, including start and end months
  const difference = yearDifference * 12 + monthDifference + 1;
  return difference;
}

// TESTING
console.log(monthlyDiff(new Date(2025, 5, 1)));
