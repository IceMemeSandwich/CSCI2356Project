/**
 * Connor MacNeil, Devin Robar
 * A00445228
 * 
 */

 const express = require("express"); // start express application
 const app = express(); // define top level function
 const port = 3111;
 
// for now we only need 3 blogs
let posts = {
    '1':{
       "title":"",
       "post":"",
       "posted": false
    },
    '2':{
       "title":"",
       "post":"",
       "posted": false
    },
    '3':{
       "title":"",
       "post":"",
       "posted": false
    }
 };
 
app.use(express.json()); // implement JSON recognition
app.use(express.urlencoded({ extended: true })); // implement incoming name:value pairs to be any type

let allowCrossDomain = function (req, res, next) {
res.header("Access-Control-Allow-Origin", "*"); // allow any origin
res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE"); // allow any method
res.header("Access-Control-Allow-Headers", "Content-Type"); // accept only headers with this type
next(); // middleware callback function required for processing
};
app.use(allowCrossDomain); // implement allowable domain characteristics

// setting input boxes at page load
app.get("/receive", function (req, res) {
    console.log(req.url);
    return res.status(200).send(posts);
  });

// template of receiving:
// {
//     "id":"",
//     "name":"",
//     "post":""
//  }
app.post("/send", function (req, res) {
    console.log("Id #" + req.body.id + ", Title: " + req.body.title + ", Post: " + req.body.post);
    let publish = (req.body.publish === 'true');
    switch (publish) {
      case false:
         posts[req.body.id]["posted"] = publish;
         break;
      case true:
         posts[req.body.id]["title"] = req.body.title;
         posts[req.body.id]["post"] = req.body.post;
         posts[req.body.id]["posted"] = publish;
         console.log("posts");
         break;
    }
});

// makes this program run on the port that was set at the top of the script
app.listen(port, function () {
    console.log("Running on port: " + port);
});