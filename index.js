const http = require('http');
const socket =  require('socket.io')
const express = require('express')
const hostname = '127.0.0.1';
const port = 3000;

var app = express()

app.use(express.static('public'));

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello\n');
});

server.listen(port, hostname, () => {
  console.log('server running at http://${hostname}:${port}/');
});

var io = socket(server)

io.on('connection', (socket) =>{
  // io stuff here
  console.log('socket.io connection!')
})
