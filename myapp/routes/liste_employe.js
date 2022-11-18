var express = require('express');
var router = express.Router();
var Session=require('../class/Session')
var Redirect=require('../class/Redirect')
var DAL = require('../class/DAL');
const Utilisateur = require('../model/Utilisateur');
const Utilities = require('../class/Utilities');
var session=new Session(router);
router.use('/', async function(req, res, next) {
  session.start(req);
  let redirect= new Redirect(session,res);
  let acces= await  redirect.access('user',async (alias)=>{
    const myDAL=new DAL()
    Utilisateur.connect(myDAL)
    let user=await Utilisateur.getUserByAlias(alias)
    let isAdmin=user.isAdministrateur();
    let isDirecteur=user.isDirecteur();
    let isSuperviseur=user.isSuperviseur();
    let resultat = isAdmin || isDirecteur || isSuperviseur;
    // let resultat=idQueryString ==user.id || user.id || isAdmin || isDirecteur || isSuperviseurOfUtilisateur
    myDAL.end()
    return !resultat}
  ,'./index')
  if(acces){
    next();
  }
  })
  router.get('/', async function(req, res, next) {
    session.start(req);
    // let myDAL=new DAL();
    // Utilisateur.connect(myDAL)
    // let user=await Utilisateur.getUserByAlias(session.get('user'))
    // let listEmployes=await user.getListEmployes();
    // myDAL.end();
    // listEmployes=[...listEmployes,...listEmployes,...listEmployes,...listEmployes]
    // let listeJSONObject=(Utilities.assiativeArrayToDict(listEmployes));
    // res.render('liste-employe',{user:{alias:session.get('user')},alerts:{},employes:listeJSONObject});listeJSONObject

    const myDAL=new DAL();
    //let AllAlias=await myDAL.getAllAlias();
    let allTypeUtilisateur=(await myDAL.getAllTypeUtilisateurs()).map((t)=> {return {name:t.nomTypeUtilisateur,value:t.idTypeUtilisateur}});
    let allPlancher=(await myDAL.getAllPlanchers()).map((p)=> {return {name:p.idPlancher,value:p.idPlancher}});
    myDAL.end()

    res.render('liste-employe',{user:{alias:session.get('user')},planchers:allPlancher,typeUtilisateur:allTypeUtilisateur,alerts:{}});
  })
  router.get('/get', async function(req, res, next){
    session.start(req);
    // const queryString=req.queryString;
    // let idGetUser=parseInt(queryString.id)
    // if(!isNaN(idGetUser)){
      
    // }
    let myDAL=new DAL();
    Utilisateur.connect(myDAL)
    let user=await Utilisateur.getUserByAlias(session.get('user'))
    let listEmployes=await user.getListEmployes();
    myDAL.end();
    listEmployes.forEach(element => {
      element.actif=element.actif[0]
    });
    listEmployes=[...listEmployes]

    let listeJSONObject=(Utilities.assiativeArrayToDict(listEmployes));
    res.send(JSON.stringify(listeJSONObject))
    
  })
  router.post('/add', async function(req, res, next){
    session.start(req);
    let myDAL=new DAL();
    Utilisateur.connect(myDAL)
    let data=req.body
    let newUser=new Utilisateur(data);

    let AllAlias=await myDAL.getAllAlias();
    let AllIdTypeUtilisateur=(await myDAL.getAllTypeUtilisateurs()).map(t=>t.idTypeUtilisateur);
    let AllIdPlancher=(await myDAL.getAllPlanchers()).map(p=>p.idPlancher);
    
    Utilisateur.addUniqueKey("alias",AllAlias);
    Utilisateur.addForeignKey("idTypeUtilisateur",AllIdTypeUtilisateur);
    Utilisateur.addForeignKey("idPlancher",AllIdPlancher);
    let validation=await newUser.add();
    myDAL.end()
    res.send(JSON.stringify(validation))
  })
  router.put('/update',async function(req, res, next){
    session.start(req);
    let myDAL=new DAL();
    Utilisateur.connect(myDAL)
    let data=req.body
    let newUser=new Utilisateur(data);
    let currentAlias=""
    if(data.id==parseInt(data.id))
      currentAlias=await myDAL.getAliasById(data.id);
    let AllAlias=await myDAL.getAllAlias();
    let AllIdTypeUtilisateur=(await myDAL.getAllTypeUtilisateurs()).map(t=>t.idTypeUtilisateur);
    let AllIdPlancher=(await myDAL.getAllPlanchers()).map(p=>p.idPlancher);
    
    if(currentAlias!=="")
      Utilisateur.addPermis("alias",currentAlias);
    Utilisateur.addUniqueKey("alias",AllAlias);
    Utilisateur.addForeignKey("idTypeUtilisateur",AllIdTypeUtilisateur);
    Utilisateur.addForeignKey("idPlancher",AllIdPlancher);

    let validation= await newUser.update(async (user)=> await myDAL.updateUtilisateur(user));//await newUser.update();
    myDAL.end()
    res.send(JSON.stringify(validation))
  })
module.exports = router;