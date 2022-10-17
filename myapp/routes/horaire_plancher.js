var express = require('express');
var router = express.Router();
var Session=require('../class/Session')
var Redirect=require('../class/Redirect')
const { BuildPlancherTableData } = require('../class/Utilities/PlancherTableDataBuilder');
const DateUtilities = require('../class/Utilities/DateUtilities');
const fs = require('fs');
var Utilisateur = require('../model/Utilisateur')
const querystring = require('querystring');
const Plancher = require('../model/Plancher');
const DAL = require('../class/DAL');
const QuartTravail = require('../model/QuartTravail');
const RoleUtilisateur = require('../model/RoleUtilisateur');

/* GET home page. */
var session=new Session(router);
  router.use('/', async function(req, res, next) {
    session.start(req);
    let redirect= new Redirect(session,res);
    let acces= await  redirect.access('user',async (userId)=>{
        if(!userId) return false;
        const DAL_PASCAL=new DAL()
        const query = req.query
        console.log(query);
        Utilisateur.connect(DAL_PASCAL)
        let user=await Utilisateur.getUserByAlias(userId)
        let isAdmin=user.isAdministrateur();
        let isDirecteur=user.isDirecteur();
        let isSuperviseur= !!query.id ? await user.isSuperviseurOfPlancher(query.id) : user.isSuperviseur();
        let resultat=isAdmin || isDirecteur || isSuperviseur
        DAL_PASCAL.end()
        return !resultat
      },'./index')
    if(acces){
      next();
    }
  })
router.get(['/','/index'], async function(req, res, next) {
  session.start(req);
  const DAL_PASCAL=new DAL()
    Plancher.connect(DAL_PASCAL);
    let currentUser = session.get('fullUser');
    if(!currentUser) return;
    currentUser = new Utilisateur(currentUser);
    const qs = req.query;
    const data = await GetData(currentUser, qs.id, qs.date);
    data.date = DateUtilities.objToDateString(data.jour);
    data.datePrev = DateUtilities.objToDateString(DateUtilities.deltaDaysObj(data.jour, -1));
    data.dateNext = DateUtilities.objToDateString(DateUtilities.deltaDaysObj(data.jour, 1));
    const tableData = BuildTableData(data, data.jour);
    data.allRoles = await GetAllRoles();
    DAL_PASCAL.end()
    res.render('horaire-plancher', {data:data, tableData:tableData, user:{alias:session.get('user')}, alerts:{}});
  })

function BuildTableData(data, date){
  const day = DateUtilities.getDateObj(date);
  return BuildPlancherTableData(day, data.users, data.roles);
}

async function GetPlanchers(currentUser){
  return currentUser.isSuperviseur() ? 
  await Plancher.getPlanchersBySuperviseur(currentUser.id) : 
  await Plancher.getAllPlanchers();  
}

async function GetData(currentUser, idPlancher, date){
    try {
      date = DateUtilities.parseDate(date);
    } catch (error) {
      date = new Date()
    }


  const debut = DateUtilities.getDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
  const fin = DateUtilities.deltaDaysDate(debut, 1);

  const myDAL = new DAL();
  QuartTravail.connect(myDAL);
  Utilisateur.connect(myDAL)
  const data = {};
  data.planchers = await GetPlanchers(currentUser);
  data.plancherSelectionne ={id: !idPlancher ? data.planchers[0].id : idPlancher};
  data.users = await Utilisateur.getUserByPlancher(data.plancherSelectionne.id);
  data.jour = DateUtilities.getObj(debut);


  for(user of data.users){
    let quarts = await QuartTravail.getByUser(user.id, debut, fin);
    user.quarts = quarts
    user.quarts = user.quarts.map(q => {
      return {
        ...q,
        start: DateUtilities.getObj(q.debut),
        end: DateUtilities.getObj(q.fin)
      }
    });
  }

  RoleUtilisateur.connect(myDAL);
  data.roles = await RoleUtilisateur.getAll();
  myDAL.end()
  return data;
}

async function GetAllRoles(){
  const myDAL = new DAL();
  RoleUtilisateur.connect(myDAL);
  const allRoles = await RoleUtilisateur.getAll();
  myDAL.end();
  return allRoles;
}

module.exports = router;
