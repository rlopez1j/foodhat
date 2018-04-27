const express = require('express');
const socket = require('socket.io');
const cors = require('cors');
const passport = require('passport');
const cookie = require('cookie-session')

const routes = require('./routes/routing');
const landing_pages = require('./routes/landing');
const google = require('./routes/google');
const passport_setup = require('./passport/passport_google');
const KEYS = require('./api_keys/keys')

// setup the webapp
var app = express();
app.use(express.static('public')); // sets pwd
app.use(cookie({
	maxAge: 30*60*60*1000, // 30 days in milliseconds
	keys: [KEYS.SESSION.COOKIE_KEY]
}));


// initalize passport
app.use(passport.initialize())
app.use(passport.session())

// use cors to allow the angular server to access the api
app.use(cors({
	origin: 'http://localhost:4200'
}));

// routing
app.use('/api/google', google);

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
