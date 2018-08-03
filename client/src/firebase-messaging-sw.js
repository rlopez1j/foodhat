importScripts('https://www.gstatic.com/firebasejs/4.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.6.1/firebase-messaging.js');

firebase.initializeApp({
  'messagingSenderId': '395091311151' // find a way to make this private
});
const messaging = firebase.messaging();
