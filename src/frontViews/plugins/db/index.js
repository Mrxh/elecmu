import Dexie from 'dexie';

export const db = new Dexie('myDatabase');
db.version(1).stores({
  collectionList: 'id, title, album, duration'
});

db.version(2).stores({
    searchHistory: '++id, keyword'
});