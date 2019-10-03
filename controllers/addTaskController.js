const mongodb = require('mongodb');

module.exports = (req, res) => {
  const MongoClient = mongodb.MongoClient;

  let db = null;
  let taskParsed = {};

  if (req.mysession.seenyou === true) {
    let body = ''; // prepare for json req body

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      taskParsed = JSON.parse(body);
    });

    MongoClient.connect('mongodb://<db>:<db>@ds223509.mlab.com:23509/<db>', (err, database) => {
      if (err) {
        return false; // add a logger
      }

      db = database.db('tctest');

      db.createCollection('tasks', {
        validator: {
          $jsonSchema: {
            bsonType: 'object',
            required: ['task', 'assignee'],
            properties: {
              task: {
                bsonType: 'string',
                description: 'must be a string and is required',
              },
              assignee: {
                bsonType: 'string',
                pattern: '@mongodb.com$',
                description: 'must be a string and match the regular expression pattern',
              },
            },
          },
        },
        validationAction: 'error',
      }, (error, resp) => { // create users collection
        if (error) {
          return false;
        }
        return resp;
      });
      db.collection('tasks').createIndex({ task: 1 });
      db.collection('tasks').createIndex({ assignee: 1 });


      db.collection('tasks').insertOne(taskParsed, (err, result) => {
        if (err) {
          return false;
        }
        return result;
      });
      res.end(JSON.stringify({ task: taskParsed.task, assignee: taskParsed.assignee }));
      return 'foo';
    });
  } else {
    res.writeHead(301, { Location: 'http://localhost:3001/listPageHome' });
    res.end();
  }
};
