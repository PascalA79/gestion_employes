var DAL = require('../class/DAL');
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
        const tuile=[]
        tuile['Horaire']=[]
        tuile['Horaire']['text']='Horaire';
        tuile['Horaire']['nombreAlerte']=0;
        tuile['Horaire']['url']='#';
        
        tuile['Disponibilité']=[]
        tuile['Disponibilité']['text']='Disponibilité';
        tuile['Disponibilité']['nombreAlerte']=0;
        tuile['Disponibilité']['url']='#';
        
        tuile['Employés']=[]
        tuile['Employés']['text']="Employés";
        tuile['Employés']['nombreAlerte']=0;
        tuile['Employés']['url']='#';
        
        tuile['Dépenses']=[]
        tuile['Dépenses']['text']="Dépenses";
        tuile['Dépenses']['nombreAlerte']=0;
        tuile['Dépenses']['url']='#';
        
        tuile['Planchers']=[]  
        tuile['Planchers']['text']="Planchers";
        tuile['Planchers']['nombreAlerte']=0;
        tuile['Planchers']['url']='/plancher';
        
        tuile['Utilisateurs']=[]  
        tuile['Utilisateurs']['text']="Utilisateurs";
        tuile['Utilisateurs']['nombreAlerte']=0;
        tuile['Utilisateurs']['url']='#';
        
        tuile['Départements']=[]
        tuile['Départements']['text']="Départements";
        tuile['Départements']['nombreAlerte']=0;
        tuile['Départements']['url']='#';
        
        tuile['Paies']=[]
        tuile['Paies']['text']="Paies";
        tuile['Paies']['nombreAlerte']=0;
        tuile['Paies']['url']='#';
        
        tuile['Punch']=[]    
        tuile['Punch']['text']="Punch";
        tuile['Punch']['nombreAlerte']=0;
        tuile['Punch']['url']='#';
        
        switch (this.idTypeUtilisateur){
            case exports.TYPE_UTILISATEUR.NULL: {
                break
            }
            case exports.TYPE_UTILISATEUR.EMPLOYÉ:{
                acces.push(tuile['Horaire'])
                acces.push(tuile['Disponibilité'])
                break
            }
            case exports.TYPE_UTILISATEUR.SUPERVISEUR:{
                acces.push(tuile['Employés'])
                acces.push(tuile['Horaire'])
                acces.push(tuile['Punch'])
                acces.push(tuile['Dépenses'])
                acces.push(tuile['Planchers'])
                break;
            }
            case exports.TYPE_UTILISATEUR.DIRECTEUR:{
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
            case exports.TYPE_UTILISATEUR.ADMINISTRATEUR:{
                acces.push(tuile['ListEmpoyés'])
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

module.exports.TYPE_UTILISATEUR={
    EMPLOYÉ:0,
    SUPERVISEUR:1,
    DIRECTEUR:2,
    ADMINISTRATEUR:3,
    NULL:-1
}