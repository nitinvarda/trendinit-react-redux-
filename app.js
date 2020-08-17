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
    // for uploading images to database we use gridfsbucket
    gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'uploads' });


  })
  .on("error", (error) => {
    console.log("connection error:", error);
  });


// defining the storage of the image
var storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      // crypto creates 16 random numbers 
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        // the random numbers are converted to string and stored with the image original file extension like jpg,png..etc
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          // filename consists of new filename
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
// using multer for handling multipart/form-data
var upload = multer({ storage });

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

app.use('/users', usersRouter);

// home and categories 
app.use(pages);
// login router
app.use('/login', login);
// checking auth router
app.use('/checkAuth', checkAuth);
// adminhome router
app.use('/adminhome', adminhome);
// edit post router
app.use('/edit', edit);
// post details router
app.use('/article', article);
// particular admin post router
app.use('/by', byAdmin);



// adding post
app.post('/addpost', upload.single("myImage"), function (req, res) {

  var newpost = new artic({
    title: req.body.title,
    by: req.body.by,
    date: new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
    desc: req.body.desc,
    // the new file name of the image is stored in article 
    // when we need to fetch the image we use this name 
    imagename: req.file.filename,
    category: req.body.category
  });
  newpost.save(err => {
    if (err) return console.error(err);

  })
  return res.send("success");


});

// getting the image
app.get("/image/:filename", function (req, res) {
  gfs.find({ filename: req.params.filename }).toArray((err, file) => {
    // if the filename exist in database
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'no files exist'
      });
    }
    // creating stream to read the image which is stored in chunks 
    const readStream = gfs.openDownloadStreamByName(req.params.filename);
    // this is will display the image directly
    readStream.pipe(res);
  })

})

// updating post
app.post('/update/:id', upload.single('myImage'), function (req, res, next) {
  // for updatin we first find the article by id 
  artic.findOne(req.params.id, (err, data) => {

    if (err) return console.error(err);
    // later find the imagename and check wether it is valid or not
    gfs.find({ filename: data.imagename }).toArray((err, file) => {
      // if no imagefile then 
      if (!file || file[0].length === 0) {
        return res.status(404).json({
          // send response as no files exist
          err: 'no files exist'
        });
      }

      else {
        // if found imagefile if first delete them
        // so that we can update with other
        gfs.delete(file[0]._id, (err, complete) => {
          if (err) {
            return console.error(err);

          }

        })
      }
    })
  })


  // now we update remaining fields 
  var update = {
    title: req.body.title,
    by: req.body.by,
    category: req.body.category,
    date: req.body.date,
    desc: req.body.desc,
    // this is new imagename as the old one is delted
    imagename: req.file.filename
  }
  artic.findByIdAndUpdate(req.params.id, update, function (err) {
    if (err) return console.log(err);
    res.json("success");
  })

})

// deleting post
app.post('/delete/:id', (req, res) => {

  artic.findOne(req.params.id, (err, data) => {
    if (err) return console.error(err);
    // find the specific id 
    gfs.find({ filename: data.imagename }).toArray((err, file) => {
      // check for the imagefile
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'no files exist'
        });
      }

      else {
        // if found delete it
        gfs.delete(file[0]._id, (err, complete) => {
          if (err) {
            return console.error(err);

          }

        })
      }
    })
  })
  // later delete the post 
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
