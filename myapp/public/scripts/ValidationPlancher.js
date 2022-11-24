const ERREUR_PLANCHER={
    OK:0,
    MISSING:1,
    INVALID:2,
    TOO_SHORT:3,
    TOO_LONG:4,
    DUPLICATE_KEY:5,
    UNFOUND_KEY:6
}
/**
 * Valide les planchers
 */
function ValiderPlancher({idPlancher,nomPlancher,superviseurs=[]},uniqueKeys={},foreignKeys={},permis={}){
    const MIN_LENGTH_NAME = 1;
    const MAX_LENGTH_NAME = 45;
    const REGEX_STRING = new RegExp( "^\[A-Za-z0-9_]{1,}( [A-Za-z0-9_]{1,})*$");
    const REGEX_NUMBER = new RegExp( "^-*\[0-9]{1,}$");
    const IS_ARRAY={test:Array.isArray}
    
    const TEST_UTILISATEUR={
        idPlancher:REGEX_NUMBER,
        nomPlancher:REGEX_STRING,
        superviseurs:IS_ARRAY,
    }
    const MIN_UTILISATEUR={
        nomPlancher:MIN_LENGTH_NAME
    }
    const MAX_UTILISATEUR={
        nomPlancher:MAX_LENGTH_NAME
    }
    const isValidMin=(name)=>{
        let min=MIN_UTILISATEUR[name]
        if(isValid[name]==ERREUR_PLANCHER.OK && isFinite(min))
        {
            let type=typeof(values[name]);
            if(type==='string' && values[name].length<min){
                
                isValid[name] = ERREUR_PLANCHER.TOO_SHORT;
            }
            if(type==='number' && values[name]<min){
                
                isValid[name] = ERREUR_PLANCHER.TOO_SHORT
            }
        }
    }
    const isValidMax=(name)=>{
        let max=MAX_UTILISATEUR[name]
        if(isValid[name]==ERREUR_PLANCHER.OK && isFinite(max))
        {
            let type=typeof(values[name]);
            if(type==='string' && values[name].length>max){                
                isValid[name] = ERREUR_PLANCHER.TOO_LONG
            }
            if(type==='number' && values[name]>max){
                isValid[name] = ERREUR_PLANCHER.TOO_LONG
            }
        }
    }
    const isValidFormat=(name)=>{
        let test=TEST_UTILISATEUR[name]
        if(isValid[name]==ERREUR_PLANCHER.OK && typeof(test)=="object")
        {
            if(!test.test(values[name]))
            isValid[name] = ERREUR_PLANCHER.INVALID
        }
    }
    const isValidUniqueKey=(name)=>{
        if(isValid[name]==ERREUR_PLANCHER.OK && !!uniqueKeys[name] && uniqueKeys[name].length && uniqueKeys[name].includes(values[name]) && 
            !(!!permis[name] && values[name]==permis[name])){
            isValid[name]=ERREUR_PLANCHER.DUPLICATE_KEY
        }
    }
    const isValidFKey=(name)=>{
        if(isValid[name]==ERREUR_PLANCHER.OK && !!foreignKeys[name] && foreignKeys[name].length && !foreignKeys[name].includes(values[name])){
            isValid[name]=ERREUR_PLANCHER.UNFOUND_KEY
        }
    }
    let isValid={}
    const converToInt=(n)=>parseInt(n)==n?parseInt(n):"Invalide";
    let values={
        idPlancher:converToInt(idPlancher),
        nomPlancher:nomPlancher,
        superviseurs:superviseurs
    }
    // all are required

    let listArg=Object.values(arguments)[0]
    for(obj of Object.entries(values))
    {
        isValid[obj[0]]=(!!listArg[obj[0]] || obj[1]===0 && obj[0]==="idPlancher")?ERREUR_PLANCHER.OK:ERREUR_PLANCHER.MISSING
        // validations sur chacun des champs
        isValidFormat(obj[0])
        isValidMin(obj[0])
        isValidMax(obj[0])
        isValidUniqueKey(obj[0])
        isValidFKey(obj[0])

    }
    return isValid;
}

if(typeof exports !== 'undefined'){
    module.exports.ValiderPlancher = ValiderPlancher;
    module.exports.ERREUR_PLANCHER = ERREUR_PLANCHER;
}