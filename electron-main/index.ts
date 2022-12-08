import { app, BrowserWindow, screen } from 'electron';
import is_dev from 'electron-is-dev';
import { join } from 'path';
import electronBaisc from './main/electron-baisc';
import { initWs, io } from './main/service';
let mainWindow: BrowserWindow | null = null;

class createWin {
  constructor() {
    const displayWorkAreaSize = screen.getAllDisplays()[0].workArea;
    mainWindow = new BrowserWindow({
      width: parseInt(`${displayWorkAreaSize.width * 0.85}`, 10),
      height: parseInt(`${displayWorkAreaSize.height * 0.85}`, 10),
      movable: true,
      // frame: false,
      show: false,
      center: true,
      resizable: true,
      // transparent: true,
      titleBarStyle: 'default',
      webPreferences: {
        devTools: true,
        contextIsolation: false,
        nodeIntegration: true,
        //enableRemoteModule: true,
        webSecurity: false, //解决：打包后出现跨域问题
      },
      backgroundColor: '#fff',
    });
    const URL = is_dev
      ? `http://localhost:${process.env.PORT}` // vite 启动的服务器地址
      : `file://${join(__dirname, '../index.html')}`; // vite 构建后的静态文件地址

    mainWindow.loadURL(URL);

    mainWindow.on('ready-to-show', () => {
      mainWindow?.show();
      // 注册事件
      registerEvents.call(this);
    });
  }
}

app.whenReady().then(() => new createWin());

const isFirstInstance = app.requestSingleInstanceLock();

if (!isFirstInstance) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      mainWindow.focus();
    }
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    new createWin();
  }
});

//-----------------------------------------------------------------------------------
// 在这个文件中，你可以包含应用程序剩余的所有部分的代码，
// 也可以拆分成几个文件，然后用 require 导入。
//-----------------------------------------------------------------------------------
function registerEvents() {
  electronBaisc.registerEvents();
}

initWs();
