var express = require('express');
var router = express.Router();
var Session=require('../class/Session')
var Redirect=require('../class/Redirect')
var Utilities=require('../class/Utilities');
const DateUtilities = require('../class/Utilities/DateUtilities');
var DAL = require('../class/DAL');
const Utilisateur = require('../model/Utilisateur');
const loginValidation = require('../public/scripts/login');
const Plancher = require('../model/Plancher');

//console.log(ValiderUtilisateur(new Utilisateur({id:1,idTypeUtilisateur:2,idPlancher:0,alias:"pascala79"})))
var session=new Session(router);
router.get('/', async (req, res, next)=>{
    session.start(req);
    res.render('profil'); 
})
router.get('/get', async (req, res, next)=>{
    session.start(req);
    let alias= session.get("user")
    const myDAL=new DAL()
    Utilisateur.connect(myDAL)
    let user=await Utilisateur.getUserByAlias(alias)
    let nomPlancher=(await myDAL.getAllPlanchers()).filter(p=>{
        p.idPlancher=user.idPlancher
    })[0].nomPlancher
    let nomTypeUtilisateur=(await myDAL.getAllTypeUtilisateurs()).filter(t=>{
        t.idTypeUtilisateur=user.idTypeUtilisateur
    })[0].nomTypeUtilisateur
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
    utilisateur["actif"]=user["actif"];
    utilisateur["password"]="";
    
    res.send(JSON.stringify(utilisateur)); 
})
router.post("/",post);
async function post(req, res, next){
    const validArray=Utilities.getValidArray(req.body,'username','password')
    if(validArray){
        var {username,password}=validArray
        console.log('traitement...');
        const DAL_PASCAL=new DAL();
        let user=(await DAL_PASCAL.getUsers(username,'alias'))[0]
        let authorized= await DAL_PASCAL.checkPassword(username,password);
        DAL_PASCAL.end()
        console.log(authorized[0].value)
        if(authorized[0].value){
            let session= new Session(router)
            session.start(req)
            session.set('user',user.alias)
            session.set('fullUser', user);
            res.redirect('index')
        }
        else{
            var {username,password}=validArray
            const errorUsername = loginValidation.getUsernameValidationText(username);
            const errorPassword = loginValidation.getPasswordValidationText(password);
            if(errorUsername != "" || errorPassword != ""){
                res.render('login', { username: username, errorUsername: errorUsername, errorPassword: errorPassword });
            } 
            else {
                console.log('traitement...');
                const DAL_PASCAL=new DAL();
                let authorized= await DAL_PASCAL.checkPassword(username,password);
                DAL_PASCAL.end()
                if(authorized[0].value){
                    let session= new Session(router)
                    session.start(req)
                    session.set('user',username)
                    res.redirect('index');
                } else {
                    res.render('login', { username: username, errorPassword:loginValidation.ERROR_TEXTS.PASSWORD[loginValidation.ERROR_CODES.PASSWORD.UNKNOWN]});
                }
            }
        }
    }
    else{
        res.render('login', { username: username});
    }
//username
    //password

    //errorUsername
    //errorPassword
}
module.exports = router; 
