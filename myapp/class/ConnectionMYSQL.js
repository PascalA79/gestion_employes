// Classe qui permet de faciliter l'accès à la base de donnée
// https://www.npmjs.com/package/mysql
var mysql=require('mysql');
class ConnectionMYSQL{
    constructor({host,user,password,database}){
        this.connectionMySQL = mysql.createConnection({
            host: host,
            user: user,
            password: password,
            database :database
          });}
    excecute(query,fonction_error_results_fields){
        this.connectionMySQL.connect();
        this.connectionMySQL.query(query, fonction_error_results_fields)
        this.connectionMySQL.end();
    }
    async excecuteSync(query){
        let promiseResult= new Promise((resolve, reject)=>this.excecute(query,(error,results)=>{
            if(error) reject(error);
            resolve(results)
        }))
        return promiseResult;
    }
}
module.exports = ConnectionMYSQL;
