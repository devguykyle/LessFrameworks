const fs = require('fs');
const mongodb = require('mongodb');
const { parse } = require('querystring');
const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = function(req, res){


  if(!req.mysession.seenyou){//check session
  var MongoClient = mongodb.MongoClient;
  var db;

  var user = {};

  let body = ''; //prepare for json req body

  req.on('data', chunk => {
      body += chunk.toString(); // convert Buffer to string
  });

  req.on('end', () => {
        var bodyParsed = parse(body);

        user = {
          username : bodyParsed.username,
          password : bodyParsed.password,
          email: bodyParsed.email
        }
      });

      MongoClient.connect("mongodb://<db>:<db>@ds223509.mlab.com:23509/<db>", function(err, database){
        if(err){
          return console.error(err);
        }

        db = database.db("tctest"); //get ref to database


        db.createCollection("users",{
   validator: { $jsonSchema: {
      bsonType: "object",
      required: [ "username", "password", "email" ],
      properties: {
         username: {
            bsonType: "string",
            description: "must be a string and is required"
         },
         email: {
            bsonType : "string",
            pattern : "@mongodb\.com$",
            description: "must be a string and match the regular expression pattern"
         },
         password: {
            bsonType: "string",
            minLength: 8,
            maxLength: 20,
            description: "must be a string of length 8 minimum and 20 maximum"
         }
      }
   } },
   validationAction: "error" },function(err, res){ //create users collection
          if (err) console.log(err);
        });
        db.collection("users").createIndex( { "username": 1 }, { unique: true } );
        db.collection("users").createIndex( { "email": 1 }, { unique: true } );




        bcrypt.hash(user.password, saltRounds, function(err, hash) {
          user.password = hash; //hash passwords
          db.collection("users").insertOne(user, function(err, result){//add user
            if(err) console.log(err);

            db.collection("users").findOne({"username":user.username}, function(err, userToLog){ //login user
              if(err) throw err;

                 req.mysession.seenyou = true;
                 res.setHeader('X-Seen-You', 'false');
                 req.mysession.username = user.username;
                 req.mysession.id = result.insertedId;
                 res.writeHead(301, {Location: 'http://localhost:3001/listPageHome'});
                 res.end();

               });
             });
          });
        });
      }
      else {
        res.writeHead(301, {Location: 'http://localhost:3001/listPageHome'}); //redirect without session setup
        res.end();
      }
  };
