var express = require('express');
var router = express.Router();
var Session=require('../class/Session')
var Redirect=require('../class/Redirect')
const fs = require('fs');
/* GET home page. */
var session=new Session(router);

  router.get(['/','/index'], function(req, res, next) {
    session.start(req);
    const data = JSON.parse(fs.readFileSync('../BD/data-users-horaire-plancher.json'));
    const tableData = BuildTableData(data);
    res.render('horaire-plancher', {data:data, tableData:tableData});
  })

function BuildTableData(data){
  // En cours (PCL)
  return [];
}

module.exports = router;
