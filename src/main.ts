import path from 'path';
import { BrowserWindow, app } from 'electron';

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

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: path.resolve(__dirname, 'preload.js'),
        },
        width: 600,
        height: 645,
    });

    if (isDev) {
        // 開発モードの場合はデベロッパーツールを開く
        mainWindow.webContents.openDevTools({ mode: 'detach' });
    }

    // レンダラープロセスをロード
    mainWindow.loadFile('dist/index.html');
};

app.whenReady().then(async () => {
    createWindow();
})

app.once('window-all-closed', () => app.quit());
