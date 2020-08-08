var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const artic = require('./routes/articleSchema');

var usersRouter = require('./routes/users');
var pages = require('./routes/pages');
const login = require('./routes/Login');
const checkAuth = require('./routes/checkAuth');
const adminhome = require('./routes/admin/adminhome');
const edit = require('./routes/admin/edit');
const article = require("./routes/article");
const byAdmin = require("./routes/byAdmin");
// var post = require('./routes/posts');

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });


// database connection
mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
var gfs;
mongoose.connection
  .once("open", () => {
    console.log("connection established:", mongoose.connection.readyState);
    gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'uploads' });


  })
  .on("error", (error) => {
    console.log("connection error:", error);
  });


var storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
var upload = multer({ storage });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use(pages);
app.use('/login', login);
app.use('/checkAuth', checkAuth);
app.use('/adminhome', adminhome);
app.use('/edit', edit);
app.use('/article', article);
app.use('/by', byAdmin);




app.post('/addpost', upload.single("myImage"), function (req, res) {


  // res.json(req.body);
  var newpost = new artic({
    title: req.body.title,
    by: req.body.by,
    date: new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
    desc: req.body.desc,
    imagename: req.file.filename,
    category: req.body.category
  });
  newpost.save(err => {
    if (err) return console.error(err);

  })
  return res.send("success");


});

app.get("/image/:filename", function (req, res) {
  gfs.find({ filename: req.params.filename }).toArray((err, file) => {

    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'no files exist'
      });
    }

    const readStream = gfs.openDownloadStreamByName(req.params.filename);
    readStream.pipe(res);
  })

})

app.post('/update/:id', upload.single('myImage'), function (req, res, next) {

  artic.findOne(req.params.id, (err, data) => {

    if (err) return console.error(err);

    gfs.find({ filename: data.imagename }).toArray((err, file) => {

      if (!file || file[0].length === 0) {
        return res.status(404).json({
          err: 'no files exist'
        });
      }

      else {
        gfs.delete(file[0]._id, (err, complete) => {
          if (err) {
            return console.error(err);

          }

        })
      }
    })
  })



  var update = {
    title: req.body.title,
    by: req.body.by,
    category: req.body.category,
    date: req.body.date,
    desc: req.body.desc,
    imagename: req.file.filename
  }
  artic.findByIdAndUpdate(req.params.id, update, function (err) {
    if (err) return console.log(err);
    res.json("success");
  })

})

app.post('/delete/:id', (req, res) => {

  artic.findOne(req.params.id, (err, data) => {
    if (err) return console.error(err);

    gfs.find({ filename: data.imagename }).toArray((err, file) => {

      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'no files exist'
        });
      }

      else {
        gfs.delete(file[0]._id, (err, complete) => {
          if (err) {
            return console.error(err);

          }

        })
      }
    })
  })
  artic.findByIdAndDelete(req.params.id, function (err) {
    if (err) return console.log(err);
    else {

      res.send("deleted");
    }
  })



})



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
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
