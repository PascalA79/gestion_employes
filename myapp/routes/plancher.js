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
    let organisation=await myDAL.getOrganisationPlancher()
    myDAL.end();
    res.send(JSON.stringify({planchers:planchers,organisation,organisation}));
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
    let idPlancher=0;
    let planchers=[];
    let nomPlancher=undefined;
    try {
        idPlancher=data.idPlancher
        planchers=data.planchers
        nomPlancher=data.nomPlancher
        if(!isNaN(idPlancher) &&  typeof planchers ==="object"&& planchers.length >0 && typeof nomPlancher ==="string")
        await myDAL.updatePlancher({idPlancher:idPlancher,planchers:planchers,nomPlancher:nomPlancher})
        
        res.send("")
    } catch (error) {
        res.send(error)
    }
    finally{
        myDAL.end();
    }
})
router.delete('/remove',async (req, res, next)=>{
    
    const myDAL=new DAL();
    
    myDAL.end();
    res.send("")
})



module.exports = router;
