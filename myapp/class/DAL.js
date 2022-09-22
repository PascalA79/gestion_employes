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
        return users.map(user=>Utilities.getArray(user))
    }
}
module.exports = DAL