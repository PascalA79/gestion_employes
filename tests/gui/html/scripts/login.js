const ERROR_CODES={
    USERNAME: {
        OK: 0,
        TOO_SHORT: 1,
        TOO_LONG: 2,
        INVALID_CHAR: 3
    },
    PASSWORD: {
        OK: 0,
        TOO_SHORT: 1,
        TOO_LONG: 2,
        NEEDS_VARIETY: 3,
    }
}

const ERROR_TEXTS = {}
ERROR_TEXTS.USERNAME={}
ERROR_TEXTS.USERNAME[ERROR_CODES.USERNAME.OK] = "";
ERROR_TEXTS.USERNAME[ERROR_CODES.USERNAME.TOO_SHORT] = `Nom d'utilisateur trop court. Doit contenir au moins ${MIN_LENGTH_USERNAME} caractères.`;
ERROR_TEXTS.USERNAME[ERROR_CODES.USERNAME.TOO_LONG] = `Nom d'utilisateur trop court. Doit contenir au moins ${MIN_LENGTH_USERNAME} caractères.`;;
ERROR_TEXTS.USERNAME[ERROR_CODES.USERNAME.INVALID_CHAR] = "";


const MIN_LENGTH_USERNAME = 5;
const MAX_LENGTH_USERNAME = 45;
const MIN_LENGTH_PASSWORD = 10;
const MAX_LENGTH_PASSWORD = 45;

function validateUsername(username){
    if(username.length < MIN_LENGTH_USERNAME) return ERROR_CODES.USERNAME.TOO_SHORT;
    if(username.length > MAX_LENGTH_USERNAME) return ERROR_CODES.USERNAME.TOO_LONG;
    if(!new RegExp(`^\[A-Za-z0-9_]{${MIN_LENGTH_USERNAME},${MAX_LENGTH_USERNAME}}$`).test(username)) return ERROR_CODES.USERNAME.INVALID_CHAR;
    return ERROR_CODES.USERNAME.OK;
}

function getUsernameError(username){
    const USERCODES = ERROR_CODES.USERNAME;
    switch(validateUsername){
        case USERCODES.OK: return "";
        case USERCODES.TOO_SHORT: return "Le nom d'utilisateur dont comporter au moins 5 caractères"
    }
}

function validatePassword(password){
    if(password.length < 10) return ERROR_CODES.PASSWORD.TOO_SHORT;
    if(password.length > 45) return ERROR_CODES.PASSWORD.TOO_LONG;
    if(!new RegExp(`^(?=.*[A-Z]+)(?=.*[0-9]+).{${MIN_LENGTH_PASSWORD},${MAX_LENGTH_PASSWORD}}$`).test(password)) return ERROR_CODES.PASSWORD.NEEDS_VARIETY;
    return ERROR_CODES.PASSWORD.OK;
}

module.exports.ERROR_CODES = ERROR_CODES;
module.exports.validateUsername = validateUsername
module.exports.validatePassword = validatePassword






// Unit tests
const unitTests = {
    "validateUsername": {
        "OK": () => validateUsername("asd_asd") == ERROR_CODES.USERNAME.OK,
        "TOO_SHORT": () => validateUsername("asda") == ERROR_CODES.USERNAME.TOO_SHORT,
        "TOO_LONG": () => validateUsername("asdasdasdasdasdasdasdasdasdasdasdasdasdasdasda") == ERROR_CODES.USERNAME.TOO_LONG,
        "INVALID_CHAR": () => validateUsername("asdasd@") == ERROR_CODES.USERNAME.INVALID_CHAR
    },
    "validatePassword": {
        "OK": () => validatePassword("Password123") == ERROR_CODES.PASSWORD.OK,
        "TOO_SHORT": () => validatePassword("Password1") == ERROR_CODES.PASSWORD.TOO_SHORT,
        "TOO_LONG": () => validatePassword("Password1Password1Password1Password1Password12") == ERROR_CODES.PASSWORD.TOO_LONG,
        "MISSING_NUMBER": () => validatePassword("Passwordasdfasd") == ERROR_CODES.PASSWORD.NEEDS_VARIETY,
        "MISSING_CAPITAL_LETTER": () => validatePassword("passwordasdfasd123") == ERROR_CODES.PASSWORD.NEEDS_VARIETY
    }
}
module.exports.unitTests = unitTests;