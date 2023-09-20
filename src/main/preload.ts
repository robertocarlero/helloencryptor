import { contextBridge, ipcRenderer } from 'electron';
import { StorageEvents } from '../constants/storage-events';

contextBridge.exposeInMainWorld('electron', {
  storage: {
    setItem(path: string, data: string) {
      ipcRenderer.send(StorageEvents.set, path, data);
    },
    getItem(path: string) {
      return ipcRenderer.invoke(StorageEvents.get, path);
    },
    removeItem(path: string) {
      ipcRenderer.send(StorageEvents.delete, path);
    },
    clear() {
      ipcRenderer.send(StorageEvents.clear);
    },
  },
});
