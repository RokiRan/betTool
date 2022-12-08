import { ipcMain } from 'electron';

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: true,
});
const initWs = () => {
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
ipcMain.on('event_from_renderer_need_replay', (event, data) => {
  console.log('event_from_renderer_need_replay->data:', data);
  // 广播信息
  io.emit('chat message', data);
  event.reply('event_from_main_replay', '【渲染进程，你的消息我已收到】');
});
export { initWs, io };
