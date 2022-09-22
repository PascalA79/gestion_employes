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
            res.render('login', { username: username});
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
