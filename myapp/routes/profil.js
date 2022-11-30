var express = require('express');
var router = express.Router();
var Session=require('../class/Session')
var Redirect=require('../class/Redirect')
var Utilities=require('../class/Utilities');
var DAL = require('../class/DAL');
const Utilisateur = require('../model/Utilisateur');
const loginValidation = require('../public/scripts/login');
var session=new Session(router);

router.get('/', async (req, res, next)=>{
    session.start(req);
    res.render('profil',{user:{alias:session.get('user')},alerts:{}});
})
router.get('/get', async (req, res, next)=>{
    session.start(req);
    let alias= session.get("user")
    const myDAL=new DAL()
    Utilisateur.connect(myDAL)
    let user=await Utilisateur.getUserByAlias(alias)
    let nomPlancher=(await myDAL.getAllPlanchers()).filter(p => p.idPlancher==user.idPlancher)[0]["nomPlancher"]
    let nomTypeUtilisateur=(await myDAL.getAllTypeUtilisateurs()).filter(t=>t.idTypeUtilisateur==user.idTypeUtilisateur)[0].nomTypeUtilisateur
    myDAL.end()
    const utilisateur={}
    utilisateur["id"]=user["id"];
    utilisateur["nomTypeUtilisateur"]=nomTypeUtilisateur;
    utilisateur["nomPlancher"]=nomPlancher;
    utilisateur["prenom"]=user["prenom"];
    utilisateur["nom"]=user["nom"];
    utilisateur["alias"]=alias;
    utilisateur["age"]=user["age"];
    utilisateur["telephone"]=user["telephone"];
    utilisateur["courriel"]=user["courriel"];
    
    res.send(JSON.stringify(utilisateur)); 
})
router.post("/",(req, res, next)=>{
    console.log(req)
    console.log(res)
})
router.post("/change_password",post);
async function post(req, res, next){
    session.start(req);
    const newPassword=req.body['newPassword']
    console.log('changement de mot de passe...');
    const myDAL=new DAL();
    Utilisateur.connect(myDAL)
    let user=(await Utilisateur.getUserByAlias(session.get('user')));
    let errorCode=await user.updatePassword(newPassword)
    myDAL.end();
    res.send(errorCode)
}
module.exports = router; 
