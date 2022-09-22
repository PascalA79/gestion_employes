(function(exports){
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
            UNKNOWN:4
        }
    }

    const MIN_LENGTH_USERNAME = 5;
    const MAX_LENGTH_USERNAME = 45;
    const MIN_LENGTH_PASSWORD = 5;
    const MAX_LENGTH_PASSWORD = 45;

    const ERROR_TEXTS = {};
    ERROR_TEXTS.USERNAME={};
    ERROR_TEXTS.USERNAME[ERROR_CODES.USERNAME.OK] = "";
    ERROR_TEXTS.USERNAME[ERROR_CODES.USERNAME.TOO_SHORT] = `Nom d'utilisateur trop court. Doit contenir au moins ${MIN_LENGTH_USERNAME} caractères.`;
    ERROR_TEXTS.USERNAME[ERROR_CODES.USERNAME.TOO_LONG] = `Nom d'utilisateur trop long. Doit contenir au plus ${MAX_LENGTH_USERNAME} caractères.`;;
    ERROR_TEXTS.USERNAME[ERROR_CODES.USERNAME.INVALID_CHAR] = "Nom d'utilisateur ne doit pas contenir de caractères spéciaux";

    ERROR_TEXTS.PASSWORD={};
    ERROR_TEXTS.PASSWORD[ERROR_CODES.PASSWORD.OK] = "";
    ERROR_TEXTS.PASSWORD[ERROR_CODES.PASSWORD.TOO_SHORT] = `Mot de passe trop court. Doit contenir au moins ${MIN_LENGTH_PASSWORD} caractères.`;
    ERROR_TEXTS.PASSWORD[ERROR_CODES.PASSWORD.TOO_LONG] = `Mot de passe trop long. Doit contenir au plus ${MAX_LENGTH_PASSWORD} caractères.`;;
    ERROR_TEXTS.PASSWORD[ERROR_CODES.PASSWORD.NEEDS_VARIETY] = "Mot de passe doit contenir au moins une lettre majuscule et un chiffre";
    ERROR_TEXTS.PASSWORD[ERROR_CODES.PASSWORD.UNKNOWN] = "Combinaison de nom d'utilisateur et mot de passe inconnue";


    const REGEXP_TEMPLATE_USERNAME = "^\[A-Za-z0-9_]{" + MIN_LENGTH_USERNAME + "," + MAX_LENGTH_USERNAME + "}$";
    const REGEXP_TEMPLATE_PASSWORD = "^(?=.*[A-Z]+)(?=.*[0-9]+).{" + MIN_LENGTH_PASSWORD + "," + MAX_LENGTH_PASSWORD + "}$";
    const REGEXP_USERNAME = new RegExp(REGEXP_TEMPLATE_USERNAME);
    const REGEXP_PASSWORD = new RegExp(REGEXP_TEMPLATE_PASSWORD);

    function getValidationText(text, validateText, error_texts) {
        return error_texts[validateText(text)];
    }

    function validateUsername(username){
        if(username.length < MIN_LENGTH_USERNAME) return ERROR_CODES.USERNAME.TOO_SHORT;
        if(username.length > MAX_LENGTH_USERNAME) return ERROR_CODES.USERNAME.TOO_LONG;
        if(!REGEXP_USERNAME.test(username)) return ERROR_CODES.USERNAME.INVALID_CHAR;
        return ERROR_CODES.USERNAME.OK;
    }

    function getUsernameValidationText(username){
        return getValidationText(username, validateUsername, ERROR_TEXTS.USERNAME);
    }

    function validatePassword(password){
        if(password.length < MIN_LENGTH_PASSWORD) return ERROR_CODES.PASSWORD.TOO_SHORT;
        if(password.length > MAX_LENGTH_PASSWORD) return ERROR_CODES.PASSWORD.TOO_LONG;
        if(!REGEXP_PASSWORD.test(password)) return ERROR_CODES.PASSWORD.NEEDS_VARIETY;
        return ERROR_CODES.PASSWORD.OK;
    }

    function getPasswordValidationText(username){
        return getValidationText(username, validatePassword, ERROR_TEXTS.PASSWORD);
    }

    exports.ERROR_CODES = ERROR_CODES;
    exports.ERROR_TEXTS = ERROR_TEXTS;
    exports.validateUsername = validateUsername;
    exports.validatePassword = validatePassword;
    exports.getUsernameValidationText = getUsernameValidationText;
    exports.getPasswordValidationText = getPasswordValidationText;




    // Unit tests
    const unitTests = {
        "validateUsername": {
            "OK": () => validateUsername("asd_asd") == ERROR_CODES.USERNAME.OK,
            "TOO_SHORT": () => validateUsername("asda") == ERROR_CODES.USERNAME.TOO_SHORT,
            "TOO_LONG": () => validateUsername("asdasdasdasdasdasdasdasdasdasdasdasdasdasdasda") == ERROR_CODES.USERNAME.TOO_LONG,
            "INVALID_CHAR": () => validateUsername("asdasd@") == ERROR_CODES.USERNAME.INVALID_CHAR
        },
        "getUsernameValidationText": {
            "OK": () => getUsernameValidationText("asd_asd") == ERROR_TEXTS.USERNAME[ERROR_CODES.USERNAME.OK],
            "TOO_SHORT": () => getUsernameValidationText("asda") == ERROR_TEXTS.USERNAME[ERROR_CODES.USERNAME.TOO_SHORT],
            "TOO_LONG": () => getUsernameValidationText("asdasdasdasdasdasdasdasdasdasdasdasdasdasdasda") == ERROR_TEXTS.USERNAME[ERROR_CODES.USERNAME.TOO_LONG],
            "INVALID_CHAR": () => getUsernameValidationText("asdasd@") == ERROR_TEXTS.USERNAME[ERROR_CODES.USERNAME.INVALID_CHAR]
        },
        "validatePassword": {
            "OK": () => validatePassword("Password123") == ERROR_CODES.PASSWORD.OK,
            "TOO_SHORT": () => validatePassword("Pas1") == ERROR_CODES.PASSWORD.TOO_SHORT,
            "TOO_LONG": () => validatePassword("Password1Password1Password1Password1Password12") == ERROR_CODES.PASSWORD.TOO_LONG,
            "MISSING_NUMBER": () => validatePassword("Passwordasdfasd") == ERROR_CODES.PASSWORD.NEEDS_VARIETY,
            "MISSING_CAPITAL_LETTER": () => validatePassword("passwordasdfasd123") == ERROR_CODES.PASSWORD.NEEDS_VARIETY
        },
        "getPasswordValidationText": {
            "OK": () => getPasswordValidationText("Password123") == ERROR_TEXTS.PASSWORD[ERROR_CODES.PASSWORD.OK],
            "TOO_SHORT": () => getPasswordValidationText("Pas1") == ERROR_TEXTS.PASSWORD[ERROR_CODES.PASSWORD.TOO_SHORT],
            "TOO_LONG": () => getPasswordValidationText("Password1Password1Password1Password1Password12") == ERROR_TEXTS.PASSWORD[ERROR_CODES.PASSWORD.TOO_LONG],
            "MISSING_NUMBER": () => getPasswordValidationText("Passwordasdfasd") == ERROR_TEXTS.PASSWORD[ERROR_CODES.PASSWORD.NEEDS_VARIETY],
            "MISSING_CAPITAL_LETTER": () => getPasswordValidationText("passwordasdfasd123") == ERROR_TEXTS.PASSWORD[ERROR_CODES.PASSWORD.NEEDS_VARIETY]
        }
    }
    exports.unitTests = unitTests;
})(typeof exports === 'undefined' ? this['loginValidation'] = {} : exports);
