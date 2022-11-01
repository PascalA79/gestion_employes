const DAL = require("../class/DAL");
const QuartTravail = require("./QuartTravail");


class Horaire{
    static DAL
    static connect(DAL){
        Horaire.DAL=DAL;
    }
    array_quartsTravail
    constructor(array_quartsTravail){
        this.array_quartsTravail=array_quartsTravail
    }
    get(){
        return this.array_quartsTravail;
    }
    add(idPlancher,idUtilisateur,idRoleUtilisateur,debut,fin,confirme){
        Horaire.DAL.addQuartTravail(idPlancher,idUtilisateur,idRoleUtilisateur,debut,fin,confirme)
        this.array_quartsTravail.push(new QuartsTravail(idq))
    }
    set(){}
    static async gethoraire(idUtilisateur,debut,fin){
        return new Horaire(await Horaire.DAL.getHoraire(idUtilisateur,debut,fin))
    }
    // retourne un tableau qui a la clé idUtilisateur qui contient un tableau de QuartsTravail
    static async getPlancher(idPlancher,debut,fin){
        let plancher=[];
        let horaires=await this.DAL.getHoraires(idPlancher,debut,fin);
        let quarts=[];
        horaires.forEach(quart=>{
            if(!quarts[quart.idUtilisateur])quarts[quart.idUtilisateur]=[]
            quarts[quart.idUtilisateur].push(new QuartTravail(quart))
        })
        plancher['quartsTravail']=quarts
        plancher['disponibilites']=[]
        plancher['demandeCongers']=[]
        plancher['punchs']=[]
        return plancher;
    }

    // afficher(date fin/debut)
    // utilisateur{
    // disponibilite []=>[]
    // demande conger []=>[]
    // quart de travail []
    // punch pour la periode []}

    //static getHorairePlancher(idPlancher,debut,fin)=>[utilisateur:horaire]
}
module.exports = Horaire
