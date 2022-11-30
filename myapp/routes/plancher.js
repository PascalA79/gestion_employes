var express = require('express');
var router = express.Router();
var Session=require('../class/Session')
var session=new Session(router);
const DAL=require("../class/DAL");
const { ValiderPlancher,ERREUR_PLANCHER } = require('../public/scripts/ValidationPlancher');
var Redirect=require('../class/Redirect');
const Utilisateur = require('../model/Utilisateur');
router.use('/', async function(req, res, next) {
    session.start(req);
    let redirect= new Redirect(session,res);
    let acces= await  redirect.access('user',async (alias)=>{
      const myDAL=new DAL()
      Utilisateur.connect(myDAL)
      let user=await Utilisateur.getUserByAlias(alias)
      let isAdmin=user.isAdministrateur();
      let isDirecteur=user.isDirecteur();
      let resultat = isAdmin || isDirecteur;
      myDAL.end()
      return !resultat}
    ,'./index')
    if(acces){
      next();
    }
    })
  
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
    session.start(req);
    const myDAL=new DAL();
    let data=req.body
    let idPlancher=0;
    let superviseurs=[];
    let nomPlancher=undefined;
    try 
    {
        idPlancher=data.idPlancher
        superviseurs=data.superviseurs
        nomPlancher=data.nomPlancher
        let allPlanchers=await myDAL.getAllPlanchers()
        let allNamePlancher=allPlanchers.map(e=> e["nomPlancher"])
        let allIdUtilisateur=Object.values(await myDAL.getOrganisationPlancher()).map(e=>e["idUtilisateur"])
        let validate=ValiderPlancher({idPlancher,nomPlancher,superviseurs},
            {nomPlancher:allNamePlancher},
            {idUtilisateur:allIdUtilisateur}
            )
            let validation=!Object.values(validate).filter(result=>result!==ERREUR_PLANCHER.OK)[0]
        
        if(validation) 
        {
            await myDAL.addPlancher({superviseurs:superviseurs,nomPlancher:nomPlancher})
        }        
        res.send(JSON.stringify(validate))
    } catch (error) {
        res.send(error)
    }
    finally{
        myDAL.end();
    }
})
router.put('/update',async (req, res, next)=>{
    const myDAL=new DAL();
    let data=req.body
    let idPlancher=0;
    let superviseurs=[];
    let nomPlancher=undefined;
    try 
    {
        idPlancher=data.idPlancher
        superviseurs=data.superviseurs
        nomPlancher=data.nomPlancher
        let allPlanchers=await myDAL.getAllPlanchers()
        let currentNomPlancher=allPlanchers.filter(p=>p["idPlancher"]==idPlancher)[0].nomPlancher
        let allNamePlancher=allPlanchers.map(e=>e.nomPlancher)
        let allIdPlancher=allPlanchers.map(e=>e.idPlancher)
        let allIdUtilisateur=Object.values(await myDAL.getOrganisationPlancher()).map(e=>e["idUtilisateur"])
        let validate=ValiderPlancher({idPlancher,nomPlancher,superviseurs},
            {nomPlancher:allNamePlancher},
            {idUtilisateur:allIdUtilisateur,idPlancher:allIdPlancher},
            {nomPlancher:currentNomPlancher}
            )
            let validation=!Object.values(validate).filter(result=>result!==ERREUR_PLANCHER.OK)[0]
        
        if(validation) 
        {
            await myDAL.updatePlancher({idPlancher:idPlancher,superviseurs:superviseurs,nomPlancher:nomPlancher})
        }        
        res.send(JSON.stringify(validate))
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
