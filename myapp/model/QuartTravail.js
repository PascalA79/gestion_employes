class QuartTravail{
    static #DAL
    static connect(DAL){
        QuartTravail.#DAL=DAL;
    }
    constructor({idQuartTravail,idPlancher,idUtilisateur,idRoleUtilisateur,debut,fin,confirme}){
        this.idQuartTravail=idQuartTravail?idQuartTravail:-1
        this.idPlancher=idPlancher
        this.idUtilisateur=idUtilisateur
        this.idRoleUtilisateur=idRoleUtilisateur
        this.debut=debut
        this.fin=fin
        this.confirme=confirme;
    }
    async add(DAL){
        return await DAL.addQuartTravail({...this})
        //ajoute a la BD
    }

    async update(){
        await DAL.updateQuartTravail({...this})
    }

    async delete(){
        await DAL.removeQuartTravail(this.idQuartTravail)
    }
    static async get(){
        
    }
}
module.exports = QuartTravail;