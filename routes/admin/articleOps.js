var express = require('express');
var router = express.Router();
var path = require('path')

var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const Article = require('../../models/articleSchema');

const auth = require('../auth')
var mongoose = require('mongoose')


const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

// database connection
mongoose.connect(process.env.MONGO_URI_TEST, {
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
    url: process.env.MONGO_URI_TEST,
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




// @desc Adding new article  
// @route POST /addpost
// @access Private

router.post('/addpost', auth, upload.single("myImage"), function (req, res, next) {


    var newpost = new Article({
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
        if (err) {
            next(err)
        }


    })
    return res.send("success");


});

// @desc Loading images of articles  
// @route GET /image/:filename
// @access Public
router.get("/image/:filename", function (req, res, next) {

    gfs.find({ filename: req.params.filename }).toArray((err, file) => {

        // if the filename exist in database
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'no files exist'
            });
        }

        // creating stream to read the image which is stored in chunks 
        const readStream = gfs.openDownloadStreamByName(file[0].filename);
        // this is will display the image directly
        readStream.pipe(res);
    })

})

// @desc Updating existing articles  
// @route POST /update/:id
// @access Private

router.post('/update/:id', auth, upload.single('myImage'), function (req, res, next) {
    // for updatin we first find the article by id 
    Article.findById(req.params.id, (err, data) => {

        if (err) return next(err);
        // later find the imagename and check wether it is valid or not
        gfs.find({ filename: data.imagename }).toArray((err, image) => {
            // if no imagefile then 
            if (!image || image.length === 0) {
                return res.status(404).json({
                    // send response as no files exist
                    err: 'no files exist'
                });
            }

            else {
                // if found imagefile if first delete them
                // so that we can update with other
                const id = new mongoose.Types.ObjectId(image[0]._id)
                gfs.delete(id, (err, complete) => {
                    if (err) {
                        return next(err);

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
    Article.findByIdAndUpdate(req.params.id, update, function (err) {
        if (err) return next(err);
        res.json("success");
    })

})

// @desc deleting existing articles  
// @route DELETE /delete/:id
// @access Private

router.delete('/delete/:id', auth, (req, res, next) => {

    Article.findById(req.params.id, (err, article) => {
        if (err) return next(err);
        // find the specific id 
        gfs.find({ filename: article.imagename }).toArray((err, image) => {
            // check for the imagefile
            if (err) {
                return next(err)
            }
            if (!image || image.length === 0) {
                res.status(404)
                var error = new Error('Image found')

                next(error)


            }

            else {
                // if found delete it
                const id = new mongoose.Types.ObjectId(image[0]._id)

                gfs.delete(id, (err) => {
                    if (err) {
                        return next(err);

                    }


                })
            }
        })
    })
    // later delete the post 
    Article.findByIdAndDelete(req.params.id, function (err) {
        if (err) return next(err);
        else {

            res.send("deleted");
        }
    })



})

module.exports = router