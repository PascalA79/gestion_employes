const Utilisateur = require("../model/Utilisateur");
const QuartTravail = require("../model/QuartTravail");
var ConnectionMYSQL = require("./ConnectionMYSQL");
var Utilities = require("./Utilities");
const config = require("config");
const DateUtilities = require("./Utilities/DateUtilities");

class DAL{
    #connectionMYSQL
    constructor(host=undefined,user=undefined,password=undefined,database=undefined){
        this.#connectionMYSQL=new ConnectionMYSQL({
            // host: host?host:"173.176.94.124",
            // user: user?user:"projet",
            // password: password?password:"qwerty12345",
            // database :database?database:"projet"
            host: host?host:config.get("dbserver.host"),
            user: user?user:config.get("dbserver.user"),
            password: password?password:config.get("dbserver.password"),
            database :database?database:config.get("dbserver.database")
        });
    }
    end(){
        this.#connectionMYSQL.end()
    }
    async checkPassword(username,password){
        return await this.#connectionMYSQL.excecuteSync(`SELECT CheckPassword('${username}', '${password}') AS value`)
    }
    async checkValidQuart(idQuartTravail,idUtilisateur,debutQuart,finQuart){
        return await this.#connectionMYSQL.excecuteSync(`SELECT IsValidQuart(${parseInt(idQuartTravail)}, ${parseInt(idUtilisateur)}, 
        '${debutQuart}','${finQuart}') AS value`)
    }
    async getUsers(value=null, champs=null,equation='='){
        const sqlUser=`SELECT idUtilisateur as id,
        idTypeUtilisateur,
        idPlancher,
        prenomUtilisateur as prenom, 
        nomUtilisateur as nom,
        alias,
        age,
        telephone,
        courriel,
        actif FROM Utilisateurs${value?` WHERE ${champs} ${equation}'${value}'`:''}`;
        let users= await this.#connectionMYSQL.excecuteSync(sqlUser);
        return users.map(user=>new Utilisateur(Utilities.getArray(user)))
    }
    async getHoraire(idUtilisateur,debut=undefined,fin=undefined){
        const sqlHoraire=`SELECT idQuartTravail,
        idPlancher,
        idUtilisateur,
        idRoleUtilisateur,
        debut,
        fin,
        confirme 
            FROM QuartsTravail WHERE idUtilisateur='${idUtilisateur}' ${debut?`AND debut>='${debut}'`:''} ${debut?`AND fin<='${fin}'`:''}`;
            let quartsTravail= await this.#connectionMYSQL.excecuteSync(sqlHoraire);
            return Utilities.getArray(quartsTravail).map(quart=>new QuartTravail(Utilities.getArray(quart)))
    }
    async getHoraires(idPlancher,debut,fin){
        const sqlHoraire=`SELECT idQuartTravail,
        idPlancher,
        idUtilisateur,
        idRoleUtilisateur,
        debut,
        fin,
        confirme 
        FROM QuartsTravail WHERE idPlancher='${idPlancher}' AND debut>='${debut}' AND fin<='${fin}'`;
        let quartsTravail= await this.#connectionMYSQL.excecuteSync(sqlHoraire);
        return quartsTravail.map(quart=>new QuartTravail(Utilities.getArray(quart)))
    }

    async addQuartTravail({idPlancher,idUtilisateur,idRoleUtilisateur,debut,fin,confirme}){
        let quart=await this.#connectionMYSQL.excecuteSync(`Call AddQuartTravail('${idPlancher}','${idUtilisateur}','${idRoleUtilisateur}','${debut}','${fin}',${confirme})`);
        return Utilities.getArray(quart[0][0]);
    }
    async updateQuartTravail({idQuartTravail,idPlancher,idUtilisateur,idRoleUtilisateur,debut,fin,confirme}){
        let quart=await this.#connectionMYSQL.excecuteSync(`Call UpdateQuartTravail(${idQuartTravail},${idPlancher},${idUtilisateur},${idRoleUtilisateur},'${debut}','${fin}',${confirme})`)
        return quart.affectedRows;
    }
    async removeQuartTravail(idQuartTravail){
        await this.#connectionMYSQL.excecuteSync(`Call RemoveQuartTravail('${idQuartTravail}')`)
    }

    async addUtilisateur({id,idTypeUtilisateur,idPlancher,prenom,nom,alias,telephone,courriel,actif}){
        let utilisateur=await this.#connectionMYSQL.excecuteSync(
            `Call AddUtilisateur('${id}','${idTypeUtilisateur}','${idPlancher}','${prenom}','${nom}','${alias}','${telephone}','${courriel}','${actif}}')`)
        return Utilities.getArray(utilisateur[0][0]);
    }
    async updateUtilisateur({id,idTypeUtilisateur,idPlancher,prenom,nom,alias,telephone,courriel,actif}){
        let utilisateur=await this.#connectionMYSQL.excecuteSync(`Call UpdateUtilisateur('${id}','${idTypeUtilisateur}','${idPlancher}','${prenom}','${nom}','${alias}','${telephone}','${courriel}','${actif}}')`)
        return Utilities.getArray(utilisateur[0][0]);
    }
    async removeUtilisateur(id){
        await this.#connectionMYSQL.excecuteSync(`Call RemoveUtilisateur('${id}')`)
    }
    
    async getQuartsByUser(idUtilisateur,debut, fin){
        return Utilities.getArray((await this.#connectionMYSQL.excecuteSync(`Call GetQuartsByUser('${idUtilisateur}','${debut.toLocaleDateString()}','${fin.toLocaleDateString()}')`))[0])
        .map(x=>Utilities.getArray(x))
    }
    async getQuartsByPlancher(idPlancher, date){
        let dateDebut=new Date(date);
        let dateFin=new Date(dateDebut);
        dateFin.setDate(dateFin.getDate() + 1);
        return Utilities.getArray((await this.#connectionMYSQL.excecuteSync(`Call GetQuartsByPlancher('${idPlancher}','${dateDebut.toLocaleDateString()}','${dateFin.toLocaleDateString()}')`))[0])
        .map(x=>Utilities.getArray(x))
    }
    async getAllRolesUtilisateurs(){
        return Utilities.getArray((await this.#connectionMYSQL.excecuteSync(`CALL GetAllRoles();`))[0])
        .map(x=>Utilities.getArray(x))
    }
    async getPlanchersBySuperviseur(idUtilisateur){
        return Utilities.getArray((await this.#connectionMYSQL.excecuteSync(`CALL GetPlanchersBySuperviseur('${idUtilisateur}');`))[0]).map(x => Utilities.getArray(x));
    }
    async getAllPlanchers(){
        return Utilities.getArray((await this.#connectionMYSQL.excecuteSync(`CALL GetAllPlanchers();`))[0]).map(x => Utilities.getArray(x));
    }
    async getSuperviseurOfPlancher(idPlancher){
        return Utilities.getArray((await this.#connectionMYSQL.excecuteSync(`CALL getSuperviseurOfPlancher('${idPlancher}');`))[0]).map(x => Utilities.getArray(x));
    }
    async getListEmployes({id}){
        return Utilities.getArray((await this.#connectionMYSQL.excecuteSync(`CALL GetListEmployes('${id}');`))[0]).map(x => Utilities.getArray(x));

    }
    
}
module.exports = DAL;