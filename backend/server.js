require('dotenv').config()
const express = require('express');
const socketIO = require('./services/hat-socket');
const cors = require('cors');
const passport = require('passport');
const body_parser = require('body-parser');
const mongoose = require('mongoose')
const authController = require('./controllers/auth-controller');
const crud = require('./controllers/crud');
const passportSetup = require('./config/passport-auth')

// setup the webapp
var app = express();
app.use(body_parser.json());
app.use(express.static('backend')); // sets pwd

mongoose.connect(process.env.MONGO_CONNECTION,
	{useNewUrlParser: true, useUnifiedTopology: true}
)

// initalize passport
app.use(passport.initialize());

// use cors to allow the angular server to access the api
app.use(cors({ origin: process.env.FRONTEND_URL }));

// routing
app.use('/api/auth', authController)
app.use('/api/crud', crud);

// starts the node server
var server = app.listen(process.env.APP_PORT, () => 
	console.log(`listening on port ${process.env.APP_PORT}...`))

socketIO(server);
