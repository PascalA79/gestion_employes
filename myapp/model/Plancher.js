class Plancher{
    static #DAL
    static connect(DAL){
        Plancher.#DAL=DAL;
    }
    constructor(idUtilisateur,idPlancher){
        this.idUtilisateur=idUtilisateur
        this.idPlancher=idPlancher
    }
    static async getSuperviseurByPlancher(idPlancher){
        
    }
    static async getPlancherBySuperviseur(idUtilisateur){

    }
    static async get(id,date_debut, date_fin){
        const sqlSuperviseur='';

        const sqlUsers="";

        // entre les dates
        const sqlRequis='';
        const sqlQuartsTravail='';
    }

}
module.exports = Plancher;
