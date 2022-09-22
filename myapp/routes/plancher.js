var express = require('express');
var router = express.Router();
var Session=require('../class/Session')
var session=new Session(router);

router.get('/', function(req, res, next) {
    session.start(req);
    res.render('plancher',{user:{alias:session.get('user')},alerts:{}});
})
router.post('/',(req, res, next)=>{

})



module.exports = router;
