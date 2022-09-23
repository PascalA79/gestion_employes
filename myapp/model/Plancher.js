class Plancher{
    static #DAL
    static connect(DAL){
        Plancher.#DAL=DAL;
    }
    constructor(connectionMySQL){
        this.#connectionMySQL=connectionMySQL
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
