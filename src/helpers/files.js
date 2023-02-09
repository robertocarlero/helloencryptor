import { encryptData } from './encrypt';

export function downloadFile(file, fileName) {
  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(file, fileName);
    return;
  }

  const link = document.createElement('a');

  if (!navigator.msSaveBlob && link.download !== undefined) {
    // Browsers that support HTML5 download attribute
    const url = URL.createObjectURL(file);
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export function exportDataToEncryptedFile(data, secretKey) {
  const encrypted = encryptData(data, secretKey);

  const blob = new Blob([encrypted], { type: 'text/plain' });
  const { user } = data || {};
  const fileName = `${user?.name}-${user?.id}-${new Date().getTime()}.txt`;
  downloadFile(blob, fileName);
}
