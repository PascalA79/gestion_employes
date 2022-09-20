var express = require('express');
var router = express.Router();
var Session=require('../class/Session');
var ConnectionMYSQL=require('../class/ConnectionMYSQL');
const connectionMySQL= new ConnectionMYSQL({
  host: "173.176.94.124",
  user: "projet",
  password: "qwerty12345",
  database :"projet"
})
var session=new Session(router);
/*connectionMySQL.excecute('SELECT * FROM Utilisateurs',(error,results,fields)=>{
  console.log(error)
  console.log(results);
  console.log(fields);
})*/
/* GET id listing. */
//router.get('/', (req, res, next)=>res.send('respond with a resource'));
router.get('/*', appelApi);
async function appelApi(req, res, next){
//TODO droit d'accès avec la session
  let arrayPath=req.baseUrl.split('/')
  console.log(Object.values(arrayPath))
  console.log(Object.values(arrayPath[1]))
  if(Object.values(arrayPath).length==4){
    let champs=arrayPath[2].toLowerCase()
    let action=arrayPath[3].toLowerCase()
    console.log(champs,action)
    console.log(req.query)
   let results=await connectionMySQL.excecuteSync('SELECT * FROM Utilisateurs');
   console.log(results)
  }
  res.send('respond with a resource');
}

module.exports = router;
