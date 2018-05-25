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

// socket io variables
var room = null
var lobby = []
this_user = null

io.on('connection', (socket) =>{
  // only comes out when we have contacted the client too
	console.log('made socket connection', socket.id);

	// connect to a room
	socket.on('room', (client)=>{
		room = client
		socket.join(room)
	})

	socket.on('join', (user)=>{
		user_data = {
			name: user.name,
			username: user.username,
			photo: user.photo
		}
		this_user = lobby.length
		lobby[lobby.length] = user_data
		console.log('this user: ', this_user);
		io.sockets.in(room).emit('user-data', user_data) // sends user info to client for ui
		io.sockets.to(socket.id).emit('lobby', lobby)
	})

	socket.on('add-to-hat', (restaurant)=>{
		socket.to(room).emit('choice', restaurant)
	})

	socket.on('disconnect', ()=>{
		// handle case when a user leaves the app
		console.log(socket.id+' has disconnected');
		// updates the lobby of the users still connected:
		console.log('current lobby: ', lobby);
		console.log('user gone: ', this_user);
		console.log('to delete: ', lobby[this_user]);
		lobby.splice(this_user, 1)
		console.log(lobby);
		io.sockets.in(room).emit('update-lobby', lobby)
	});
});
