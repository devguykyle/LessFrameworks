const fs = require('fs');

module.exports = function(req, res){


    if(req.mysession.seenyou === true){
      res.writeHead(200, {'Content-Type': 'text/html'});
      fs.createReadStream(__dirname + "/../views/ourList.html").pipe(res);
    }
    else {
      res.writeHead(301, {Location: 'http://localhost:3001/'});
      res.end(JSON.stringify({errors: "Must be logged in to see list"}));
    }

};
