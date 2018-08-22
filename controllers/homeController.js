const fs = require('fs');

module.exports = function(req, res){


    if(req.mysession.seenyou === true){
      res.writeHead(301, {Location: 'http://localhost:3001/listPageHome'}); //go to main page if logged in
      res.end();
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream(__dirname + "/../views/home.html").pipe(res);

};
