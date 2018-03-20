const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX))
  .listen(PORT, () => console.log(`Listening to ${ PORT}...`));

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client has been connected to Socket.io');
  socket.on('disconnect', () => {
    console.log('Client has been disconnected from Socket.io');
  });
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
