var express = require('express');
var router = express.Router();
const DAL = require('../../class/DAL');
const Utilisateur = require('../../model/Utilisateur');
var Session=require('../../class/Session')
var session=new Session(router);
// var Utilisateur = require('../../model/Utilisateur');

router.get("/", async function(req, res, next){
    const maDAL = new DAL();
    Utilisateur.connect(maDAL);
    const allUsers = await Utilisateur.getUsers();
    maDAL.end();
    res.json(allUsers);
    // res.json({MaRoute: "/api/users"});
})

router.get("/getlistemployes", async function(req, res, next){
    session.start(req);
    const currentUser = new Utilisateur(session.get('fullUser'));
    const maDAL = new DAL();
    Utilisateur.connect(maDAL);
    const employes = await currentUser.getListEmployes();
    maDAL.end();
    res.json(employes);
})

// router.get("/isSupervisor", async function(req, res, next){
//     session.start(req);
//     const currentUser = new Utilisateur(session.get('fullUser'));
//     let idQueryString=parseInt(req.query.id)
// })



module.exports = router;