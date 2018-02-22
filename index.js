var express = require('express');
var socket = require('socket.io');

var app = express()
var server = app.listen(3000, function(){
	console.log('listening on port 3000...')
});

app.use(express.static('public'));

var io = socket(server)
io.on('connection', (socket) =>{
  // only comes out when we have contacted the client too
	console.log('made socket connection', socket.id)
});
