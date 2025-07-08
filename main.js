import { app, BrowserWindow } from 'electron';
import path from 'path';

function createWindow() {
    const win = new BrowserWindow({
        width: 200,
        height: 400,
        transparent: true,
        frame: false,
        alwaysOnTop: false,
        hasShadow: false,
        resizable: false,
        skipTaskbar: true,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
            webSecurity: false,
        },
    });

    win.setIgnoreMouseEvents(false);
    win.setMovable(true);
    win.loadFile(path.join('index.html'));
}

app.whenReady().then(createWindow);