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
router.get('/', get);
async function get(req, res, next){

    // DateUtilities.getDBDateStringFromString("");
    session.start(req);
    let redirect= new Redirect(session,res)
    if(await redirect.access('user',(value)=>value,'/index')){

        // const DAL_PASCAL= new DAL();
        // Utilisateur.connect(DAL_PASCAL);
        // Plancher.connect(DAL_PASCAL)
        // let plancher=Plancher.getPlancherById(999)
        // console.log(await plancher)
        // DAL_PASCAL.end()
        // console.log((await Utilisateur.getSuperviseurOfPlancher(-1))[0].prenom);

        // const DateUtilities = require('../class/Utilities/DateUtilities')
        // let dateDebut=DateUtilities.getDate('2022','09','14');
        // let dateFin=DateUtilities.getDate('2022','09','30');
        // let dataDate =await DAL_PASCAL.getQuartsByUser(2,dateDebut,dateFin)
        // console.log(dataDate)
        // const FULL_DAY=(1000*60*60*24);
        // const SEPARATION_JOUNEE=24
        // const SEPARATION_QUART=FULL_DAY/SEPARATION_JOUNEE;
        // let nbrJours=7
        // let journees=[];
        // for(let separation=0;separation<SEPARATION_JOUNEE;separation++){
        //     journees[separation]=[]
        //     for(let jour=0;jour<nbrJours;jour++){
        //         journees[separation][jour]=''
        //     }
        // }

        // console.log(journees)

        // console.log(await DAL_PASCAL.getQuartsByPlancher(-1,DateUtilities.getDate('2022','09','14')))
        // console.log("res.render('login')");


        


        //res.render('plancher',{user:{alias:session.get('user')},alerts:{}});
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
            res.render('login', { username: username, errorPassword:loginValidation.ERROR_TEXTS.PASSWORD[loginValidation.ERROR_CODES.PASSWORD.UNKNOWN]});
/*
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
            }*/
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
