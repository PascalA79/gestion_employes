var express = require('express');
var router = express.Router();
var session = require('express-session')
/* GET home page. */
router.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  //store: database  https://www.youtube.com/watch?v=J1qXK66k1y4&ab_channel=ZachGollwitzer 8:54
  cookie: { maxAge: 60000 }
}))
router.get('/', function(req, res, next) {
  if(req.session.test){
    req.session.test++;
  }
  else req.session.test=1
  console.log(req.session.test)
  res.render('index', { title: 'Express' });
});

module.exports = router;
