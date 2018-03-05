const express = require('express');
const socket = require('socket.io');
const ejs = require('ejs'); // not sure if i wanna keep using ejs
const routes = require('./routes/routing');
const landing_pages = require('./routes/landing');
const google_oauth = require('./routes/google_oauth');

// setup the webapp
var app = express();
app.use(express.static('public')); // sets pwd
app.set('view engine', 'ejs');

// routing
app.use('/home', routes);
app.use('/', landing_pages); // probably won't need this in the future
app.use('google/', google_oauth);

// starts the node server
var server = app.listen(3000, function(){
	console.log('listening on port 3000...');
});

// initializes socket.io
var io = socket(server);
io.on('connection', (socket) =>{
  // only comes out when we have contacted the client too
	console.log('made socket connection', socket.id);

	socket.on('disconnect', ()=>{
		// handle case when a user leaves the app
		console.log(socket.id+' has disconnected');
	})
});
