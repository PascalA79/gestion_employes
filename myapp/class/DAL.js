const Utilisateur = require("../model/Utilisateur");
const QuartTravail = require("../model/QuartTravail");
var ConnectionMYSQL = require("./ConnectionMYSQL");
var Utilities = require("./Utilities")

class DAL{
    #connectionMYSQL
    constructor(host=undefined,user=undefined,password=undefined,database=undefined){
        this.#connectionMYSQL=new ConnectionMYSQL({
            host: host?host:"173.176.94.124",
            user: user?user:"projet",
            password: password?password:"qwerty12345",
            database :database?database:"projet"
        });
    }
    async checkPassword(username,password){
        return await this.#connectionMYSQL.excecuteSync(`SELECT CheckPassword('${username}', '${password}') AS value`)
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
            let idQuart=await this.#connectionMYSQL.excecuteSync(`Call AddQuartTravail('${idPlancher}','${idUtilisateur}','${idRoleUtilisateur}','${debut}','${fin}','${confirme}')`)
            return idQuart[0][0].id;
        }
        async updateQuartTravail({idQuartTravail,idPlancher,idUtilisateur,idRoleUtilisateur,debut,fin,confirme}){
            await this.#connectionMYSQL.excecuteSync(`Call UpdateQuartTravail('${idQuartTravail}','${idPlancher}','${idUtilisateur}','${idRoleUtilisateur}','${debut}','${fin}','${confirme}')`)
        }
        async removeQuartTravail(idQuartTravail){
            await this.#connectionMYSQL.excecuteSync(`Call RemoveQuartTravail('${idQuartTravail}')`)
        }
    }
    module.exports = DAL;