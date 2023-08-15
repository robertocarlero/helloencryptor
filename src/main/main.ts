/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import * as fs from 'fs';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import { StorageEvents } from '../constants/storage-events';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

const folderPath = 'src/storage';

const deleteFile = (filePath: string) => {
  fs.unlink(`${folderPath}/${filePath}.txt`, (err) => {
    if (err) console.error('Error al eliminar el archivo', err);
  });
};

const deleteFolderRecursive = (currentFolderPath: string) => {
  if (fs.existsSync(currentFolderPath)) {
    fs.readdirSync(currentFolderPath).forEach((file) => {
      const currentFilePath = path.join(currentFolderPath, file);
      if (fs.lstatSync(currentFilePath).isDirectory()) {
        deleteFolderRecursive(currentFilePath);
      } else {
        deleteFile(currentFilePath);
      }
    });
  }
};

ipcMain.on(StorageEvents.set, async (event, filePath, content) => {
  const fullPath = `${folderPath}/${filePath}.txt`;
  const pathParts = fullPath.split('/');
  const foldersPath = pathParts.slice(0, pathParts.length - 1).join('/');

  fs.mkdirSync(foldersPath, { recursive: true });

  fs.writeFile(fullPath, content, (err) => {
    if (err) console.error('Error al guardar el archivo', err);
  });
});

ipcMain.handle(StorageEvents.get, async (event, filePath) => {
  return new Promise((resolve) => {
    fs.readFile(`${folderPath}/${filePath}.txt`, null, (err, data) => {
      if (err) console.log('Error al obtener archivo', err);

      const fileData = data?.toString() || null;

      return resolve(fileData);
    });
  });
});

ipcMain.on(StorageEvents.delete, async (event, filePath) => {
  deleteFile(filePath);
});

ipcMain.on(StorageEvents.clear, () => {
  deleteFolderRecursive(folderPath);
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
