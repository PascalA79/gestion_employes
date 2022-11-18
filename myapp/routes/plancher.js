var express = require('express');
var router = express.Router();
var Session=require('../class/Session')
var session=new Session(router);
const DAL=require("../class/DAL")

router.get('/', function(req, res, next) {
    session.start(req);
    res.render('plancher',{user:{alias:session.get('user')},alerts:{}});
})
router.get('/get', async function(req, res, next) {
    session.start(req);
    const myDAL=new DAL();
    let planchers=await myDAL.getAllPlanchers()
    myDAL.end();
    res.send(JSON.stringify(planchers));
})
router.post('/add',async (req, res, next)=>{
    const myDAL=new DAL();
    let data=req.body
    //myDAL.addPlancher(nomPlancher)
    myDAL.end();
    res.send("")
})
router.put('/update',async (req, res, next)=>{
    const myDAL=new DAL();
    let data=req.body
    myDAL.updatePlancher(oldNom,newNom)
    myDAL.end();
    res.send("")
})
router.delete('/remove',async (req, res, next)=>{
    
    const myDAL=new DAL();
    
    myDAL.end();
    res.send("")
})



module.exports = router;
