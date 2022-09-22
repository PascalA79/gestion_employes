
// plage horaire
// 30 minutes spesifique

const Utilisateur = require("./Utilisateur")
class Horaire{
    static #DAL
    static connect(DAL){
        Horaire.#DAL=DAL;
    }
constructor({idQuartTravail,idPlancher,idUtilisateur,idRoleUtilisateur,debut,fin,confirme}){
    this.idQuartTravail=idQuartTravail
    this.idPlancher=idPlancher
    this.idUtilisateur=idUtilisateur
    this.idRoleUtilisateur=idRoleUtilisateur
    this.debut=debut
    this.fin=fin
    this.confirme=confirme
}
// afficher:
// date fin/debut
// utilisateur{
// disponibilite []=>[]
// demande conger []=>[]
// quart de travail []
// punch pour la periode []}

gethoraire(idUtilisateur,debut,fin)=>Horaire
getHorairePlancher(idPlancher,debut,fin)=>[utilisateur:horaire]
}
