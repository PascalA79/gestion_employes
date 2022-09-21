var express = require('express');
var router = express.Router();
var Session=require('../class/Session')
/* GET home page. */
var session=new Session(router);
router.get('/', function(req, res, next) {
  res.render('index',{user:{alias:'pasc'},alerts:{}});

  //res.render('index', { title: 'Express' });
});router.get('/died', function(req, res, next) {
  session.destroy()
  res.send(`Bye`);
});
module.exports = router;
