/*********************************************************************************
*  WEB322 – Assignment 02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: ____HIMANI__________________ Student ID: ___155567217___________ Date: __09/30/2022______________
*
*  Online (Cyclic) Link: ____https://drab-gold-dibbler-tam.cyclic.app/____________________________________________________
*
********************************************************************************/

var express = require("express");
var app = express();
var path = require("path");

var HTTP_PORT = process.env.PORT || 8080;

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

app.use(express.static('public')); 

// setup a 'route' to listen on the default url path (http://localhost)
app.get("/about", function(req,res){
  res.redirect("About<br /><a href='/about'>Go to the about page</a>");
});

// setup another route to listen on /about
app.get("/about", function(req,res){
  res.sendFile(path.join(__dirname, "/views/about.html"));
});

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);