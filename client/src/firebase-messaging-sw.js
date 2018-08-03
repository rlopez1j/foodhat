import KEYS from '../../api_keys/keys'

importScripts('https://www.gstatic.com/firebasejs/4.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.6.1/firebase-messaging.js');
firebase.initializeApp({
  'messagingSenderId': KEYS.FIREBASE.MESSAGING_SENDER_ID
});
const messaging = firebase.messaging();
