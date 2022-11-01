const loginValidation = require('../public/scripts/login');
const USERNAME_ERR_CODES = loginValidation.ERROR_CODES.USERNAME;
const USERNAME_ERR_TEXTS = loginValidation.ERROR_TEXTS.USERNAME;
const PASSWORD_ERR_CODES = loginValidation.ERROR_CODES.PASSWORD;
const PASSWORD_ERR_TEXTS = loginValidation.ERROR_TEXTS.PASSWORD;


// validateUsername()
test("validateUsername - OK", () => {
    expect(loginValidation.validateUsername("asd_asd")).toBe(USERNAME_ERR_CODES.OK);
})
test("validateUsername - TOO_SHORT", () => {
    expect(loginValidation.validateUsername("asda")).toBe(USERNAME_ERR_CODES.TOO_SHORT);
})
test("validateUsername - TOO_LONG", () => {
    expect(loginValidation.validateUsername("asdasdasdasdasdasdasdasdasdasdasdasdasdasdasda")).toBe(USERNAME_ERR_CODES.TOO_LONG);
})
test("validateUsername - INVALID_CHAR", () => {
    expect(loginValidation.validateUsername("asdasd@")).toBe(USERNAME_ERR_CODES.INVALID_CHAR);
})

// getUsernameValidationText()
test("getUsernameValidationText - OK", () => {
    expect(loginValidation.getUsernameValidationText("asd_asd")).toBe(USERNAME_ERR_TEXTS[USERNAME_ERR_CODES.OK]);
});
test("getUsernameValidateText - TOO_SHORT", () => {
    expect(loginValidation.getUsernameValidationText("asda")).toBe(USERNAME_ERR_TEXTS[USERNAME_ERR_CODES.TOO_SHORT]);
});
test("getUsernameValidateText - TOO_LONG", () => {
    expect(loginValidation.getUsernameValidationText("asdasdasdasdasdasdasdasdasdasdasdasdasdasdasda")).toBe(USERNAME_ERR_TEXTS[USERNAME_ERR_CODES.TOO_LONG]);
})
test("getUsernameValidateText - INVALID_CHAR", () => {
    expect(loginValidation.getUsernameValidationText("asdasd@")).toBe(USERNAME_ERR_TEXTS[USERNAME_ERR_CODES.INVALID_CHAR]);
})

// validatePassword()
test("validatePassword - OK", () => {
    expect(loginValidation.validatePassword("Password123")).toBe(PASSWORD_ERR_CODES.OK);
});
test("validatePassword - TOO_SHORT", () => {
    expect(loginValidation.validatePassword("Pas1")).toBe(PASSWORD_ERR_CODES.TOO_SHORT);
});
test("validatePassword - TOO_LONG", () => {
    expect(loginValidation.validatePassword("Password1Password1Password1Password1Password12")).toBe(PASSWORD_ERR_CODES.TOO_LONG);
});
test("validatePassword - MISSING_NUMBER", () => {
    expect(loginValidation.validatePassword("Passwordasdfasd")).toBe(PASSWORD_ERR_CODES.NEEDS_VARIETY);
});
test("validatePassword - MISSING_CAPITAL_LETTER", () => {
    expect(loginValidation.validatePassword("passwordasdfasd123")).toBe(PASSWORD_ERR_CODES.NEEDS_VARIETY);
});

// getPasswordValidationText()
test("getPasswordValidationText - OK", () => {
    expect(loginValidation.getPasswordValidationText("Password123")).toBe(PASSWORD_ERR_TEXTS[PASSWORD_ERR_CODES.OK]);
});
test("getPasswordValidationText - TOO_SHORT", () => {
    expect(loginValidation.getPasswordValidationText("Pas1")).toBe(PASSWORD_ERR_TEXTS[PASSWORD_ERR_CODES.TOO_SHORT]);
});
test("getPasswordValidationText - TOO_LONG", () => {
    expect(loginValidation.getPasswordValidationText("Password1Password1Password1Password1Password12")).toBe(PASSWORD_ERR_TEXTS[PASSWORD_ERR_CODES.TOO_LONG]);
});
test("getPasswordValidationText - MISSING_NUMBER", () => {
    expect(loginValidation.getPasswordValidationText("Passwordasdfasd")).toBe(PASSWORD_ERR_TEXTS[PASSWORD_ERR_CODES.NEEDS_VARIETY]);
});
test("getPasswordValidationText - MISSING_CAPITAL_LETTER", () => {
    expect(loginValidation.getPasswordValidationText("passwordasdfasd123")).toBe(PASSWORD_ERR_TEXTS[PASSWORD_ERR_CODES.NEEDS_VARIETY]);
});
