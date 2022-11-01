class RoleUtilisateur{
    static DAL
    static connect(DAL){
        RoleUtilisateur.DAL=DAL;
    }
    constructor({couleur,idDepartement,idPosteDepenses,idRoleUtilisateur,nomRoleUtilisateur}){
        this.id = idRoleUtilisateur;
        this.couleur = couleur;
        this.nom = nomRoleUtilisateur;
        this.idDepartement = idDepartement;
        this.idPosteDepenses = idPosteDepenses;
    }
    
    static async getAll(){
        const data=await RoleUtilisateur.DAL.getAllRolesUtilisateurs();
        if(!data) return []
        return data.map(quart=>new RoleUtilisateur(quart));
    }
}
module.exports = RoleUtilisateur;