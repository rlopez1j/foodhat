const firebase = require('firebase-admin')
const admin_info = require('../api_keys/firebase-admin.json')
const FIREBASE = require('../api_keys/keys')

firebase.initializeApp({ // this initializes and authenticates firebase admin
	/*
		use this instead in production code:
	 	credential:	functions.config().firebase
	*/
	credential: firebase.credential.cert(admin_info),
	databaseURL: FIREBASE.FIRESTORE.DATABASE_URL
})
module.exports = firebase.firestore();
