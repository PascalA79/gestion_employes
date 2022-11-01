var DAL = require('../class/DAL');
const TYPE_UTILISATEUR = require('./TYPE_UTILISATEUR');
const {TUILES, TITRES} = require("./TUILES");
const Utilities = require('../class/Utilities');
// var DAL = require('c:/Users/Pascal/OneDrive/Documents/Session5/projet/gestion_employes/gestion_employes/myapp/class/DAL');
class Utilisateur{
    static #DAL
    static connect(DAL){
        Utilisateur.#DAL=DAL;
    }
    constructor({id,idTypeUtilisateur,idPlancher,prenom,nom,alias,telephone,courriel,actif}){
        this.id=id?id:-1;
        this.idTypeUtilisateur=idTypeUtilisateur;
        this.idPlancher=idPlancher;
        this.prenom=prenom;
        this.nom=nom;
        this.alias=alias;
        this.telephone=telephone;
        this.courriel=courriel;
        this.actif=actif?actif:1;
    }
    async add(){
        return await Utilisateur.#DAL.addUtilisateur({...this})
    }

    async update(){
        return await Utilisateur.#DAL.updateUtilisateur({...this})
    }

    async delete(){
        await QuartTravail.#DAL.removeUtilisateur(this.id)
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