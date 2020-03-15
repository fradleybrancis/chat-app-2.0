const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 8080;

app.use(express.static(path.resolve(__dirname, '../build')));

const messages = [];

const users = []; 

io.on('connection', (client) => {
  if (users.length) client.emit('add recipient', users[0]);

  client.on('add user', (user) => {
    client.username = user;
    users.push(user);
    client.broadcast.emit('add recipient', user);
  });

  client.on('append message', (data) => {
    messages.push({ username: data.username, text: data.text, time: data.time });
    io.emit('append message', data);
  });

  client.on('disconnect', () => {
    console.log('User disconnected');
  })
});

server.listen(port, () => console.log('listening on port ', port));