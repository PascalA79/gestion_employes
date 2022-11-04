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
    let resultat=  isAdmin || isDirecteur || isSuperviseur;
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
    
    let myDAL=new DAL();
    Utilisateur.connect(myDAL)
    let user=await Utilisateur.getUserByAlias(session.get('user'))
    let listEmployes=await user.getListEmployes();
    myDAL.end();
    listEmployes=[...listEmployes,...listEmployes,...listEmployes,...listEmployes]
    let listeJSONObject=(Utilities.assiativeArrayToDict(listEmployes));
    res.render('liste-employe',{user:{alias:session.get('user')},alerts:{},employes:listeJSONObject});
  })

module.exports = router;