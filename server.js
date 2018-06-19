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
var room = null // room name
var lobby = new Map() // lobby of users
this_user = null // current user in the scope
duplicate = false

io.on('connection', (socket) =>{
  // only comes out when we have contacted the client too
	console.log('made socket connection', socket.id);

	// connect to a room
	socket.on('room', (client)=>{
		room = client
		socket.join(room)
	})

	socket.on('join', (user)=>{
		lobby.forEach((current_user, key)=>{
			if(user.username == current_user.username){ // user already in lobby
					console.log('you\'re already in here!')
					lobby.delete(key)
					return
			}
		})
		console.log('with dup: ', lobby);
		user_data = {
			name: user.name,
			username: user.username,
			photo: user.photo
		}
		this_user = lobby.length
		lobby.set(socket.id, user_data) // updates the lobby

		io.sockets.in(room).emit('user-data', user_data, socket.id) // sends user info to client for ui

		io.sockets.to(socket.id).emit('lobby', Array.from(lobby)) // converts to array bc socket.io cant transcribe maps
		duplicate = false
	})

	socket.on('add-to-hat', (restaurant, user)=>{
		restaurant['user'] = user.name
		socket.to(room).emit('choice', restaurant)
	})

	// handle case when a user leaves the app
	socket.on('disconnect', ()=>{
		console.log(socket.id+' has disconnected');
		// new_hat = hat.filter(data => data.name != lobby.get(socket.id).name)
		// new_hat = new Array
		lobby.delete(socket.id) // best way to remove the disconnected user from the lobby
		io.sockets.in(room).emit('update-lobby', Array.from(lobby)) // same as line 71
	});
});
