const fs = require('fs');
const mongodb = require('mongodb');
const { parse } = require('querystring');
const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = function(req, res){

  if(req.mysession.seenyou === true){

  var MongoClient = mongodb.MongoClient;
  var db;

  var taskParsed = {};

  let body = ''; //prepare for json req body

  req.on('data', chunk => {
      body += chunk.toString(); // convert Buffer to string
  });

  req.on('end', () => {
        taskParsed = JSON.parse(body);
      });

      MongoClient.connect("mongodb://<db>:<db>@ds223509.mlab.com:23509/<db>", function(err, database){
        if(err){
          return console.error(err);
        }

        db = database.db("tctest"); //get ref to database

        db.createCollection("tasks",{
   validator: { $jsonSchema: {
      bsonType: "object",
      required: [ "task", "assignee"],
      properties: {
         task: {
            bsonType: "string",
            description: "must be a string and is required"
         },
         assignee: {
            bsonType : "string",
            pattern : "@mongodb\.com$",
            description: "must be a string and match the regular expression pattern"
         },
      }
   }
  },
   validationAction: "error" },function(err, res){ //create users collection
          if (err) console.log(err);
        });
        db.collection("tasks").createIndex( { "task": 1 });
        db.collection("tasks").createIndex( { "assignee": 1 });


          db.collection("tasks").insertOne(taskParsed, function(err, result){//add user
            if(err) console.log(err);


          });
          res.end(JSON.stringify({task: taskParsed.task, assignee: taskParsed.assignee}));

        });

      }
      else {
        res.writeHead(301, {Location: 'http://localhost:3001/listPageHome'});
        res.end();
      }
  };
