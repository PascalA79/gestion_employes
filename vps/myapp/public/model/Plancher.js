class Plancher{
    static DAL
    static connect(DAL){
        Plancher.DAL=DAL;
    }
    static end(){
        Plancher.DAL.end()
    }
    constructor(idPlancher,nomPlancher){
        this.nom=nomPlancher
        this.id=idPlancher
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


    static async getPlanchersBySuperviseur(userId){
        const data = await Plancher.DAL.getPlanchersBySuperviseur(userId);
        return !data ? [] : data.map(p => new Plancher(p['idPlancher'], p['nomPlancher']));
    }

    static async getAllPlanchers(){
        const data = await Plancher.DAL.getAllPlanchers();
        return !data ? [] : data.map(p => new Plancher(p['idPlancher'], p['nomPlancher']));
    }

}
module.exports = Plancher;
