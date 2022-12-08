const initWs = () => {
  // 初始化express服务
  const express = require('express');
  const app = express();
  const port = 4000;
  app.get('/', (req, res) => {
    res.send('Hello World!');
    // 允许跨域
    res.header('Access-Control-Allow-Origin', '*');
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    // 初始化scokett.io服务
    const server = require('http').createServer(app);
    const io = require('socket.io')(server, {
      cors: true,
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
  });
};

export default initWs;
