import { app, BrowserWindow, screen, ipcMain } from 'electron';
import path from 'path';

function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    const win = new BrowserWindow({
        x: Math.floor((width - 1400) / 2),
        y: Math.floor((height + 500) / 2),
        width: 500,
        height: 200,
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