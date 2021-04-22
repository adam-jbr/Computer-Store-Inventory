var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var computerRouter = require('./routes/computerRouter');

var passport = require ('passport');
var authenticate= require('./authenticate');
var config = require('./config');
var cors = require("cors")


const url = config.mongoUrl;
const connect = mongoose.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true});
connect.then((db) => {
  console.log("Connected correctly to server");
}, (err) => { console.log(err); });

var app = express();

app.use(cors());



app.use(passport.initialize());


app.use('/', indexRouter);
app.use('/computers', computerRouter);
app.use('/users', usersRouter);

//app.use("/images", express.static(path.join("http://localhost:3000/images")));  

app.use(express.static('public'))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




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

