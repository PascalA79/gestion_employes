var express = require('express');
var router = express.Router();
var Session=require('../class/Session')
var Redirect=require('../class/Redirect')
var DAL = require('../class/DAL');
const Utilisateur = require('../model/Utilisateur');
/* GET home page. */
var session=new Session(router);
//redirection automatique vers /login si non connecté
router.use('/', async function(req, res, next) {
    session.start(req);
    console.log(req.path);
    let redirect= new Redirect(session,res);
    if(req.path=='/login' || await redirect.access('user')){
      next();
    }
  })

  router.get(['/','/index'], async function(req, res, next) {
    session.start(req);
    let DAL_PASCAL=new DAL();
    Utilisateur.connect(DAL_PASCAL)
    let user=(await Utilisateur.getUserByAlias(session.get('user')));
    let mainOption=user.getMainOption();
    // console.log( await user.isSuperviseurOfUtilisateur(2) )
    // console.log( await user.isSuperviseurOfUtilisateur(3) )
    // console.log( await user.isSuperviseurOfUtilisateur(5) )
    console.log("res.render('index')");
    DAL_PASCAL.end()
    res.render('index',{user:{alias:session.get('user')},alerts:{},tuiles:mainOption});
  })

router.use('/disconnect',function(req, res, next) {
  let redirect= new Redirect(session,res);
  session.destroy();
  redirect.access('user');//,()=>true,"/login")
})
module.exports = router;
