/*********************************************************************************
*  WEB322 – Assignment 03
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: ___Himani___________________ Student ID: _______155567217_______ Date: ___10/13/2022_____________
*
*  Online (Cyclic) Link: _____________https://beret-lobster.cyclic.app ___________________________________________
*
********************************************************************************/ 

var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
var path = require("path");
var blogservice = require(__dirname + "/blog-service");

const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const upload = multer(); //no {storage: storage} since we are not using disk storage

//Cloudinary for image upload
cloudinary.config({
  cloud_name: "dpgjtl45x",
  api_key: "476436394292844",
  api_secret: "K5HEyz2jq0hzm27U6CJfWSnmvFY",
  secure: true,
});

onHttpStart = () => {
  console.log("Express http server listening on " + HTTP_PORT);
};

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect("/about");
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/about.html"));
});

app.get("/posts/add", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/addPost.html"));
});

app.get("/blog", (req, res) => {
  blogservice
    .getPublishedPosts()
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

app.get("/data/posts.json", (req, res) => {
  blogservice
    .getAllPosts()
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

app.post("/posts/add", upload.single("featureImage"), (req, res) => {
  let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };
  async function upload(req) {
    let result = await streamUpload(req);
    console.log(result);
    return result;
  }
  upload(req).then((uploaded) => {
    req.body.featureImage = uploaded.url;
    // TODO: Process the req.body and add it as a new Blog Post before redirecting to/posts
  });
});

app.get("/data/categories.json", (req, res) => {
  blogservice
    .getCategories()
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

app.get("*", function (req, res) {
  res.status(404).send("Page Not Found!");
});

blogservice
  .initialize()
  .then(() => {
    app.listen(HTTP_PORT, onHttpStart());
  })
  .catch(() => {
    console.log("Error: From Starting the Service");
  });