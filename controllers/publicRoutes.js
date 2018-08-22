const fs = require('fs');
module.exports = function(req, res){

  var reqUrl = req.url;


    if(reqUrl.includes('.css')){
      res.writeHead(200, {'Content-Type': 'text/css'});
    }

    else if(reqUrl.includes('.jpg') || reqUrl.includes('.jpeg')){
      res.writeHead(200, {'Content-Type': 'image/jpeg'});
    }

    else if(reqUrl.includes('.js')){
      res.writeHead(200, {'Content-Type': 'application/javascript'});
    }

    else if(reqUrl.includes('.png')){
      res.writeHead(200, {'Content-Type': 'image/png'});
    }

    else if(reqUrl.includes('.mp4')){
      res.writeHead(200, {'Content-Type': 'video/mp4'});
    }
    else {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('resouce not found');
    }
    fs.createReadStream(__dirname + "/../" + req.url).pipe(res);


};
