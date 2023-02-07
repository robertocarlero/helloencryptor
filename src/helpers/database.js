import { GenerateId } from './generate-id';

export default function database() {
  const setItem = (path, data) => {
    const body = JSON.stringify(data);

    return localStorage.setItem(path, body);
  };

  const getItem = (path) => {
    const data = localStorage.getItem(path);
    const body = JSON.parse(data);

    return body;
  };

  const set = (collection, data) => {
    const docId = data?.id || GenerateId();

    const path = `${collection}/${docId}`;
    setItem(path, { ...data, id: docId });

    const items = getItem(collection) || [];
    if (!items.includes(docId)) items.push(docId);

    setItem(collection, items);
  };

  const getAll = (collection) => {
    const items = getItem(collection) || [];

    const body = items.map((item) => getItem(`${collection}/${item}`));
    return body;
  };

  const erase = (path) => {
    const pathParts = `${path}`.split('/');
    const collection = pathParts[0];
    const docId = pathParts[1];

    const items = getItem(collection) || [];

    if (items.includes(docId)) {
      const itemIndex = items.indexOf(docId);
      items.splice(itemIndex, 1);
    }

    setItem(collection, items);

    return localStorage.removeItem(path);
  };

  const clear = () => {
    return localStorage.clear();
  };

  const clearCollection = (collection) => {
    const items = JSON.parse(localStorage.getItem(collection)) || [];
    items.forEach((item) => erase(`${collection}/${item}`));
  };

  const get = (path) => {
    return getItem(path);
  };

  return {
    set,
    erase,
    get,
    clear,
    clearCollection,
    getAll,
  };
}

export const DB = database();
