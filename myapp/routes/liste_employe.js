var express = require('express');
var router = express.Router();
var Session=require('../class/Session')
var Redirect=require('../class/Redirect')
var DAL = require('../class/DAL');
const Utilisateur = require('../model/Utilisateur');
const Utilities = require('../class/Utilities');
const ValidationUtilisateur=require("../public/scripts/ValidationUtilisateur")
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
    res.render('liste-employe',{user:{alias:session.get('user')},alerts:{}});
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
    let newUser=new Utilisateur(data)
    let validation=await newUser.add();
    myDAL.end()
    res.send(JSON.stringify(validation))
    
  })
module.exports = router;