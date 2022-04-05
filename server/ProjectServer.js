/**
 * Connor MacNeil, Devin Robar
 * A00445228, A00446150
 *
 */

 const express = require("express"); // call express application
 let mysql = require("mysql2"); // call mysql application
 const app = express(); // define top level function
 const port = 3111;

// Connecting to the database (I'l put mine in for now)
// had to run this command on mysql server to get it working
let database = mysql.createConnection({
host: "127.0.0.1",
user: "d_robar",
password: "",  //! Leaving password blank for git
database: "d_robar",
connectTimeout: 10000,
});
database.connect();

// These are the commands that are used to make the tables that will be used
// CREATE TABLE Posts(
//    id INT PRIMARY KEY,
//    title VARCHAR(255),
//    post TEXT,
//    isPosted BOOLEAN NOT NULL
// );

// CREATE TABLE WordBank(
//    id INT PRIMARY KEY AUTO_INCREMENT,
//    word VARCHAR(255) NOT NULL UNIQUE
// );


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
app.get("/receive/:id", function (req, res) {
    console.log(req.params.id);
    database.query(
      "SELECT * FROM Posts WHERE id=?;",
      [request.params.id],

      function (err, res) {
        if (err)
          console.log(
            "An error has been thrown while searching for your record."
          );
        return res.status(200).send(req.params.id);
      }
    );
  });

// template of receiving:
// {
//     "id":"",
//     "name":"",
//     "post":""
//  }
app.post("/send", function (req, res) {
    console.log("Id #" + req.body.id + ", Title: " + req.body.title + ", Post: " + req.body.post);
    let publish = posts[req.body.id]["posted"];
    console.log(publish);
    switch (publish) {
      case true:
         posts[req.body.id]["posted"] = false;
         break;
      case false:
         posts[req.body.id]["title"] = req.body.title;
         posts[req.body.id]["post"] = req.body.post;
         posts[req.body.id]["posted"] = true;
         console.log("posts");
         break;
    }
    console.log(posts);
});


process.on("SIGTERM", function () {
  console.log("Shutting server down.");
  database.close();
  app.close();
});

// makes this program run on the port that was set at the top of the script
app.listen(port, function () {
    console.log("Running on port: " + port);
});
