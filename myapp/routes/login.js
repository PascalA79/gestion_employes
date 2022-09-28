var express = require('express');
var router = express.Router();
var Session=require('../class/Session')
var Redirect=require('../class/Redirect')
var Utilities=require('../class/Utilities');
var DAL = require('../class/DAL');
var session=new Session(router);
router.get('/', get);
async function get(req, res, next){
    session.start(req);
    let redirect= new Redirect(session,res)
    if(redirect.access('user',(value)=>value,'/index')){
        const DAL_PASCAL= new DAL();
        const DateUtilities = require('../class/Utilities/DateUtilities')
        console.log(await DAL_PASCAL.getQuartsByUser(2,DateUtilities.getDate('2022','09','15'),DateUtilities.getDate('2024','09','30')))
        console.log(await DAL_PASCAL.getQuartsByPlancher(-1,DateUtilities.getDate('2022','09','14')))

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
            session.set('fullUser', user);
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
