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

var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
var path = require('path');
var blogservice = require(__dirname + '/blog-service');
app.use(express.static('public')); 

onHttpStart = () => 
{
    console.log('Express http server listening on ' + HTTP_PORT);
}

app.use(express.static('public'));

app.get('/', (req, res) =>
{
    res.redirect('/about')
});

app.get('/about', (req, res) => 
{
    res.sendFile(path.join(__dirname + "/views/about.html"));
});

app.get("/blog", (req, res) => 
{
    blogservice.getPublishedPosts().then((data) =>
    {
        res.json({data});
    }).catch((err) => {
        res.json({message: err});
    })
});

app.get("/data/posts.json", (req, res) => 
{
    blogservice.getAllPosts().then((data) =>
    {
        res.json({data});
    }).catch((err) => {
        res.json({message: err});
    })
});

app.get("/data/categories.json", (req, res) => 
{
    blogservice.getCategories().then((data) =>
    {
        res.json({data});
    }).catch((err) => {
        res.json({message: err});
    })
});

app.get('*', function(req, res){
    res.status(404).send("Page Not Found!");
  });

blogservice.initialize().then(() => 
{
    app.listen(HTTP_PORT, onHttpStart());
}).catch (() => {
    console.log("ERROR : From starting the server");
});