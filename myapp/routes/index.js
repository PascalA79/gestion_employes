var express = require('express');
var router = express.Router();
var Session=require('../class/Session')
var Redirect=require('../class/Redirect')
/* GET home page. */
var session=new Session(router);
router.get(['/','/index'], function(req, res, next) {
  session.start(req);
  let redirect= new Redirect(session,res)
  if(redirect.access('user')){
    res.render('index',{user:{alias:session.get('user')},alerts:{}});
  }
  //res.render('index', { title: 'Express' });
})
module.exports = router;
