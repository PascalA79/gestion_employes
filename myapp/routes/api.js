var express = require('express');
var router = express.Router();
// var Utilisateur = require('../model/Utilisateur')
// const Plancher = require('../model/Plancher');
// const DAL = require('../class/DAL');
// const QuartTravail = require('../model/QuartTravail');
// const RoleUtilisateur = require('../model/RoleUtilisateur');
// const ValidateurHoraire = require('../public/scripts/horaire/ValidateurHoraire');

const UsersRouter = require("./API/UtilisateursRouter");
const ShiftsRouter = require("./API/QuartTravailRouter");
router.use("/users", UsersRouter);
router.use("/shifts", ShiftsRouter);


/*
var Session=require('../class/Session');
var ConnectionMYSQL=require('../class/ConnectionMYSQL');
// hide those values
var session=new Session(router);
const connectionMySQL= new ConnectionMYSQL({
  host: "173.176.94.124",
  user: "projet",
  password: "qwerty12345",
  database :"projet"
})

/*connectionMySQL.excecute('SELECT * FROM Utilisateurs',(error,results,fields)=>{
  console.log(error)
  console.log(results);
  console.log(fields);
})*/
/* GET id listing. */
//router.get('/', (req, res, next)=>res.send('respond with a resource'));
/*


router.get('/*', appelApi);

async function appelApi(req, res, next){
  //TODO droit d'accès avec la session


  let arrayPath=req.baseUrl.split('/')
  for(let index=0;index<arrayPath.length;index++)
  {
    if(arrayPath[0]!='api') arrayPath.shift()
    else break
  }
  let results=await connectionMySQL.excecuteSync('SELECT * FROM Utilisateurs');
  console.log(results)
  connectionMySQL.excecute('SELECT * FROM Utilisateurs',(error,r,fiellds)=>console.log(r))
  console.log(Object.values(arrayPath))
  if(Object.values(arrayPath).length==2){
    let champs=arrayPath[1].toLowerCase()
    
    console.log(action,champs)
    console.log(req.query)
  }
  connectionMySQL.end()
  res.send('respond with a resource');
}
*/
module.exports = router;
