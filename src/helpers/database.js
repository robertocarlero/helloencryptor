import { GenerateId } from './generate-id';

export default function database() {
  const setItem = async (path, data) => {
    const body = JSON.stringify(data);

    return window?.electron?.storage?.setItem(path, body);
  };

  const getItem = async (path) => {
    const data = await window?.electron?.storage?.getItem(path);
    const body = data ? JSON.parse(data) : null;

    return body;
  };

  const set = async (collection, data) => {
    const docId = data?.id || GenerateId();

    const path = `${collection}/${docId}`;
    await setItem(path, { ...data, id: docId });

    const items = (await getItem(collection)) || [];
    if (!items.includes(docId)) items.push(docId);

    setItem(collection, items);
  };

  const getAll = async (collection) => {
    const items = (await getItem(collection)) || [];

    const promises = items.map(async (item) => {
      const data = await getItem(`${collection}/${item}`);
      return data;
    });

    const body = await Promise.all(promises);

    return body || [];
  };

  const erase = async (path) => {
    const pathParts = `${path}`.split('/');
    const collection = pathParts[0];
    const docId = pathParts[1];

    const items = (await getItem(collection)) || [];

    if (items.includes(docId)) {
      const itemIndex = items.indexOf(docId);
      items.splice(itemIndex, 1);
    }

    await setItem(collection, items);

    return window.electron?.storage?.removeItem(path);
  };

  const clear = async () => {
    return window.electron?.storage?.clear();
  };

  const clearCollection = async (collection) => {
    const items = (await getItem(collection)) || [];
    items.forEach(async (item) => {
      const data = await erase(`${collection}/${item}`);
      return data;
    });
  };

  const get = async (path) => {
    const response = await getItem(path);
    return response;
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
