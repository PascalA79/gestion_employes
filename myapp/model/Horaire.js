const DAL = require("../class/DAL");


class Horaire{
    static #DAL
    static connect(DAL){
        Horaire.#DAL=DAL;
    }
    constructor(data){
    }
    static async gethoraire(idUtilisateur,debut,fin){
        if(!Horaire.#DAL)Horaire.connect(new DAL())
        await Horaire.#DAL.getHoraire((idUtilisateur,debut,fin))
    }


    // afficher:
    // date fin/debut
    // utilisateur{
    // disponibilite []=>[]
    // demande conger []=>[]
    // quart de travail []
    // punch pour la periode []}

    //static getHorairePlancher(idPlancher,debut,fin)=>[utilisateur:horaire]
}
module.exports = Horaire
