var express = require('express');
var socket = require('socket.io');
var routes = require('./routes/routing');
var landing_pages = require('./routes/landing');

var app = express();

app.use(express.static('public')); // this might be removed in the future

app.use('/home', routes)
app.use('/', landing_pages)

var server = app.listen(3000, function(){
	console.log('listening on port 3000...');
});

var io = socket(server);
io.on('connection', (socket) =>{
  // only comes out when we have contacted the client too
	console.log('made socket connection', socket.id)
});
