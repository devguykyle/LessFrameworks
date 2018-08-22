const fs = require('fs');
const http = require('http');
const sessions = require('client-sessions');
const pubRoutes = require('./controllers/publicRoutes.js');
const home = require('./controllers/homeController.js');
const register = require('./controllers/registerController.js');
const listHome = require('./controllers/listHomeController.js');
const logout = require('./controllers/logoutController.js');
const login = require('./controllers/loginController.js');
const addTask = require('./controllers/addTaskController.js');

//setup cookis/sessions handler
var requestSessionHandler = sessions({
  cookieName: 'mysession',
  secret: '0909090909090',
  duration: 24 * 60 * 60 * 1000,
  activeDuration: 1000 * 60 * 5
});

var server = http.createServer(function(req, res){ //create server

 requestSessionHandler(req, res, function(){ //filter req/res through session handler

   if(req.url.includes('/public')){ //JS, CSS, Images
     pubRoutes(req, res);
   }

   else if(req.url === "/" || req.url === "home"){
     home(req, res);
   }

   else if (req.url === '/register') {
     register(req, res);
   }

   else if(req.url === "/listPageHome"){
     listHome(req, res);
   }

   else if(req.url === "/logout"){
     logout(req, res);
   }

   else if (req.url === '/login') {
     login(req, res);
   }

   else if (req.url === '/addTask') {
     addTask(req, res);
   }
   else {
     res.writeHead(200, {'Content-Type': 'text/plain'});
     res.end("404 error");
   }


  });
});

server.listen(3001, '127.0.0.1');
console.log('listening on port 3001');
