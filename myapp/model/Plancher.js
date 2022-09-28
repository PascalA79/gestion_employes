class Plancher{
    static #DAL
    static connect(DAL){
        Plancher.#DAL=DAL;
    }
    constructor(data){
        this.id = data['idPlancher'];
        this.nom = data['nomPlancher'];
    }
    static async get(id,date_debut, date_fin){
        const sqlSuperviseur='';

        const sqlUsers="";

        // entre les dates
        const sqlRequis='';
        const sqlQuartsTravail='';
    }


    static async getPlanchersBySuperviseur(userId){
        const data = await Plancher.#DAL.getPlanchersBySuperviseur(userId);
        return !data ? [] : data.map(p => new Plancher(p));
    }

}
module.exports = Plancher;
