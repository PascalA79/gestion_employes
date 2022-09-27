var express = require('express');
var router = express.Router();
var Session=require('../class/Session')
var Redirect=require('../class/Redirect')
/* GET home page. */
var session=new Session(router);

  router.get(['/','/index'], function(req, res, next) {
    session.start(req);
    
    res.render('horaire-perso',{user:{alias:session.get('user')},alerts:{}});
  })

module.exports = router;
