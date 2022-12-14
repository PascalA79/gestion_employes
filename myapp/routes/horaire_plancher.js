var express = require('express');
var router = express.Router();
var Session=require('../class/Session')
var Redirect=require('../class/Redirect')
const { BuildPlancherTableData } = require('../class/Utilities/PlancherTableDataBuilder');
const Utilities=require('../class/Utilities');
const DateUtilities = require('../class/Utilities/DateUtilities');
const fs = require('fs');
var Utilisateur = require('../model/Utilisateur')
const querystring = require('querystring');
const Plancher = require('../model/Plancher');
const DAL = require('../class/DAL');
const QuartTravail = require('../model/QuartTravail');
const RoleUtilisateur = require('../model/RoleUtilisateur');
const ValidateurHoraire = require('../public/scripts/horaire/ValidateurHoraire');
const { validateHeaderName } = require('http');

/* GET home page. */
var session=new Session(router);
router.use('/', async function(req, res, next) {
  session.start(req);
  let redirect= new Redirect(session,res);
  let acces= await  redirect.access('user',async (userId)=>{
      if(!userId) return false;
      const DAL_PASCAL=new DAL();
      const query = req.query;
      Utilisateur.connect(DAL_PASCAL);
      let user=await Utilisateur.getUserByAlias(userId);
      let isAdmin=user.isAdministrateur();
      let isDirecteur=user.isDirecteur();
      let isSuperviseur= !!query.id ? await user.isSuperviseurOfPlancher(query.id) : user.isSuperviseur();
      let resultat=isAdmin || isDirecteur || isSuperviseur;
      DAL_PASCAL.end();
      return !resultat;
    },'./index');
  if(acces){
    next();
  }
});

router.get(['/','/index'], async function(req, res, next) {
  session.start(req);
  const DAL_PASCAL=new DAL()
  Plancher.connect(DAL_PASCAL);
  RoleUtilisateur.connect(DAL_PASCAL);
  QuartTravail.connect(DAL_PASCAL);
  Utilisateur.connect(DAL_PASCAL);
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
  const editShiftData = GetEmptyEditData(req); // await GetEditData(req);
  DAL_PASCAL.end()
  const maUrl = Utilities.getURL(req)
  data.url = maUrl;
  res.render('horaire-plancher', {data:data, tableData:tableData, editShiftData: editShiftData, user:{alias:session.get('user')}, alerts:{}});
})


router.post(['/', '/index'], async function(req, res, next){
  session.start(req);
  const DAL_PASCAL=new DAL()
  Plancher.connect(DAL_PASCAL);
  RoleUtilisateur.connect(DAL_PASCAL);
  QuartTravail.connect(DAL_PASCAL);
  Utilisateur.connect(DAL_PASCAL);
  const editShiftData = await GetEditData(req, true);
  console.log(editShiftData);
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
  const maUrl = Utilities.getURL(req)
  data.url = maUrl;
  res.render('horaire-plancher', {data:data, tableData:tableData, editShiftData: editShiftData, user:{alias:session.get('user')}, alerts:{}});
})


router.delete(['/', '/index'], async function(req, res){
  console.log("DELETE");
  console.log(req);
  session.start(req);
  let success = false;
  const DAL_PASCAL=new DAL()
  QuartTravail.connect(DAL_PASCAL);
  try{
    const idQuartTravail = req.body.idQuartTravail;
    QuartTravail.delete(idQuartTravail);
    success = true;
  }catch(error){
    console.log(error);
  }
  DAL_PASCAL.end()
  if(success){
    res.send({success:success, msg:ValidateurHoraire.CONFIRM_TEXTS[ValidateurHoraire.CONFIRM_CODES.CONFIRMDELETE]});
  }else{
    res.send({success:success, msg:"Un probl??me est survenu"});
  }
});

function qsToString(qs){
  let t = [];
  for(key in qs)
    t.push(`${key}=${qs[key]}`);
  return t.join("&");
}

async function GetEditData(req, doSomething = false){
  const workShift = new QuartTravail({...req.body, debut:Date.parse(req.body.debut), fin:Date.parse(req.body.fin)});
  let success = false;
  let confirmationMsg;
  const shiftErrors = await ValidateWorkShift(workShift);
  if (doSomething && shiftErrors.errorEnd == "" && shiftErrors.errorStart == "" && shiftErrors.errorRole == ""){
    let result = null;
    if(workShift.idQuartTravail == -1){
      result = await workShift.add();
      confirmationMsg = ValidateurHoraire.CONFIRM_TEXTS[ValidateurHoraire.CONFIRM_CODES.CONFIRMADD];
      if(result){
        workShift.idQuartTravail = result.idQuartTravail;
        success = true;
      }
    }else{
      result = await workShift.update();
      confirmationMsg = ValidateurHoraire.CONFIRM_TEXTS[ValidateurHoraire.CONFIRM_CODES.CONFIRMEDIT];
      if(result) success = true;
    }
  } 
  const shiftData = {
    workShift: workShift,
    dataRole: 0,
    id: workShift.idQuartTravail,
    user: await Utilisateur.getUserById(workShift.idUtilisateur),
  }
  const showModal = true;
  const editShiftData = {
    showModal: showModal,
    shiftErrors: shiftErrors,
    shiftData: shiftData,
    msg: success ? confirmationMsg : "",
  };
  editShiftData.qs = qsToString(req.query);
  return editShiftData;
}



function GetEmptyEditData(req){
  const workShift = new QuartTravail(req.body);
  const shiftErrors = {
    errorStart: "",
    errorEnd: "",
    errorRole: ""
  };
  const shiftData = {
    workShift: workShift,
    dataRole: 0,
    id: workShift.idQuartTravail,
  }
  const showModal = false;
  const editShiftData = {
    showModal: showModal,
    shiftErrors: shiftErrors,
    shiftData: shiftData
  }
  editShiftData.qs = qsToString(req.query);
  return editShiftData;
}

async function ValidateWorkShift(workShift){
  const shiftErrors = {};
  shiftErrors.errorStart = ValidateurHoraire.getStartDateValidationText(workShift.debut);
  shiftErrors.errorEnd = ValidateurHoraire.getEndDateValidationText(workShift.debut, workShift.fin);
  const allRoles = await RoleUtilisateur.getAll();
  const currentRole = allRoles.find((r) => r.id = workShift.idRoleUtilisateur);
  shiftErrors.errorRole = ValidateurHoraire.getRoleValidationText(currentRole);
  if(shiftErrors.errorStart == "" && shiftErrors.errorEnd == ""){
    const ws = {...workShift};
    // const ws = {...workShift, debut: workShift.debut.replace("T", " "), fin: workShift.fin.replace("T", " ")};
    const resultat = await QuartTravail.validateQuart(ws)
    if(resultat[0].value > 0){
      shiftErrors.errorEnd = ValidateurHoraire.ERROR_TEXTS.END[ValidateurHoraire.ERROR_CODES.END.CONFLICT];
    }
  }
  return shiftErrors;
}


function BuildTableData(data, date){
  const day = DateUtilities.getDateObj(date);
  return BuildPlancherTableData(day, data.users, data.roles, data.planchers, data.plancherSelectionne);
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
  data.plancherSelectionne ={id: !idPlancher ? `${data.planchers[0].id}` : idPlancher};
  data.users = await Utilisateur.getUserByPlancher(data.plancherSelectionne.id);
  data.jour = DateUtilities.getObj(debut);


  for(user of data.users){
    let quarts = await QuartTravail.getByUser(user.id, debut.getTime(), fin.getTime());
    user.quarts = quarts
    user.quarts = user.quarts.map(q => {
      return {
        ...q,
        start: DateUtilities.getObj(new Date(q.debut)),
        end: DateUtilities.getObj(new Date(q.fin))
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
