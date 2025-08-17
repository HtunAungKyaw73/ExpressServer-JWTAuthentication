var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose');
const { db } = require('./config/database');

const customLogger = require('./middlewares/customLogger');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let todosRouter = require('./routes/todos');
let moviesRouter = require('./routes/movies');
let reviewsRouter = require('./routes/reviews');
let auth = require('./middlewares/auth');

var app = express();

// mongodb connect
mongoose.connect(db).then(() => console.log('MongoDB connected!'))
    .catch(err => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(customLogger("MyLogger"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/todos', todosRouter);
// app.use('/api/movies', moviesRouter);
// app.use('/api/reviews', reviewsRouter);
app.use('/api/movies', auth.verifyUserToken, moviesRouter);
app.use('/api/reviews', auth.verifyUserToken, reviewsRouter);
app.use('/api/users', usersRouter);

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
