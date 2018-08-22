const fs = require('fs');

module.exports = function(req, res){

      req.mysession.reset();
      res.writeHead(301, {Location: 'http://localhost:3001/'});//go home after logout
      fs.createReadStream(__dirname + "/../views/home.html").pipe(res)
      res.end();

};
