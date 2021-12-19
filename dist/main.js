"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const electron_1 = require("electron");
const electron_store_1 = __importDefault(require("electron-store"));
const isDev = process.env.NODE_ENV === 'development';
const execPath = process.platform === 'win32'
    ? '../node_modules/electron/dist/electron.exe'
    : '../node_modules/.bin/electron';
// 開発モードの場合はホットリロードする
if (isDev) {
    require('electron-reload')(__dirname, {
        electron: path_1.default.resolve(__dirname, execPath),
        forceHardReset: true,
        hardResetMethod: 'exit',
    });
}
const store = new electron_store_1.default();
const createWindow = () => {
    let pos = store.get("window.pos", [0, 0]);
    let size = store.get("window.size", [600, 620]);
    const mainWindow = new electron_1.BrowserWindow({
        webPreferences: {
            preload: path_1.default.resolve(__dirname, 'preload.js'),
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
    });
};
electron_1.app.whenReady().then(async () => {
    createWindow();
});
electron_1.app.once('window-all-closed', () => electron_1.app.quit());
//# sourceMappingURL=main.js.map