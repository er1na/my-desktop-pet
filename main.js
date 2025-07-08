const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 200,
        height: 200,
        transparent: true,
        frame: false,
        alwaysOnTop: true,
        hasShadow: false,
        resizable: false,
        skipTaskbar: true,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
        },
    });

    win.setIgnoreMouseEvents(true);
    win.loadFile(path.join('index.html'));
}

app.whenReady().then(createWindow);