import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';

function createWindow() {
    const win = new BrowserWindow({
        x: 400,
        y: 1600,
        width: 200,
        height: 500,
        transparent: true,
        frame: false,
        alwaysOnTop: false,
        hasShadow: false,
        resizable: false,
        skipTaskbar: true,
        movable: true,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
            webSecurity: false,
        },
    });

    win.setIgnoreMouseEvents(false);
    win.setIgnoreMouseEvents(false);
    win.setMovable(true);
        win.setIgnoreMouseEvents(false);
    win.setMovable(true);
    win.loadFile(path.join('index.html'));
  }
  
  app.whenReady().then(createWindow);