var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv=require('dotenv');
const connectDB=require('./config/db');

dotenv.config({path:'./config/config.env'})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter=require('./routes/admin');
var roleRouter=require('./routes/role');
var userRouter=require('./routes/user');
var categoryRouter=require('./routes/category');
var postRouter=require('./routes/post');
var authRouter=require('./routes/auth');

var app = express();

connectDB();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/backend',adminRouter);
app.use('/backend',roleRouter);
app.use('/backend',userRouter);
app.use('/backend',categoryRouter);
app.use('/backend',postRouter);
app.use('/backend',authRouter);


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
