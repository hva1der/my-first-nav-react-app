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
// # Internal functions (used in latter functions, but often also exported) #
// -------------------------
// Function "pads" dates, adding zeros, so they appear in format 01.01.2024, rather than 1.1.2024
const padZero = (date) => date.toString().padStart(2, "0");

// ---------------------
// Function converts JS Dates to either format "dd.mm.yyyy" or "ddmmyy" (the former is used primarily in notes, and the latter in letters)
export function formatDates(date, outputFormat = "dd.mm.yyyy") {
  // enable input dates in multiple formats, ex: htmlDate, by converting to jsDate
  const jsDate = new Date(date);

  if (isNaN(jsDate.getTime())) {
    // date entry is invalid, or not yet defined (by user)
    return undefined;
  }

  const day = padZero(jsDate.getDate());
  const month = padZero(jsDate.getMonth() + 1); // + 1 because months are 0-indexed
  const longYear = jsDate.getFullYear();
  const shortYear = longYear.toString().slice(-2); // last 2 digits of year

  if (outputFormat === "dd.mm.yyyy" || outputFormat === "notesDate") {
    return `${day}.${month}.${longYear}`;
  } else if (outputFormat === "ddmmyy" || outputFormat === "letterDate") {
    return `${day}${month}${shortYear}`;
  }
}
// -------------------------
// Function prints dates as formatted by formatDates(), or prints the intended date format (i.e. if the date is invalid or not yet defined)
export function printDate(date, outputFormat) {
  const formattedDate = formatDates(date, outputFormat);
  if (!formattedDate) {
    // missing (valid) date, render placeholder
    return outputFormat;
  } else return formattedDate;
}

// -------------------------
// ? Should this function should be refactored to make clearer (ex: change "day" param using 0 and 1, to use "first" and "lastDay")?
// Function to increase a date by X months. Defaults  to 1st day of month, but can set day to 0 to get last day of previous month
// ref: https://www.w3resource.com/javascript-exercises/javascript-date-exercise-9.php
export function addMonths(date, numOfMonths, day = 1) {
  // if day is falsy (i.e zero) need to add 1 month to the calc, to avoid confusion when desired return is last day of month
  !day && numOfMonths++;
  const currentDate = new Date(date);
  const newDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + numOfMonths,
    day
  );
  // return updated date object X months later
  return newDate;
}
// --------------------------
// ### Exported functions ###
// ---------------------------------------------------------------------------
// FUNCTION Takes 2 Date objects as input and returns difference in days
export function daysBetween(departure, arrival) {
  const difference = departure - arrival;
  const numOfDays = difference / 1000 / 60 / 60 / 24; // convert ms to days
  return Math.abs(numOfDays) + 1; // +1 to include both dates in # of days
}
// ---------------------
// FUNCTION takes 3 travel related dates: departure, arrival and (optional?) relevantDate
// relevantDate will be the applicationDate or effectiveDate - used to determine which side
// of that date the journey falls, or whether it crosses it
// Returns: a string describing the journey
export function travelType(departure, arrival, relevantDate) {
  if (departure < relevantDate && arrival < relevantDate) {
    // whole stay is before relevantDate
    return "beforeDate";
  } else if (departure < relevantDate) {
    // departure is before relevantDate
    return "acrossDate";
  } else {
    // whole stay is after relevantDate
    return "afterDate";
  }
}

// ---------------------
// ***NOTE: Below to be refactored to use above "travelType" function -> Also then need to refactor notesTexts to use altered "type" names
// FUNCTION determines # of net travel days (subtracting departure and arrival days (if they are within the award period))
// Returns a travel details object: { departure: "formatted date", arrival, grossDuration, netDuration };
// Issue: Not covering travel dates into future award period - relevant for SU FI
export function travelDetails(departure, arrival, relevantDate) {
  const formatDeparture = formatDates(departure);
  const formatArrival = formatDates(arrival);
  const grossDuration = daysBetween(departure, arrival) - 2; // -2 to exclude dep and arr dates.
  let type = travelType(departure, arrival, relevantDate);
  const details = { type, formatDeparture, formatArrival, grossDuration };
  if (type === "beforeDate") {
    // whole stay is before effectiveDate => 0 days in new award period
    details.netDuration = 0;
  } else if (type === "acrossDate") {
    // departure is before effectiveDate => subtract all days before effDate. +2 avoids double counting dep and arr dates
    details.netDuration =
      grossDuration - daysBetween(departure, relevantDate) + 2;
  } else if (type === "afterDate") {
    // whole stay is within current award period => subtract dep and arr days
    details.netDuration = grossDuration;
  } else alert("Error: travel type not found, in travelDetails.js");
  // return object with travel details
  return details;
}
// ---------------------
// FUNCTION to determine 12 month award period
// returns 2 string objects: periodStart and End, in format "dd.mm.yyyy"
export function awardPeriod(startOfPeriod) {
  // convert HTML date format to JS Date format
  const startDate = new Date(startOfPeriod);
  // Calculate the end date by adding 11 months and setting the date to the last day of that month
  const endDate = addMonths(startDate, 11, 0);

  const periodStart = formatDates(startDate, "letterDate");
  const periodEnd = formatDates(endDate, "letterDate");

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
// * Date format set to "ddmmyy"
export function formatLetterDates(content) {
  const { applicationDate, effectiveDate } = content;
  const formattedAppDate = formatDates(applicationDate, "ddmmyy");
  const formattedStartDate = awardPeriod(effectiveDate).periodStart;
  const formattedEndDate = awardPeriod(effectiveDate).periodEnd;
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
// returns array of 3 dates: 1st day of month 4, 8 and 11 months after startDate
export function findControlMonths(effectiveDate) {
  const controlMonths = [
    addMonths(effectiveDate, 4),
    addMonths(effectiveDate, 8),
    addMonths(effectiveDate, 11),
  ];
  return controlMonths;
}
// -------------------------
// FUNCTION to see if a backdated award causes a control meeting to be called the same month as the award letter is issued
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
// PROBLEM?: returns 0 if date1 is 1 month into the future
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
