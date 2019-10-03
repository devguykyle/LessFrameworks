const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  if (req.mysession.seenyou === true) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(path.join(__dirname, '/../views/ourList.html')).pipe(res);
  } else {
    res.writeHead(301, { Location: 'http://localhost:3001/' });
    res.end(JSON.stringify({ errors: 'Must be logged in to see list' }));
  }
};
