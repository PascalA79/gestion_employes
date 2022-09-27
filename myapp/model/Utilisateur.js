var DAL = require('../class/DAL');
const TYPE_UTILISATEUR = require('./TYPE_UTILISATEUR');
const TUILES = require("./TUILES").tuiles
// var DAL = require('c:/Users/Pascal/OneDrive/Documents/Session5/projet/gestion_employes/gestion_employes/myapp/class/DAL');
class Utilisateur{
    static #DAL
    static connect(DAL){
        Utilisateur.#DAL=DAL;
    }
    constructor(data){
        this.id=data['id'];
        this.idTypeUtilisateur=data['idTypeUtilisateur'];

        this.idPlancher=data['idPlancher'];
        this.prenom=data['prenom'];
        this.nom=data['nom'];
        this.alias=data['alias'];
        this.telephone=data['telephone'];
        this.courriel=data['courriel'];
        this.actif=data['actif'];
    }
    static async getUserById(id){
        const data=await Utilisateur.#get(id,'idUtilisateur');
        if(!data) return []
        return data.map(user=>new Utilisateur(user));
    }static async getUserByAlias(alias){
        const data=await Utilisateur.#get(alias,'alias');
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
                acces.push(tuile['Horaire'])
                acces.push(tuile['Disponibilité'])
                break
            }
            case TYPE_UTILISATEUR.SUPERVISEUR:{
                acces.push(tuile['Employés'])
                acces.push(tuile['Horaire'])
                acces.push(tuile['Punch'])
                acces.push(tuile['Dépenses'])
                acces.push(tuile['Planchers'])
                break;
            }
            case TYPE_UTILISATEUR.DIRECTEUR:{
                acces.push(tuile['Employés'])
                acces.push(tuile['Horaire'])
                acces.push(tuile['Punch'])
                acces.push(tuile['Dépenses'])
                acces.push(tuile['Planchers'])
                acces.push(tuile['Disponibilité'])
                acces.push(tuile['Utilisateurs'])
                acces.push(tuile['Départements'])
                acces.push(tuile['Paies'])
                break
            }
            case TYPE_UTILISATEUR.ADMINISTRATEUR:{
                acces.push(tuile['Employés'])
                acces.push(tuile['Horaire'])
                acces.push(tuile['Punch'])
                acces.push(tuile['Dépenses'])
                acces.push(tuile['Planchers'])
                acces.push(tuile['Disponibilité'])
                acces.push(tuile['Utilisateurs'])
                acces.push(tuile['Départements'])
                acces.push(tuile['Paies'])
                break
            }
        }
        return acces;
        //option dans index [{text:,nombreAlerte:0,url:#},,]
    }
    
}
module.exports = Utilisateur;