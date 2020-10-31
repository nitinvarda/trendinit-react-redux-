var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var express = require('express');




var pages = require('./routes/pages');
const login = require('./routes/Login');
const checkAuth = require('./routes/checkAuth');


const article = require("./routes/article");
const byAdmin = require("./routes/byAdmin");
const articleOps = require('./routes/admin/articleOps')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
// for parsing the request 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// static path 
app.use(express.static(path.join(__dirname, 'public')));





// home and categories 
app.use(pages);
// login router
app.use('/login', login);
// checking auth router
app.use('/checkAuth', checkAuth);

// post details router
app.use('/article', article);
// particular admin post router
app.use('/by', byAdmin);

app.use(articleOps)









// heroku build production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler


app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
})
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app


