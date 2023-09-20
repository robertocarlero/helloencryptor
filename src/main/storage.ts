/* eslint no-console: off */
import path from 'path';
import * as fs from 'fs';

export class Storage {
  public folderPath = '.storage';

  public set(filePath: string, content: string) {
    const fullPath = `${this.folderPath}/${filePath}.txt`;
    const pathParts = fullPath.split('/');
    const foldersPath = pathParts.slice(0, pathParts.length - 1).join('/');

    fs.mkdirSync(foldersPath, { recursive: true });

    fs.writeFile(fullPath, content, (err) => {
      if (err) console.error('Error al guardar el archivo.', err);
    });
  }

  public get(filePath: string) {
    return new Promise((resolve) => {
      fs.readFile(`${this.folderPath}/${filePath}.txt`, null, (err, data) => {
        if (err) console.log('Error al obtener archivo', err);

        const fileData = data?.toString() || null;

        return resolve(fileData);
      });
    });
  }

  public delete(filePath: string) {
    fs.unlink(`${this.folderPath}/${filePath}.txt`, (err) => {
      if (err) console.error('Error al eliminar el archivo', err);
    });
  }

  public clear(currentFolderPath: string = this.folderPath) {
    if (fs.existsSync(currentFolderPath)) {
      fs.readdirSync(currentFolderPath).forEach((file) => {
        const currentFilePath = path.join(currentFolderPath, file);
        if (fs.lstatSync(currentFilePath).isDirectory()) {
          this.clear(currentFilePath);
        } else {
          this.delete(currentFilePath);
        }
      });
    }
  }
}
