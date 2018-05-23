const express = require('express');
const socket = require('socket.io');
const cors = require('cors');
const passport = require('passport');
const cookie = require('cookie-session');
const body_parser = require('body-parser');

const routes = require('./routes/routing');
const landing_pages = require('./routes/landing');
const google = require('./routes/google');
const crud = require('./routes/crud');
const passport_setup = require('./passport/passport_google');
const KEYS = require('./api_keys/keys');

// setup the webapp
var app = express();
app.use(body_parser.json());
app.use(express.static('public')); // sets pwd
app.use(cookie({
	maxAge: 30*60*60*1000, // 30 days in milliseconds
	keys: [KEYS.SESSION.COOKIE_KEY]
}));


// initalize passport
app.use(passport.initialize());
app.use(passport.session());

// use cors to allow the angular server to access the api
app.use(cors({
	origin: 'http://localhost:4200'
}));

// routing
app.use('/api/google', google);
app.use('/api/crud', crud);

// starts the node server
var server = app.listen(3000, function(){
	console.log('listening on port 3000...');
});

// initializes socket.io
var io = socket(server);
var room = null
io.on('connection', (socket) =>{
  // only comes out when we have contacted the client too
	console.log('made socket connection', socket.id);

	// connect to a room
	socket.on('room', (client)=>{
		room = client
		socket.join(room)
		io.sockets.in(room).emit('message', 'in room '+room) // for debugging
	})
	socket.on('disconnect', ()=>{
		// handle case when a user leaves the app
		console.log(socket.id+' has disconnected');
	});
});
