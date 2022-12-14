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
        this.confirme=confirme?1:0;
    }
    async add(){
        return await QuartTravail.#DAL.addQuartTravail({...this})
        //ajoute a la BD
    }
    
    async update(){
        return await QuartTravail.#DAL.updateQuartTravail({...this})
    }
    
    async delete(){
        await QuartTravail.#DAL.removeQuartTravail(this.idQuartTravail)
    }

    static async delete(idQuartTravail){
        await QuartTravail.#DAL.removeQuartTravail(idQuartTravail)
    }
    
    static async validateQuart({idQuartTravail,idUtilisateur,debut,fin}){
        return QuartTravail.#DAL.checkValidQuart(idQuartTravail,idUtilisateur,debut,fin)
    }
    static async getByUser(idUtilisateur,debut, fin){
        const data=await QuartTravail.#DAL.getQuartsByUser(idUtilisateur, debut, fin);
        if(!data) return []
        return data.map(quart=>new QuartTravail(quart));
    }

    static async getByUserDate(idUtilisateur, debut, fin){
        return this.getByUser(idUtilisateur, debut.getTime(), fin.getTime())
    }
    
    static async getByPlancher(idPlancher,date){
        return await QuartTravail.#DAL.getQuartsByPlancher(idPlancher,date)
    }
}
module.exports = QuartTravail;