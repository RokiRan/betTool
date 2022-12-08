const initWs = () => {
  // 初始化express服务
  // const express = require('express');
  // const app = express();
  // const port = 80;
  // app.get('/', (req, res) => {
  //   res.send('Hello World!');
  //   // 允许跨域
  //   res.header('Access-Control-Allow-Origin', '*');
  // });
  // app.get('socket.io', (req, res) => {
  //   res.send('Hello World!');
  //   // 允许跨域
  //   res.header('Access-Control-Allow-Origin', '*');
  // });
  // app.listen(port, () => {
  //   console.log(`Example app listening at http://localhost:${port}`);
  // });
  // // 初始化scokett.io服务
  // const server = require('http').createServer(app);
  // const io = require('socket.io')(server, {
  //   cors: true,
  // });
  // io.on('connection', (socket) => {
  //   console.log('a user connected');
  //   socket.on('disconnect', () => {
  //     console.log('user disconnected');
  //   });
  //   socket.on('chat message', (msg) => {
  //     console.log;
  //     io.emit('chat message', msg);
  //   });
  // });
  const app = require('express')();
  const http = require('http').Server(app);
  const io = require('socket.io')(http, {
    cors: true,
  });
  app.get('/', function (req, res) {
    res.send('<h1>Welcome Realtime Server</h1>');
  });

  http.listen(80, function () {
    console.log('listening on *:80');
  });
  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
      console.log;
      io.emit('chat message', msg);
    });
  });
};

export default initWs;
