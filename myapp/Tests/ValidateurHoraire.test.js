const Utilisateur = require("../model/Utilisateur");
const Role = require("../model/RoleUtilisateur");

const validateurHoraire = require('../public/scripts/horaire/ValidateurHoraire');
const USER_ERROR_CODES = validateurHoraire.ERROR_CODES.USER;
const USER_ERROR_TEXTS = validateurHoraire.ERROR_TEXTS.USER;
const START_ERROR_CODES = validateurHoraire.ERROR_CODES.START;
const START_ERROR_TEXTS = validateurHoraire.ERROR_TEXTS.START;
const END_ERROR_CODES = validateurHoraire.ERROR_CODES.END;
const END_ERROR_TEXTS = validateurHoraire.ERROR_TEXTS.END;
const ROLE_ERROR_CODES = validateurHoraire.ERROR_CODES.ROLE;
const ROLE_ERROR_TEXTS = validateurHoraire.ERROR_TEXTS.ROLE;

// validateUser()
test("validateUser - OK", () => {
    let user = new Utilisateur({});
    expect(validateurHoraire.validateUser(user)).toBe(USER_ERROR_CODES.OK);
})

test("validateUser - UNKNOWN", () => {
    expect(validateurHoraire.validateUser(null)).toBe(USER_ERROR_CODES.UNKNOWN);
})


// getUserValidationText()
test("getUserValidationText - OK", () => {
    let user = new Utilisateur({});
    expect(validateurHoraire.getUserValidationText(user)).toBe(USER_ERROR_TEXTS[USER_ERROR_CODES.OK]);
});

test("getUserValidationText - UNKNOWN", () => {
    expect(validateurHoraire.getUserValidationText(null)).toBe(USER_ERROR_TEXTS[USER_ERROR_CODES.UNKNOWN]);
});


// validateStartDate;
test("validateStartDate - OK - datetime-local", () => {
    const startDateString = "2022-10-26T12:34:56";
    expect(validateurHoraire.validateStartDate(startDateString)).toBe(START_ERROR_CODES.OK);
});

test("validateStartDate - OK - normal", () => {
    const startDateString = "2022-10-26 12:34:56";
    expect(validateurHoraire.validateStartDate(startDateString)).toBe(START_ERROR_CODES.OK);
});

test("validateStartDate - OK - date only", () => {
    const startDateString = "2022-10-26";
    expect(validateurHoraire.validateStartDate(startDateString)).toBe(START_ERROR_CODES.OK);
});

test("validateStartDate - INVALID", () => {
    const startDateString = "InvalidDateString";
    expect(validateurHoraire.validateStartDate(startDateString)).toBe(START_ERROR_CODES.INVALID);
});


// getStartDateValidationText;
test("validateStartDate - OK - datetime-local", () => {
    const startDateString = "2022-10-26T12:34:56";
    expect(validateurHoraire.getStartDateValidationText(startDateString)).toBe(START_ERROR_TEXTS[START_ERROR_CODES.OK]);
});

test("validateStartDate - OK - normal", () => {
    const startDateString = "2022-10-26 12:34:56";
    expect(validateurHoraire.getStartDateValidationText(startDateString)).toBe(START_ERROR_TEXTS[START_ERROR_CODES.OK]);
});

test("validateStartDate - OK - date only", () => {
    const startDateString = "2022-10-26";
    expect(validateurHoraire.getStartDateValidationText(startDateString)).toBe(START_ERROR_TEXTS[START_ERROR_CODES.OK]);
});

test("validateStartDate - INVALID", () => {
    const startDateString = "InvalidDateString";
    expect(validateurHoraire.getStartDateValidationText(startDateString)).toBe(START_ERROR_TEXTS[START_ERROR_CODES.INVALID]);
});


// validateEndDate;
test("validateEndDate - OK - datetime-local", () => {
    const startDateString = "2022-10-26T12:34:56";
    const endDateString = "2022-10-26T12:34:57";
    expect(validateurHoraire.validateEndDate(startDateString, endDateString)).toBe(END_ERROR_CODES.OK);
});

test("validateEndDate - OK - normal", () => {
    const startDateString = "2022-10-26T12:34:56";
    const endDateString = "2022-10-26 12:34:57";
    expect(validateurHoraire.validateEndDate(startDateString, endDateString)).toBe(END_ERROR_CODES.OK);
});

test("validateEndDate - OK - date only", () => {
    const startDateString = "2022-10-25";
    const endDateString = "2022-10-26";
    expect(validateurHoraire.validateEndDate(startDateString, endDateString)).toBe(END_ERROR_CODES.OK);
});

test("validateEndDate - OK - invalid start", () => {
    const startDateString = "InvalidStart";
    const endDateString = "2022-10-26";
    expect(validateurHoraire.validateEndDate(startDateString, endDateString)).toBe(END_ERROR_CODES.OK);
});

test("validateEndDate - INVALID", () => {
    const startDateString = "2022-10-26T12:34:56";
    const endDateString = "InvalidDateString";
    expect(validateurHoraire.validateEndDate(startDateString, endDateString)).toBe(END_ERROR_CODES.INVALID);
});

test("validateEndDate - BEFORESTART", () => {
    const startDateString = "2022-10-26T12:34:56";
    const endDateString = "2022-10-26T12:34:55";
    expect(validateurHoraire.validateEndDate(startDateString, endDateString)).toBe(END_ERROR_CODES.BEFORESTART);
});


// getEndDateValidationText;
test("validateEndDate - OK - datetime-local", () => {
    const startDateString = "2022-10-26T12:34:56";
    const endDateString = "2022-10-26T12:34:57";
    expect(validateurHoraire.getEndDateValidationText(startDateString, endDateString)).toBe(END_ERROR_TEXTS[END_ERROR_CODES.OK]);
});

test("validateEndDate - OK - normal", () => {
    const startDateString = "2022-10-26T12:34:56";
    const endDateString = "2022-10-26 12:34:57";
    expect(validateurHoraire.getEndDateValidationText(startDateString, endDateString)).toBe(END_ERROR_TEXTS[END_ERROR_CODES.OK]);
});

test("validateEndDate - OK - date only", () => {
    const startDateString = "2022-10-25";
    const endDateString = "2022-10-26";
    expect(validateurHoraire.getEndDateValidationText(startDateString, endDateString)).toBe(END_ERROR_TEXTS[END_ERROR_CODES.OK]);
});

test("validateEndDate - OK - invalid start", () => {
    const startDateString = "InvalidStart";
    const endDateString = "2022-10-26";
    expect(validateurHoraire.getEndDateValidationText(startDateString, endDateString)).toBe(END_ERROR_TEXTS[END_ERROR_CODES.OK]);
});

test("validateEndDate - INVALID", () => {
    const startDateString = "2022-10-26T12:34:56";
    const endDateString = "InvalidDateString";
    expect(validateurHoraire.getEndDateValidationText(startDateString, endDateString)).toBe(END_ERROR_TEXTS[END_ERROR_CODES.INVALID]);
});

test("validateEndDate - BEFORESTART", () => {
    const startDateString = "2022-10-26T12:34:56";
    const endDateString = "2022-10-26T12:34:55";
    expect(validateurHoraire.getEndDateValidationText(startDateString, endDateString)).toBe(END_ERROR_TEXTS[END_ERROR_CODES.BEFORESTART]);
});


// validateRole;
test("validateRole - OK", () => {
    const role = new Role({});
    expect(validateurHoraire.validateRole(role)).toBe(ROLE_ERROR_CODES.OK);
});

test("validateRole - UNKNOWN", () => {
    expect(validateurHoraire.validateRole(null)).toBe(ROLE_ERROR_CODES.UNKNOWN);
});

// getRoleValidationText;
test("getRoleValidationText - OK", () => {
    const role = new Role({});
    expect(validateurHoraire.getRoleValidationText(role)).toBe(ROLE_ERROR_TEXTS[ROLE_ERROR_CODES.OK]);
});

test("getRoleValidationText - UNKNOWN", () => {
    expect(validateurHoraire.getRoleValidationText(null)).toBe(ROLE_ERROR_TEXTS[ROLE_ERROR_CODES.UNKNOWN]);
});

