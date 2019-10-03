const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  if (req.mysession.seenyou === true) {
    res.writeHead(301, { Location: 'http://localhost:3001/listPageHome' });
    res.end();
  }
  res.writeHead(200, { 'Content-Type': 'text/html' });
  fs.createReadStream(path.join(__dirname, '/../views/home.html')).pipe(res);
};
