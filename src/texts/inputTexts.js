// Texts used for labels, dropdowns etc in Inputs.jsx
// ! usage of this feture is postpoed due to time constraints. Input texts will be specified within code in general

// default values, such as disabled "choose" option at top of <select> inputs, yes/no selectors etc.
export const defaultValues = {
  choose: "--Velg--",
  yes: "ja",
  capsYes: "Ja",
  no: "nei",
  capsNo: "Nei",
};

export const inputLabels = {
  selectFormBtns: {
    firstTimeApply: "Førstegangskrav",
    newPeriod: "Ny periode",
    control: "SU FI", // SU FI is terminology from old system used by NAV
  },
};

// options for grounds for failing to attend for application or control
export const noAttendanceGrounds = {
  validFail: "Fullmakt og legeerklæring",
  noRep: "Mangler fullmakt",
  noMedEv: "Mangler legeerklæring",
  noGrounds: "Mangler både fullmakt og legeerklæring",
};
