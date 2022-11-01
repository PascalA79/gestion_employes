const fs=require('fs')
class Fichier{
    static async get_ls(path){
        let promiseResult= new Promise((resolve, reject)=>
        {
            fs.readdir(path,(error,files)=>{
            if(error)
                reject(error);
            
            resolve(files)
        })
        })
        return promiseResult;
    }
}
module.exports = Fichier;