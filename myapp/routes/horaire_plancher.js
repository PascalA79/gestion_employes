var express = require('express');
var router = express.Router();
var Session=require('../class/Session')
var Redirect=require('../class/Redirect')
const fs = require('fs');
/* GET home page. */
var session=new Session(router);

  router.get(['/','/index'], function(req, res, next) {
    session.start(req);
    const data = fs.readFileSync('../BD/data-users-horaire-plancher.json');
    res.render('horaire-plancher', data);
  })

module.exports = router;
