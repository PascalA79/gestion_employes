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
          });
          this.connectionMySQL.connect()
        }
    excecute(query,fonction_error_results_fields){
        this.connectionMySQL.query(query, fonction_error_results_fields)
    }
    async excecuteSync(query){
        let promiseResult= new Promise((resolve, reject)=>this.excecute(query,(error,results)=>{
            if(error)
            reject(error);
            resolve(results)
        }))
        return await promiseResult;
    }
    end(){
        this.connectionMySQL.destroy();
    }
}
module.exports = ConnectionMYSQL;
