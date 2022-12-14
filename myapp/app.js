var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var loginRouter = require('./routes/login');
var plancherRouter = require('./routes/plancher');
var horairePersoRouter = require('./routes/horaire_perso');
var horairePlancherRouter = require('./routes/horaire_plancher');
var listEmployeRouter = require('./routes/liste_employe');
var profilRouter = require('./routes/profil');

var Fichier = require('./class/Fichier');
async function configureRoutes(chemin){

  let ls= await Fichier.get_ls(chemin)
  ls.forEach(x=>{
      let nameFile=x.split('.')[0];
      const routeur=require(chemin+'/'+nameFile);
      if(nameFile=='index') nameFile='';
      app.use('/'+nameFile, routeur);
    })
}
var app = express();

const config = require('config');
console.log(config.get("name"));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//configureRoutes('./routes')

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/login', loginRouter);
app.use('/plancher', plancherRouter);
app.use('/horaire-perso', horairePersoRouter);
app.use('/horaire-plancher', horairePlancherRouter);
app.use('/liste-employe', listEmployeRouter);
app.use('/profil', profilRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;