const fs = require("fs");

var posts = []
var categories = []

exports.initialize = () => 
{
    return new Promise ((resolve, reject) =>
     {
        fs.readFile('./data/posts.json', 'utf8', (err,data) => 
        {
            if (err) 
            {
                reject("unable to read file");
            }
            else 
            {
                posts = JSON.parse(data);
            }
        });

        fs.readFile('./data/categories.json', 'utf8', (err,data)=> 
        {
            if (err) 
            {
                reject("unable to read file");
            }
            else 
            {
                categories = JSON.parse(data);
            }
        });
        resolve();
    })
};

exports.getAllPosts = () => 
{
    return new Promise ((resolve,reject) => 
    {
        if (posts.length == 0) 
        {
            reject('no results returned');
        }
        else 
        {
            resolve(posts);
        }
    })
};

exports.getPublishedPosts = () => 
{
    return new Promise ((resolve, reject) => 
    {
        var publishposts = posts.filter(post => post.published == true);
       
        if (publishposts.length == 0) 
        {
            reject('no results returned');
        }
        resolve(publishposts);
    })
};

exports.getCategories = () => 
{
    return new Promise ((resolve,reject) => 
    {
        if (categories.length == 0) 
        {
            reject('no results returned');
        }
        else 
        {
            resolve(categories);
        }
    })
};
module.exports.addPost = (postData) => {
    return new Promise(function(resolve,reject){
      try{
       postData.published=(postData.published)?true:false;
       postData.id=posts.length+1;
        posts.push(postData);
       resolve(postData);
    }catch(err){
      reject();
    }
  });
  }
  getPostsByCategory = (category) => {
    {
      return new Promise(function(resolve,reject){
        var array_posts=[];
        var j=0;
            for (var i=0;i<posts.length;i++)
             {
                   if (posts[i].category==category)
                    {
                      array_posts[j++]=posts[i];
                    }
              }
             if(array_posts.length==0)
             {
               reject("no results returned");
             }
             else{   
              resolve(array_posts);}
        });
    }
}

getPostsByMinDate = (minDateStr) => {
    {
    return new Promise(function(resolve,reject){
      var array_date_posts=[];
      var j=0;    
          for (var i=0;i<posts.length;i++)
           {
                 if(new Date(posts[i].postDate) >= new Date(minDateStr))
                  {
                    array_date_posts[j++]=posts[i];
                  }
            }
           if(array_date_posts.length==0)
           {
             reject("no results returned");
           }
           else{   
            resolve(array_date_posts);}
         });
    }
}
  getPostById = (id) => {
    return new Promise((resolve,reject)=>{
       var array_id=[];
       var j=0;
        for(var i=0;i<posts.length;i++)
        {
            if(posts[i].id==id)
            {
                array_id[j++]=posts[i];
            }
        }

        if(array_id.length==0)
        {
        reject("no results returned");
        }   
        else
        {
          resolve(array_id);
        } 
    });
 }