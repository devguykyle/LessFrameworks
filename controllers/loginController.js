const fs = require('fs');
const mongodb = require('mongodb');
const { parse } = require('querystring');
const bcrypt = require('bcrypt');


const saltRounds = 10;

module.exports = function(req, res){

  var MongoClient = mongodb.MongoClient; //grab mongo
  var db;


    let body = ''; //prepare for json req body
    var user = {};
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
      });

      req.on('end', () => { // parse JSON on reciept
        user = parse(body);
      });
      //
      MongoClient.connect("mongodb://<db>:<db>@ds223509.mlab.com:23509/<db>", function(err, database){
        if(err){
          return console.error(err);
        }

        db = database.db("tctest"); //get ref to database
        usersFaculty = parse(body);
        db.collection("users").findOne({"username": usersFaculty.username}, function(err, userToLog){
          if(err) throw err;
          if(!userToLog){
            console.log("not a user");
          }

          const hash = userToLog.password.toString();
          bcrypt.compare(user.password, hash, function(err, response){ //compare hashed passwords in DB

            if(response === true){

              req.mysession.seenyou = true;
              res.setHeader('X-Seen-You', 'false');
              req.mysession.username = user.username;
              req.mysession.id = userToLog._id;
              res.writeHead(301, {Location: 'http://localhost:3001/listPageHome'});
              res.end();
            }
          });
        });

      });

}
