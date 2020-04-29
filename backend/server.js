require('dotenv').config()
const express = require('express');
const socketIO = require('./services/hat-socket');
const cors = require('cors');
const passport = require('passport');
const cookie = require('cookie-session');
const body_parser = require('body-parser');
const mongoose = require('mongoose')
const google = require('./routes/google');
const crud = require('./routes/crud');

// setup the webapp
var app = express();
app.use(body_parser.json());
app.use(express.static('backend')); // sets pwd
app.use(cookie({
	maxAge: 30*60*60*1000, // 30 days in milliseconds
	keys: [process.env.SESSION_COOKIE_KEY]
}));

mongoose.connect(process.env.MONGO_CONNECTION,
	{useNewUrlParser: true, useUnifiedTopology: true}
)

// initalize passport
app.use(passport.initialize());
app.use(passport.session());

// use cors to allow the angular server to access the api
app.use(cors({ origin: process.env.FRONTEND_URL }));

// routing
app.use('/api/google', google);
app.use('/api/crud', crud);

// starts the node server
var server = app.listen(process.env.APP_PORT, () => 
	console.log(`listening on port ${process.env.APP_PORT}...`))

socketIO(server);
