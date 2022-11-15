// Classe qui permet de faciliter l'accès à la base de donnée
// https://www.npmjs.com/package/mysql
var mysql=require('mysql');
class ConnectionMYSQL{
    constructor({host,user,password,database}){
        this.connectionMySQL = mysql.createConnection({
            host: host,
            user: user,
            password: password,
            database :database,
            
          });
          this.connect()
          this.listQuery=[]
        }
    #excecute(query,fonction_error_results_fields){
        this.connectionMySQL.query(query,(error,results,fields)=>{
            /*this.connectionMySQL.connect(()=>*/fonction_error_results_fields(error,results,fields);
            //this.connectionMySQL.end();
        })

    }
//     async #runQuery(){
//         if(this.listQuery.length===1)
//         {
//             let promiseResult= await new Promise((resolve, reject)=>this.#excecute(this.listQuery.pop(),(error,results)=>{
//             if(error)
//             reject(error);
//             resolve(results)
//         }))
//         await promiseResult
//         return promiseResult;
//     }
// }
    connect(){
        this.connectionMySQL.connect()
    }
    end(){
        this.connectionMySQL.end()
    }
    async excecuteSync(query){
        this.listQuery.push(query)
        let promiseResult= await new Promise((resolve, reject)=>this.#excecute(query,(error,results)=>{
            if (error) reject(error);
            resolve(results)
        }))
        await promiseResult
        return promiseResult;
    }
    // end(){
    //     this.connectionMySQL.destroy();
    // }
}
module.exports = ConnectionMYSQL;
