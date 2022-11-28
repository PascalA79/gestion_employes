var express = require('express');
var router = express.Router();
var Session=require('../class/Session')
var Redirect=require('../class/Redirect');
var DAL = require('../class/DAL');
const Utilisateur = require('../model/Utilisateur');
const BuildUserTableData = require('../class/Utilities/UserTableBuilder').BuildUserTableData;
const DateUtilities = require('../class/Utilities/DateUtilities');
const QuartTravail = require('../model/QuartTravail');
const RoleUtilisateur = require('../model/RoleUtilisateur');
const Plancher = require('../model/Plancher');

/* GET home page. */
var session=new Session(router);
router.use('/', async function(req, res, next) {
  session.start(req);
  let redirect= new Redirect(session,res);
  let acces= await  redirect.access('user',async (userId)=>{
    const DAL_PASCAL=new DAL()
    Utilisateur.connect(DAL_PASCAL)
    let user=await Utilisateur.getUserByAlias(userId)
    let idQueryString=parseInt(req.query.id);/* user.id==id QueryString */
    let isAdmin=user.isAdministrateur();
    let isDirecteur=user.isDirecteur();
    let isSuperviseurOfUtilisateur=await user.isSuperviseurOfUtilisateur(idQueryString);
    let resultat= isNaN(idQueryString) || idQueryString ==user.id || isAdmin || isDirecteur || isSuperviseurOfUtilisateur;
    // let resultat=idQueryString ==user.id || user.id || isAdmin || isDirecteur || isSuperviseurOfUtilisateur
    DAL_PASCAL.end()
    return !resultat}
  ,'./index')
  if(acces){
    next();
  }
})
  router.get(['/'], async function(req, res, next) {
    session.start(req);
    const user = new Utilisateur(session.get('fullUser'));
    let date;
    try
    {
      date = req.query.date ? DateUtilities.parseDate(req.query.date) : new Date();
    }
    catch(error)
    {
      date = new Date()
    }
    const id = req.query.id && !isNaN(parseInt(req.query.id)) ? parseInt(req.query.id) : user.id;
    const start = DateUtilities.getWeekDay(date, 0);
    const end = DateUtilities.getWeekDay(date, 7);
    const data = await GetData(id, start, end);
    // user:{alias:session.get('user')},
    res.render('horaire-perso',
    {
      user:{alias:session.get('user')},
      alerts:{}, 
      data:data, 
      start:DateUtilities.dateToDateString(start), 
      end:DateUtilities.dateToDateString(DateUtilities.deltaDaysDate(end, -1)),
      prev: DateUtilities.dateToDateString(DateUtilities.deltaDaysDate(start, -7)),
      next: DateUtilities.dateToDateString(DateUtilities.deltaDaysDate(start, 7)),
      id: user.id});
    // res.render('horaire-perso',
    // {
    //   user:{alias:session.get('user')},
    //   alerts:{}, 
    //   data:data, 
    //   start:DateUtilities.dateToDateString(start), 
    //   end:DateUtilities.dateToDateString(DateUtilities.deltaDaysDate(end, -1)),
    //   prev: DateUtilities.dateToDateString(DateUtilities.deltaDaysDate(start, -7)),
    //   next: DateUtilities.dateToDateString(DateUtilities.deltaDaysDate(start, 7)),
    //   id: user.id,
    //   quarts: null,
    //   planchers: null,
    //   user: null,
    //   roles: null,
    //   dates: [],
    // });
  })


async function GetData(userId, debut, fin){
  const myDAL = new DAL();
  RoleUtilisateur.connect(myDAL);
  const roles = await RoleUtilisateur.getAll();
  QuartTravail.connect(myDAL);
  const quarts = await QuartTravail.getByUserDate(userId, debut, fin);
  Plancher.connect(myDAL);
  const planchers = await Plancher.getAllPlanchers();
  // const quarts = await QuartTravail.getByUser(userId, debut, fin);
  myDAL.end()
  return BuildUserTableData(roles, planchers, quarts, debut, fin);
} 

module.exports = router;
