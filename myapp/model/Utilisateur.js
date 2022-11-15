const TYPE_UTILISATEUR = require('./TYPE_UTILISATEUR');
const {TUILES, TITRES} = require("./TUILES");
const Utilities = require('../class/Utilities');
class Utilisateur{
    static #DAL
    static MIN_LENGTH_NAME = 5;
    static MAX_LENGTH_NAME = 45;
    static MAX_LENGTH_COURRIEL = 150;
    static REGEX_STRING = new RegExp( "^\[A-Za-z0-9_]{1,}$");
    static REGEX_NUMBER = new RegExp( "^\[0-9_]{1,}$");
    static REGEX_COURRIEL = new RegExp( "^\[A-Za-z0-9_]+@([\w-]+\.)+[\w-]{2,4}$");
    static REGEX_UTILISATEUR={
        id:Utilisateur.REGEX_NUMBER,
        idTypeUtilisateur:Utilisateur.REGEX_NUMBER,
        idPlancher:Utilisateur.REGEX_NUMBER,
        prenom:Utilisateur.REGEX_STRING,
        nom:Utilisateur.REGEX_STRING,
        alias:Utilisateur.REGEX_STRING,
        age:Utilisateur.REGEX_NUMBER,
        telephone:Utilisateur.REGEX_NUMBER,
        courriel:Utilisateur.REGEX_COURRIEL,
        actif:Utilisateur.REGEX_NUMBER
    }
    static MIN_UTILISATEUR={
        prenom:1,
        nom:1,
        alias:this.MIN_LENGTH_NAME,
        age:0,
        actif:0
    }
    static MAX_UTILISATEUR={
        prenom:Utilisateur.MAX_LENGTH_NAME,
        nom:Utilisateur.MAX_LENGTH_NAME,
        alias:Utilisateur.MAX_LENGTH_NAME,
        courriel:Utilisateur.MAX_LENGTH_COURRIEL,
        actif:1
    }

    static validator({id,idTypeUtilisateur,idPlancher,prenom,nom,age,alias,telephone,courriel,actif=1}){
        /*
        const isValidMin=(name,min)=>{
            let min=Utilisateur.MIN_LENGTH_NAME[name]
            if(isValid[name]==ERREUR_UTILISATEUR.OK)
            {
                type=typeof(values[name]);
                if(type==='string'){
                    values[name].length>=min
                    isValid[name] = ERREUR_UTILISATEUR.TOO_SHORT
                }
                if(type==='number'){
                    values[name]>=min
                    isValid[name] = ERREUR_UTILISATEUR.TOO_SHORT
                }
            }
        }
        const isValidMax=(name,max)=>{
            let max=Utilisateur.MAX_LENGTH_NAME[name]
            if(isValid[name]==ERREUR_UTILISATEUR.OK)
            {
                type=typeof(values[name]);
                if(type==='string'){
                    values[name].length<=max
                    isValid[name] = ERREUR_UTILISATEUR.TOO_LONG
                }
                if(type==='number'){
                    values[name]<=max
                    isValid[name] = ERREUR_UTILISATEUR.TOO_LONG
                }
            }
        }
        const isValidFormat=(name)=>{
            let regex=Utilisateur.REGEX_UTILISATEUR[name]
            if(isValid[name]==ERREUR_UTILISATEUR.OK)
            {
                if(regex.test(values[name]))
                isValid[name] = ERREUR_UTILISATEUR.INVALID
            }
        }
        let isValid={}
        let values={
            id:id?parseInt(id):-1,
            idTypeUtilisateur:parseInt(idTypeUtilisateur),
            idPlancher:parseInt(idPlancher),
            prenom:prenom,
            nom:nom,
            alias:alias,
            age:parseInt(age),
            telephone:telephone,
            courriel:courriel,
            actif:parseInt(actif)
        }
        // all are required
        for(arg of arguments)
        {
            let obj=Object.entries(arg)
            isValid[obj[0]]=
            values[obj[0]]=!!obj[1] || obj[1]===0 && (obj[1]==="id" ||obj[1]==="idTypeUtilisateur" ||obj[1]==="idPlancher" ||obj[1]==="age" )?ERREUR_UTILISATEUR.OK:ERREUR_UTILISATEUR.REQUIRED
            // validations
            isValidFormat(obj[0])
            isValidMin(obj[0])
            isValidMax(obj[0])
        }
        */
    }


    static connect(DAL){
        Utilisateur.#DAL=DAL;
    }
    constructor({id,idTypeUtilisateur,idPlancher,prenom,nom,age,alias,telephone,courriel,actif=1}){
        this.id=id?id:-1;
        this.idTypeUtilisateur=idTypeUtilisateur;
        this.idPlancher=idPlancher;
        this.prenom=prenom;
        this.nom=nom;
        this.alias=alias;
        this.age=age;
        this.telephone=telephone;
        this.courriel=courriel;
        this.actif=parseInt(actif);
    }    async validate(){
        
        
        let isValidId=!isNaN(parseInt(this.actif));
        let isValidPrenom=typeof(this.prenom) == 'string'&&this.prenom.length<1;
        let isValidNom=typeof(this.nom) == 'string'&&this.nom.length<1;
        let isValidAge=!isNaN(parseInt(this.age)) && this.age>0 ;
        let isValidTelephone=typeof(this.telephone) == 'string' || true;
        let isValidCourriel=Utilisateur.REGEXP_COURRIEL.test(this.courriel) && this.courriel.length<Utilisateur.MAX_LENGTH_COURRIEL;
        let isValidActif=[0,1].includes(this.actif);
        let isValidAlias=Utilisateur.REGEXP_USERNAME.test(this.alias)
                        &&this.alias.length<=Utilisateur.MIN_LENGTH_USERNAME
                        &&this.alias.length<=Utilisateur.MAX_LENGTH_USERNAME
        //Autres
        let planchers=await Utilisateur.#DAL.getAllPlanchers()
        let plancher=Utilities.assiativeArrayToDict(planchers.filter(p=>p.idPlancher==this.idPlancher)[0]);
        let userByAlias=isValidAlias?await Utilisateur.getUserByAlias(this.alias):undefined;

        let isValidIdTypeUtilisateur=Object.values(TYPE_UTILISATEUR).includes(parseInt(this.idTypeUtilisateur))
        isValidAlias=isValidAlias&& !isFinite(userByAlias)
        let isValidIdPlancher=isFinite(plancher['idPlancher'])
        return {
            id:isValidId,
            idTypeUtilisateur:isValidIdTypeUtilisateur,
            idPlancher:isValidIdPlancher,
            prenom:isValidPrenom,
            nom:isValidNom,
            alias:isValidAlias,
            age:isValidAge,
            telephone:isValidTelephone,
            courriel:isValidCourriel,
            actif:isValidActif
        }
    }
    async add(){
        let validate=await this.validate()
        let validation=await Object.values(validate).filter(value=>value==0)[0]
        if(validation.length==1) await Utilisateur.#DAL.addUtilisateur({...this})
        return validate;
    }

    async update(){
        let validation=await Object.values(this.validate()).filter(value=>value==0)
        if(validation.length==1) await Utilisateur.#DAL.updateUtilisateur({...this})
        return validation;
    }

    async delete(){
        await Utilisateur.#DAL.removeUtilisateur(this.id)
    }
    


    isAdministrateur(){
        return this.idTypeUtilisateur == TYPE_UTILISATEUR.ADMINISTRATEUR;
    }
    isDirecteur(){
        return this.idTypeUtilisateur == TYPE_UTILISATEUR.DIRECTEUR;
    }
    isSuperviseur(){
        return this.idTypeUtilisateur == TYPE_UTILISATEUR.SUPERVISEUR;
    }

    async getListEmployes(){
        return await Utilisateur.#DAL.getListEmployes(this);
    }

    async isSuperviseurOfPlancher(idPlancher){
        if(!this.isSuperviseur()) return false
        let arrayIdPlancher=Utilities.getArray(await Utilisateur.#DAL.getPlanchersBySuperviseur(this.id))
        .map(plancher=>plancher.idPlancher);
        return arrayIdPlancher.includes(parseInt(idPlancher));
    }
    static async getSuperviseurOfPlancher(idPlancher){
        return await Utilisateur.#DAL.getSuperviseurOfPlancher(idPlancher);
    }
    async isSuperviseurOfUtilisateur(idUtilisateur){
        if(!this.isSuperviseur()) return false
        let user = await Utilisateur.getUserById(idUtilisateur)
        return await this.isSuperviseurOfPlancher(user.idPlancher)
    }

    static async getUserById(id){
        const data=await Utilisateur.#get(id,'idUtilisateur');
        if(!data) return []
        return data.map(user=>new Utilisateur(user))[0];
    }
    static async getUserByAlias(alias){
        const data=await Utilisateur.#get(alias,'alias');
        if(!data) return []
        return data.map(user=>new Utilisateur(user))[0];
    }
    static async getUserByPlancher(idPlancher){
        const data=await Utilisateur.#get(idPlancher,'idPlancher');
        if(!data) return []
        return data.map(user=>new Utilisateur(user));
    }
    static async getUsers(){
        const data=await Utilisateur.#get();
        if(!data) return []
        return data.map(user=>new Utilisateur(user));
    }
    static async #get(value=null, champs=null,equation='='){
        return Utilisateur.#DAL.getUsers(value, champs,equation)        
    }
    getMainOption(){
        let acces=[]
        //creation tuiles
        const tuile=TUILES;
        
        switch (this.idTypeUtilisateur){
            case TYPE_UTILISATEUR.NULL: {
                break
            }
            case TYPE_UTILISATEUR.EMPLOYÉ:{
                acces.push(tuile[TITRES.HORAIRE_PERSO])
                acces.push(tuile[TITRES.DISPONIBILITE])
                break
            }
            case TYPE_UTILISATEUR.SUPERVISEUR:{
                acces.push(tuile[TITRES.EMPLOYES])
                acces.push(tuile[TITRES.HORAIRE_PERSO])
                acces.push(tuile[TITRES.HORAIRE_PLANCHER])
                acces.push(tuile[TITRES.PUNCH])
                acces.push(tuile[TITRES.DEPENSES])
                acces.push(tuile[TITRES.PLANCHERS])
                // acces.push(tuile['Planchers'])
                break;
            }
            case TYPE_UTILISATEUR.DIRECTEUR:
            case TYPE_UTILISATEUR.ADMINISTRATEUR:{
                acces.push(tuile[TITRES.EMPLOYES])
                acces.push(tuile[TITRES.HORAIRE_PERSO])
                acces.push(tuile[TITRES.HORAIRE_PLANCHER])
                acces.push(tuile[TITRES.PUNCH])
                acces.push(tuile[TITRES.DEPENSES])
                acces.push(tuile[TITRES.PLANCHERS])
                acces.push(tuile[TITRES.DISPONIBILITE])
                acces.push(tuile[TITRES.UTILISATEURS])
                acces.push(tuile[TITRES.DEPARTEMENTS])
                acces.push(tuile[TITRES.PAIES])
                // acces.push(tuile['Paies'])
                break
            }
            // case TYPE_UTILISATEUR.ADMINISTRATEUR:{
            //     acces.push(tuile[TITRES.EMPLOYES])
            //     acces.push(tuile[TITRES.HORAIRE_PERSO])
            //     acces.push(tuile['Horaire'])
            //     acces.push(tuile['Punch'])
            //     acces.push(tuile['Dépenses'])
            //     acces.push(tuile['Planchers'])
            //     acces.push(tuile['Disponibilité'])
            //     acces.push(tuile['Utilisateurs'])
            //     acces.push(tuile['Départements'])
            //     acces.push(tuile['Paies'])
            //     break
            // }
        }
        return acces;
        //option dans index [{text:,nombreAlerte:0,url:#},,]
    }
    
}
module.exports = Utilisateur;