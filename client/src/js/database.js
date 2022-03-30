import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  export const putDb = async (content) => {
    const database = await openDB('jate', 1);
    const transaction = database.transaction('jate', 'readwrite');
    const storage = transaction.objectStore('jate');
    const dbRequest = storage.put({ id: 1, value: content });
    const dbResponse = await dbRequest;
  };
  
  export const getDb = async () => {
    const database = await openDB('jate', 1);
    const transaction = database.transaction('jate', 'readonly');
    const storage = transaction.objectStore('jate');
    const dbRequest = storage.get(1);
    const dbResponse = await dbRequest;
    return dbResponse?.value;
  };
  
  initdb();