var express = require('express');
var router = express.Router();
var Session=require('../class/Session')
/* GET home page. */
var session=new Session(router);
router.get('/', function(req, res, next) {
  session.start(req)
  session.fSet('test2',x=>x+1,0)
  res.send(`<h1>${session.get('test2')} visites</h1`);

  //res.render('index', { title: 'Express' });
});router.get('/died', function(req, res, next) {
  session.destroy()
  res.send(`Bye`);
});
module.exports = router;
