var express = require('express');
var router = express.Router();
var Session=require('../class/Session')
var Redirect=require('../class/Redirect')
const { BuildPlancherTableData } = require('../class/Utilities/TableDataBuilder');
const DateUtilities = require('../class/Utilities/DateUtilities');
const fs = require('fs');
var Utilisateur = require('../model/Utilisateur')
const querystring = require('querystring');
const Plancher = require('../model/Plancher');
const DAL = require('../class/DAL');
/* GET home page. */
var session=new Session(router);
  const idPlancher = 1;

  const conditRedirect = (userId) =>{
    if (!userId || userId < 0) return false;
    return Utilisateur.isSupervisorOfFloor(idPlancher, userId) || Utilisateur.isDirector(userId) || Utilisateur.isAdmin(userId)
  }
  router.use('/', async function(req, res, next) {
    session.start(req);
    let redirect= new Redirect(session,res);
    let acces= await  redirect.access('user',async (userId)=>{
      const DAL_PASCAL=new DAL()
      Utilisateur.connect(DAL_PASCAL)
      let user=await Utilisateur.getUserByAlias(userId)
      let isAdmin=user.isAdministrateur();
      let isDirecteur=user.isDirecteur();
      let isSuperviseur=user.isSuperviseur();
      let resultat=isAdmin || isDirecteur || isSuperviseur
      return !resultat}
    ,'./index')
    if(acces){
      next();
    }
  })
router.get(['/','/index'], async function(req, res, next) {
  session.start(req);
    Plancher.connect(new DAL());
    const currentUser = session.get('fullUser');
    const planchers = await Plancher.getPlanchersBySuperviseur(currentUser.id);

    const data = GetData(null, null);
    data.date = DateUtilities.objToDateString(data.jour);
    data.datePrev = DateUtilities.objToDateString(DateUtilities.deltaDaysObj(data.jour, -1));
    data.dateNext = DateUtilities.objToDateString(DateUtilities.deltaDaysObj(data.jour, 1));
    const tableData = BuildTableData(data, null);
    res.render('horaire-plancher', {data:data, tableData:tableData, user:{alias:session.get('user')}, alerts:{}});
  })

function BuildTableData(data, date){
  // En cours (PCL)
  const day = DateUtilities.getDateObj({year: 2022, month: 9, day: 25});
  return BuildPlancherTableData(day, data.users, data.roles);
}

function GetData(idPlancher, date){
  console.log(process.cwd());
  return JSON.parse(fs.readFileSync('./BD/data-users-horaire-plancher.json'));
}
module.exports = router;
