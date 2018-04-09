const express = require('express');
const socket = require('socket.io');
const ejs = require('ejs'); // not sure if i wanna keep using ejs
const routes = require('./routes/routing');
const landing_pages = require('./routes/landing');
const google_oauth = require('./routes/google_oauth');
const cors = require('cors');

// setup the webapp
var app = express();
app.use(express.static('public')); // sets pwd
app.set('view engine', 'ejs');

// use cors to allow the angular server to access the api
app.use(cors({
	origin: 'http://localhost:4200'
}));

// routing
app.use('/api/google', google_oauth);

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
