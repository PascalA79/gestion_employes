(function(exports){

    const ERROR_CODES={
        USER:{
            OK: 0,
            MISSING: 1,
            UNKNOWN: 2, 
        },
        START:{
            OK: 0,
            INVALID: 1,
        },
        END:{
            OK: 0,
            INVALID: 1,
            BEFORESTART: 2,
            CONFLICT: 3,
        },
        ROLE:{
            OK: 0,
            MISSING: 1,
            UNKNOWN: 2,
        },
    };
    
    const CONFIRM_CODES = {
        NONE: 0,
        CONFIRMADD: 1,
        CONFIRMEDIT: 2,
        CONFIRMDELETE: 3,
        CONFIRMCONFIRM: 4
    };


    const MIN_LENGTH_USERNAME = 5;
    const MAX_LENGTH_USERNAME = 45;
    const MIN_LENGTH_PASSWORD = 5;
    const MAX_LENGTH_PASSWORD = 45;

    const ERROR_TEXTS = {};
    ERROR_TEXTS.USER={};
    ERROR_TEXTS.USER[ERROR_CODES.USER.OK] = "";
    ERROR_TEXTS.USER[ERROR_CODES.USER.MISSING] = "Utilisateur requis";
    ERROR_TEXTS.USER[ERROR_CODES.USER.UNKNOWN] = "Utilisateur inconnu";

    ERROR_TEXTS.START={};
    ERROR_TEXTS.START[ERROR_CODES.START.OK] = "";
    ERROR_TEXTS.START[ERROR_CODES.START.INVALID] = "Format de date invalide";

    ERROR_TEXTS.END={};
    ERROR_TEXTS.END[ERROR_CODES.END.OK] = "";
    ERROR_TEXTS.END[ERROR_CODES.END.INVALID] = ERROR_TEXTS.START[ERROR_CODES.START.INVALID];
    ERROR_TEXTS.END[ERROR_CODES.END.BEFORESTART] = "La fin doit être après le début";
    ERROR_TEXTS.END[ERROR_CODES.END.CONFLICT] = "Conflit avec un autre quart de travail";

    ERROR_TEXTS.ROLE={};
    ERROR_TEXTS.ROLE[ERROR_CODES.ROLE.OK] = "";
    ERROR_TEXTS.ROLE[ERROR_CODES.ROLE.MISSING] = "Rôle requis";
    ERROR_TEXTS.ROLE[ERROR_CODES.ROLE.UNKNOWN] = "Rôle inconnu";


    const CONFIRM_TEXTS = {};
    CONFIRM_TEXTS[CONFIRM_CODES.NONE] = "";
    CONFIRM_TEXTS[CONFIRM_CODES.CONFIRMADD] = "Quart ajouté";
    CONFIRM_TEXTS[CONFIRM_CODES.CONFIRMEDIT] = "Quart modifié";
    CONFIRM_TEXTS[CONFIRM_CODES.CONFIRMDELETE] = "Quart supprimé";
    CONFIRM_TEXTS[CONFIRM_CODES.CONFIRMCONFIRM] = "Quart confirmé";


    function validateUser(user){
        if(!!user) return ERROR_CODES.USER.OK;
        return ERROR_CODES.USER.UNKNOWN;
    }

    function getUserValidationText(user){
        return ERROR_TEXTS.USER[validateUser(user)];
    }

    function parseDate(dateString){        
        try{
            let maDate = new Date(dateString);
            return maDate;
        } catch(error){
            return null;
        }
    }

    // https://bobbyhadz.com/blog/javascript-check-if-date-is-valid
    function isDateValid(date){
        return date instanceof Date && !isNaN(date);
    }

    function validateStartDate(startDateString){
        return isDateValid(parseDate(startDateString)) ? 
                ERROR_CODES.START.OK : 
                ERROR_CODES.START.INVALID;
    }

    function getStartDateValidationText(startDateString){
        return ERROR_TEXTS.START[validateStartDate(startDateString)];
    }
    
    function validateEndDate(startDateString, endDateString){
        let start = parseDate(startDateString);
        let end = parseDate(endDateString);
        if(!isDateValid(end)) 
            return ERROR_CODES.END.INVALID;
        if(!isDateValid(start)) return ERROR_CODES.END.OK;
        if(start.getTime() < end.getTime()) return ERROR_CODES.END.OK
        return ERROR_CODES.END.BEFORESTART;
    }

    function getEndDateValidationText(startDateString, endDateString){
        return ERROR_TEXTS.END[validateEndDate(startDateString, endDateString)];
    }

    function validateRole(role){
        return !!role ? ERROR_CODES.ROLE.OK : ERROR_CODES.ROLE.UNKNOWN;
    }

    function getRoleValidationText(role){
        return ERROR_TEXTS.ROLE[validateRole(role)];
    }



    exports.ERROR_CODES = ERROR_CODES;
    exports.ERROR_TEXTS = ERROR_TEXTS;

    exports.CONFIRM_CODES = CONFIRM_CODES;
    exports.CONFIRM_TEXTS = CONFIRM_TEXTS;

    exports.validateUser = validateUser;
    exports.getUserValidationText = getUserValidationText;
    exports.validateStartDate = validateStartDate;
    exports.getStartDateValidationText = getStartDateValidationText;
    exports.validateEndDate = validateEndDate;
    exports.getEndDateValidationText = getEndDateValidationText;
    exports.validateRole = validateRole;
    exports.getRoleValidationText = getRoleValidationText;

})(typeof exports === 'undefined' ? this['ValidateurHoraire'] = {} : exports);
