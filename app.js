var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors= require('cors');
var pagosRouter = require('./routes/pagos');
var usersRouter = require('./routes/users');
var rep_pagosRouter = require('./routes/rep_pagos');
var ins_userRouter = require('./routes/ins_user');
var userRouter = require('./routes/user');
var act_userRouter = require('./routes/act_user');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
const PORT = process.env.PORT || 80; 
//const PORT=3001;
app.set('port',PORT);

app.use(cors());




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use(allowCrossDomain);





app.use('/pagos', pagosRouter);
app.use('/users', usersRouter);
app.use('/rep_pagos', rep_pagosRouter);
app.use('/ins_user', ins_userRouter);
app.use('/user', userRouter);
app.use('/act_user', act_userRouter);



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
