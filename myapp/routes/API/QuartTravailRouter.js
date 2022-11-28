var express = require('express');
var router = express.Router();
const DAL = require('../../class/DAL');
const Utilisateur = require('../../model/Utilisateur');
const QuartsTravail = require('../../model/QuartTravail');
var Session=require('../../class/Session')
var session=new Session(router);


router.get("/getbyuser", async function(req, res, next){
    session.start(req);
    const fullUser = session.get("fullUser");
    if(!fullUser){
        res.status(401).send("Unauthorized");
        return;
    }
    const currentUser = new Utilisateur(session.get('fullUser'));
    const maDAL = new DAL();
    Utilisateur.connect(maDAL);
    QuartsTravail.connect(maDAL);
    const id = req.query.id && !isNaN(parseInt(req.query.id)) ? parseInt(req.query.id) : currentUser.id;
    const employe = await Utilisateur.getUserById(id);
    const isSuperviseur = await currentUser.isSuperviseurOfUser(employe)
    if(!currentUser || !employe || !isSuperviseur){
        res.status(401).send("Unauthorized");
    } else {
        // const start = new Date(req.query.start);
        // const end = new Date(req.query.end);
        const start = parseInt(req.query.start);
        const end = parseInt(req.query.end);
        if(!!start && !!end){
            const quarts = await QuartsTravail.getByUser(id, start, end);
            maDAL.end();
            res.json(quarts);
        } else {
            res.status(400).send("Invalid query params");
        }
    }
})

module.exports = router;