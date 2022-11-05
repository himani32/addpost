/*********************************************************************************
 *  WEB322 – Assignment 04
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part
 *  of this assignment has been copied manually or electronically from any other source
 *  (including 3rd party web sites) or distributed to other students.
 *
 *  Name: Himani 
 * Student ID: 155567217
 *  Date: 11/04/2022
 *
 *  Online (Cyclic) Link: https://beret-lobster.cyclic.app 
 *
 ********************************************************************************/

 const fs = require("fs");
 const { Module } = require("module");
 
 let posts = [];
 let categories = [];
 
 module.exports.initialize = function () {
   return new Promise((resolve, reject) => {
     fs.readFile("./data/posts.json", "utf8", (err, data) => {
       if (err) {
         reject(err);
         return;
       }
 
       posts = JSON.parse(data);
 
       fs.readFile("./data/categories.json", "utf8", (err, data) => {
         if (err) {
           reject(err);
           return;
         }
 
         categories = JSON.parse(data);
         resolve();
       });
     });
   });
 };
 
 module.exports.getAllPosts = function () {
   return new Promise((resolve, reject) => {
     if (posts.length == 0) {
       reject("query returned 0 results");
       return;
     }
     resolve(posts);
   });
 };
 
 module.exports.getPublishedPosts = function () {
   return new Promise(function (resolve, reject) {
     var publishedPosts = [];
 
     for (let i = 0; i < posts.length; i++) {
       if (posts[i].published === true) {
         publishedPosts.push(posts[i]);
       }
     }
 
     if (publishedPosts.length == 0) {
       reject("query returned 0 results");
       return;
     }
 
     resolve(publishedPosts);
   });
 };
 
 module.exports.getPostsByCategory = function (category) {
   return new Promise(function (resolve, reject) {
     var postsByCategory = [];
 
     for (let i = 0; i < posts.length; i++) {
       if (posts[i].category == category) {
         postsByCategory.push(posts[i]);
       }
     }
     if (postsByCategory.length == 0) {
       reject("query returned 0 results");
       return;
     }
     resolve(postsByCategory);
   });
 };
 
 module.exports.getPublishedPostsByCategory = function (category) {
   return new Promise(function (resolve, reject) {
     var publishedPostsByCategory = [];
     for (let i = 0; i < posts.length; i++) {
       if (posts[i].published == true && posts[i].category == category) {
         publishedPostsByCategory.push(posts[i]);
       }
     }
 
     if (publishedPostsByCategory.length == 0) {
       reject("query returned 0 results");
       return;
     }
     resolve(publishedPostsByCategory);
   });
 };
 
 module.exports.getPostsByMinDate = function (minDateStr) {
   return new Promise(function (resolve, reject) {
     var postsByMinDate = [];
 
     for (let i = 0; i < posts.length; i++) {
       if (new Date(posts[i].postDate) >= new Date(minDateStr)) {
         postsByMinDate.push(posts[i]);
       }
     }
 
     if (postsByMinDate.length == 0) {
       reject("query returned 0 results");
       return;
     }
 
     resolve(postsByMinDate);
   });
 };
 
 module.exports.getPostById = function (id) {
   return new Promise(function (resolve, reject) {
     var postById = [];
 
     for (let i = 0; i < posts.length; i++) {
       if (posts[i].id == id) {
         postById.push(posts[i]);
       }
     }
 
     if (postById.length == 0) {
       reject("query returned 0 results");
       return;
     }
     resolve(postById);
   });
 };
 
 module.exports.getCategories = function () {
   return new Promise((resolve, reject) => {
     if (categories.length == 0) {
       reject("query returned 0 results");
       return;
     }
     resolve(categories);
   });
 };
 
 module.exports.addPost = function (postData) {
   return new Promise(function (resolve, reject) {
     postData.published = postData.published ? true : false;
     postData.id = posts.length + 1;
 
     let currentDate = new Date(),
       month = "" + (currentDate.getMonth() + 1),
       day = "" + currentDate.getDate(),
       year = currentDate.getFullYear();
 
     if (month.length < 2) month = "0" + month;
     if (day.length < 2) day = "0" + day;
 
     postData.postDate = year + "-" + month + "-" + day;
     posts.push(postData);
 
     resolve();
   });
 };
 