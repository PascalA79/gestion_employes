function ValiderUtilisateur({id=-1,idTypeUtilisateur,idPlancher,prenom,nom,age,alias,telephone,courriel,actif=1},uniqueKeys={},foreignKey={}){
    MIN_LENGTH_NAME = 5;
    MAX_LENGTH_NAME = 45;
    MAX_LENGTH_COURRIEL = 150;
    REGEX_STRING = new RegExp( "^\[A-Za-z0-9_]{1,}$");
    REGEX_NUMBER = new RegExp( "^-*\[0-9_]{1,}$");
    REGEX_COURRIEL = new RegExp( String.raw`^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$`)
    const ERREUR_UTILISATEUR={
        OK:0,
        MISSING:1,
        INVALID:2,
        TOO_SHORT:3,
        TOO_LONG:4,
        DUPLICATE_KEY:5,
        UNFOUND_KEY:6
    }
    REGEX_UTILISATEUR={
        id:REGEX_NUMBER,
        idTypeUtilisateur:REGEX_NUMBER,
        idPlancher:REGEX_NUMBER,
        prenom:REGEX_STRING,
        nom:REGEX_STRING,
        alias:REGEX_STRING,
        age:REGEX_NUMBER,
        telephone:REGEX_NUMBER,
        courriel:REGEX_COURRIEL,
        actif:new RegExp( "^\[0-1]{1}$")
    }
    MIN_UTILISATEUR={
        prenom:2,
        nom:2,
        alias:this.MIN_LENGTH_NAME,
        age:2
    }
    MAX_UTILISATEUR={
        prenom:MAX_LENGTH_NAME,
        nom:MAX_LENGTH_NAME,
        alias:MAX_LENGTH_NAME,
        courriel:MAX_LENGTH_COURRIEL
    }
    const isValidMin=(name)=>{
        let min=MIN_UTILISATEUR[name]
        if(isValid[name]==ERREUR_UTILISATEUR.OK && isFinite(min))
        {
            let type=typeof(values[name]);
            if(type==='string' && values[name].length<min){
                
                isValid[name] = ERREUR_UTILISATEUR.TOO_SHORT;
            }
            if(type==='number' && values[name]<min){
                
                isValid[name] = ERREUR_UTILISATEUR.TOO_SHORT
            }
        }
    }
    const isValidMax=(name)=>{
        let max=MAX_UTILISATEUR[name]
        if(isValid[name]==ERREUR_UTILISATEUR.OK && isFinite(max))
        {
            let type=typeof(values[name]);
            if(type==='string' && values[name].length>max){                
                isValid[name] = ERREUR_UTILISATEUR.TOO_LONG
            }
            if(type==='number' && values[name]>max){
                isValid[name] = ERREUR_UTILISATEUR.TOO_LONG
            }
        }
    }
    const isValidFormat=(name)=>{
        let regex=REGEX_UTILISATEUR[name]
        if(isValid[name]==ERREUR_UTILISATEUR.OK && typeof(regex).test=="function")
        {
            if(!regex.test(values[name]))
            isValid[name] = ERREUR_UTILISATEUR.INVALID
        }
    }
    const isValidUniqueKey=(name)=>{
        if(!!uniqueKeys[name] && uniqueKeys[name].length && uniqueKeys[name].includes(values[name])){
            isValid[name]=ERREUR_UTILISATEUR.DUPLICATE_KEY
        }
    }
    const isValidFKey=(name)=>{
        if(!!foreignKey[name] && foreignKey[name].length && !foreignKey[name].includes(values[name])){
            isValid[name]=ERREUR_UTILISATEUR.UNFOUND_KEY
        }
    }
    let isValid={}
    const converToInt=(n)=>parseInt(n)==n?parseInt(n):"Invalide";
    let values={
        id:converToInt(id),
        idTypeUtilisateur:converToInt(idTypeUtilisateur),
        idPlancher:converToInt(idPlancher),
        prenom:prenom,
        nom:nom,
        alias:alias,
        age:converToInt(age),
        telephone:telephone,
        courriel:courriel,
        actif:converToInt(actif)
    }
    // all are required
    let listArg=Object.values(arguments)[0]
    for(obj of Object.entries(values))
    {
        isValid[obj[0]]=(!!listArg[obj[0]] || obj[1]===0 && (obj[0]==="id" ||obj[0]==="idTypeUtilisateur" ||obj[0]==="idPlancher" ||obj[0]==="age"||obj[0]==="actif" ))?ERREUR_UTILISATEUR.OK:ERREUR_UTILISATEUR.MISSING
        // validations sur chacun des champs
        isValidFormat(obj[0])
        isValidMin(obj[0])
        isValidMax(obj[0])
        isValidUniqueKey(obj[0])
        isValidFKey(obj[0])
    }
    return isValid;
}

if(typeof exports !== 'undefined') module.exports = ValiderUtilisateur;