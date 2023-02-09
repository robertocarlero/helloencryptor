import { SHA256, AES, enc } from 'crypto-js';

export function createHash(text) {
  const hash = SHA256(text);
  const textHash = hash.toString(enc.Hex);

  return textHash;
}

export function encryptText(text, secretKey) {
  const hash = createHash(secretKey);
  const textEncrypted = AES.encrypt(text, hash).toString();

  return textEncrypted;
}

export function encryptData(data, secretKey) {
  const rawData = JSON.stringify(data);

  return encryptText(rawData, secretKey);
}

export function decryptText(text, secretKey) {
  const hash = createHash(secretKey);
  const cipherText = AES.decrypt(text, hash);
  const textDecrypted = cipherText.toString(enc.Utf8);

  return textDecrypted;
}

export function decryptData(text, secretKey) {
  const rawData = decryptText(text, secretKey);
  const data = JSON.parse(rawData);

  return data;
}
