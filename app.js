const express = require('express');
const routes = require('./routes/routes');
const cors = require('cors');

const app = express();
const bodyParser     = require('body-parser');

app.use(bodyParser.json({ extended: true }));


const passport = require('passport');
const http = require('http');
const io = require('socket.io');


const server = http.Server(app);
const socketIO = io(server);


app.use(cors());
app.use(function(req, res, next){
  req.io = socketIO;
  next();
});

app.use(bodyParser.urlencoded({extended: true}));

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);


// app.listen(8050,'0.0.0.0', function() {
// console.log("port 5000 running");
// })

server.listen(5000,'0.0.0.0', function() {
  console.log("API Server running at port 5000");

});
