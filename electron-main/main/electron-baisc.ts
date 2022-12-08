import { ipcMain } from 'electron';

const registerEvents = () => {
  ipcMain.on('event_from_renderer', (event, data) => {
    console.log('event_from_renderer->data:', data);
    switch (data.param) {
      case 'close':
        console.log('close');
        break;
      default:
        break;
    }
  });

  // ipcMain.on('event_from_renderer_need_replay', (event, data) => {
  //   console.log('event_from_renderer_need_replay->data:', data);
  //   event.reply('event_from_main_replay', '【渲染进程，你的消息我已收到】');
  // });
};

export default {
  registerEvents,
};
