var express = require('express');
var router = express.Router();
var Session=require('../class/Session')
var Redirect=require('../class/Redirect');
var DAL = require('../class/DAL');
const Utilisateur = require('../model/Utilisateur');

/* GET home page. */
var session=new Session(router);
router.use('/', async function(req, res, next) {
  session.start(req);
  let redirect= new Redirect(session,res);
  let acces= await  redirect.access('user',async (userId)=>{
    const DAL_PASCAL=new DAL()
    Utilisateur.connect(DAL_PASCAL)
    let user=await Utilisateur.getUserByAlias(userId)
    let idQueryString=user.id;/* user.id==id QueryString */
    let isAdmin=user.isAdministrateur();
    let isDirecteur=user.isDirecteur();
    let isSuperviseurOfUtilisateur=await user.isSuperviseurOfUtilisateur(user.id);
    let resultat=idQueryString ==user.id || user.id || isAdmin || isDirecteur || isSuperviseurOfUtilisateur
    return !resultat}
  ,'./index')
  if(acces){
    next();
  }
})
  router.get(['/'], async function(req, res, next) {
    session.start(req);
    
    
    res.render('horaire-perso',{user:{alias:session.get('user')},alerts:{}});
  })

module.exports = router;
