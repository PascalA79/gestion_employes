var express = require('express');
var router = express.Router();
var Session=require('../class/Session')
var Redirect=require('../class/Redirect')
var Utilities=require('../class/Utilities')
var session=new Session(router);
const loginValidation = require('../public/scripts/login');

// router.get('/', (req, res, next) => {
//     res.render('login');
// })
// router.post('/', (req, res, next) => {
//     const {username="", password=""} = Utilities.getValidArray(req.body,'username','password');
//     const errorUsername = loginValidation.getUsernameValidationText(username);
//     const errorPassword = loginValidation.getPasswordValidationText(password);
//     if(errorUsername == "" && errorPassword == ""){
//         res.render('login', {username:username, errorPassword:"Valid!!!"});
//     } else {
//         res.render('login', {username: username, errorUsername: errorUsername, errorPassword: errorPassword});
//     }
// })


router.get('/', function(req, res, next) {
    session.start(req);
    let redirect= new Redirect(session,res)
    if(redirect.access('user',(value)=>value,'/index')){
        res.render('login'); 
    }
});
router.post("/",post);
async function post(req, res, next){
    const validArray=Utilities.getValidArray(req.body,'username','password')
    if(!validArray){
        res.render('login', { username: username});
    }else{
        var {username,password}=validArray
        const errorUsername = loginValidation.getUsernameValidationText(password);
        const errorPassword = loginValidation.getPasswordValidationText(password);
        if(errorUsername != "" || errorPassword != ""){
            res.render('login', { username: username, errorUsername: errorUsername, errorPassword: errorPassword });
        } else {
            console.log('traitement...');
            var ConnectionMYSQL=require('../class/ConnectionMYSQL');
            const connectionMySQL= new ConnectionMYSQL({
                host: "173.176.94.124",
                user: "projet",
                password: "qwerty12345",
                database :"projet"
            });
            let authorized= await connectionMySQL.excecuteSync(`SELECT CheckPassword('${username}', '${password}') AS value`)
            console.log(authorized[0].value)
            connectionMySQL.end()
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
    //username
    //password

    //errorUsername
    //errorPassword
}
module.exports = router; 
