import path from 'path';
import { BrowserWindow, app } from 'electron';

import Store from 'electron-store';

const isDev = process.env.NODE_ENV === 'development';

const execPath =
    process.platform === 'win32'
        ? '../node_modules/electron/dist/electron.exe'
        : '../node_modules/.bin/electron';

// 開発モードの場合はホットリロードする
if (isDev) {
    require('electron-reload')(__dirname, {
        electron: path.resolve(__dirname, execPath),
        forceHardReset: true,
        hardResetMethod: 'exit',
    });
}

const store = new Store();

const createWindow = () => {
    let pos: any = store.get("window.pos", [0, 0]);
    let size: any = store.get("window.size", [600, 620]);

    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: path.resolve(__dirname, 'preload.js'),
        },
        x: pos[0],
        y: pos[1],
        width: size[0],
        height: size[1],
    });

    mainWindow.setMenu(null);

    if (isDev) {
        // 開発モードの場合はデベロッパーツールを開く
        mainWindow.webContents.openDevTools({ mode: 'detach' });
    }

    // レンダラープロセスをロード
    mainWindow.loadFile('dist/index.html');

    mainWindow.on('close', () => {
        store.set("window.pos", mainWindow.getPosition());
        store.set("window.size", mainWindow.getSize());
    })
};

app.whenReady().then(async () => {
    createWindow();
})

app.once('window-all-closed', () => app.quit());
