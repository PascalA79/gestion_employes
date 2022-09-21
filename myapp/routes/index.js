var express = require('express');
var router = express.Router();
var Session=require('../class/Session')
var Redirect=require('../class/Redirect')
/* GET home page. */
var session=new Session(router);
//redirection automatique vers /login si non connecté
router.use('/', function(req, res, next) {
    session.start(req);
    let redirect= new Redirect(session,res);
    if(req.path=='/login' || redirect.access('user')){
      next();
    }
  })

router.get(['/','/index'], function(req, res, next) {
  session.start(req);
    res.render('index',{user:{alias:session.get('user')},alerts:{}});
})
router.use('/disconnect',function(req, res, next) {
  let redirect= new Redirect(session,res);
  session.destroy();
  redirect.access('user');//,()=>true,"/login")
})
module.exports = router;
