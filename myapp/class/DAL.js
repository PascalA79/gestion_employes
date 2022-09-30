const Utilisateur = require("../model/Utilisateur");
const QuartTravail = require("../model/QuartTravail");
var ConnectionMYSQL = require("./ConnectionMYSQL");
var Utilities = require("./Utilities");

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
    }
    module.exports = DAL;