require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');
// const { db } = require('./config/database');

const customLogger = require('./middlewares/customLogger');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let todosRouter = require('./routes/todos');
let moviesRouter = require('./routes/movies');
let reviewsRouter = require('./routes/reviews');
let auth = require('./middlewares/auth');

var app = express();

// mongodb connect
mongoose.connect(process.env.DB_HOST).then(() => console.log('MongoDB connected!'))
    .catch(err => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(customLogger("MyLogger"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 60000 * 5 }
}))
app.use(express.static(path.join(__dirname, 'public')));

// const port = process.env.PORT || 3080;
// app.listen(port, () => console.info(`Server is running in port ${port}`));

app.use('/', indexRouter);
app.use('/todos', todosRouter);
// app.use('/api/todos', todosRouter);
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
