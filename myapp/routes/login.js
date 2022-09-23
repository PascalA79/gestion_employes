var express = require('express');
var router = express.Router();
var Session=require('../class/Session')
var Horaire=require('../model/Horaire')
var Redirect=require('../class/Redirect')
var Utilities=require('../class/Utilities');
var DAL = require('../class/DAL');
const Utilisateur = require('../model/Utilisateur');
const QuartsTravail = require('../model/QuartTravail');
var session=new Session(router);
router.get('/', get);
async function get(req, res, next){
    session.start(req);
    let redirect= new Redirect(session,res)
    if(redirect.access('user',(value)=>value,'/index')){
        const DAL_PASCAL=new DAL();
        Horaire.connect(DAL_PASCAL)
        DAL_PASCAL.addQuartTravail({idPlancher:-1,idUtilisateur:2,idRoleUtilisateur:1,debut:'2022-09-14 18:00:00',fin:'2022-09-14 22:00:00',confirme:1})
        res.render('login'); 
    }

}
router.post("/",post);
async function post(req, res, next){
    const validArray=Utilities.getValidArray(req.body,'username','password')
    if(validArray){
        var {username,password}=validArray
        console.log('traitement...');
        const DAL_PASCAL=new DAL();
        let user=(await DAL_PASCAL.getUsers(username,'alias'))[0]
        let authorized= await DAL_PASCAL.checkPassword(username,password);
        console.log(authorized[0].value)
        if(authorized[0].value){
            let session= new Session(router)
            session.start(req)
            session.set('user',user.alias)
            res.redirect('index')
        }
        else{
            var {username,password}=validArray
            const errorUsername = loginValidation.getUsernameValidationText(password);
            const errorPassword = loginValidation.getPasswordValidationText(password);
            if(errorUsername != "" || errorPassword != ""){
                res.render('login', { username: username, errorUsername: errorUsername, errorPassword: errorPassword });
            } else {
                console.log('traitement...');
                const DAL_PASCAL=new DAL();
                let authorized= await DAL_PASCAL.checkPassword(username,password);

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
