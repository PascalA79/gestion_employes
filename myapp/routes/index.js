var express = require('express');
var router = express.Router();
var Session=require('../class/Session')
var Redirect=require('../class/Redirect')
var DAL = require('../class/DAL');
const Utilisateur = require('../model/Utilisateur');
const DateUtilities = require('../class/Utilities/DateUtilities');
const QuartTravail = require('../model/QuartTravail');
/* GET home page. */
var session=new Session(router);
//redirection automatique vers /login si non connecté
router.use('/', async function(req, res, next) {

    //test()  
    session.start(req);
    console.log(req.path);
    let redirect= new Redirect(session,res);
    if(req.path=='/login' || await redirect.access('user')){
      next();
    }
  })
  async function test(){
  
  let myDAL=new DAL();
  
  let debut=DateUtilities.getObj(DateUtilities.getDate(2008,11,22,10,30));
  let fin=DateUtilities.getObj(DateUtilities.getDate(2025,11,22,13,30));
  debut=DateUtilities.objToFullDateString(debut);
  fin=DateUtilities.objToFullDateString(fin);
  try {
    QuartTravail.connect(myDAL)
    let quart= new QuartTravail({idQuartTravail:1,idPlancher:-1,idUtilisateur:2,idRoleUtilisateur:2,debut:debut,fin:fin,confirme:0})
    quart.confirme=1;
    let newQuart=await quart.update()
    console.log(newQuart)
    /*
    await quart.add()
    console.log('ajout réussi')
    */
    
  } catch (error) {
    console.error(error)
  }
  myDAL.end()
}

  router.get(['/','/index'], async function(req, res, next) {
    session.start(req);
    let DAL_PASCAL=new DAL();
    Utilisateur.connect(DAL_PASCAL)
    let user=(await Utilisateur.getUserByAlias(session.get('user')));
    let mainOption=user.getMainOption();
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