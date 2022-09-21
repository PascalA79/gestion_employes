var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
 res.render('login'); 
});
router.post("/",post);
async function post(req, res, next){
    let username=req.body['username'];
    let password=req.body['password'];
    let errorUsername=0;
    let errorPassword=0;
    if(!username)
    {
        errorUsername=1;
    }
    if(!password)
    {
        errorPassword=1;
    }
    if(!(errorUsername+errorPassword)){
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

            res.render('index', { user: {alias:username},alert:{} });
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
