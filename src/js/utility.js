
var dbPromise = idb.open('posts-store', 1, function (db) {
  if (!db.objectStoreNames.contains('posts')) {
    db.createObjectStore('posts', { keyPath: 'id' });
  }
});

function writeData(st, data) {
  return dbPromise
    .then(function (db) {
      var tx = db.transaction(st, 'readwrite');
      var store = tx.objectStore(st);
      store.put(data);
      return tx.complete;
    })
    .catch(function (error) {
      console.error('Error writing data:', error);
    });
}

function readAllData(st) {
  return dbPromise
    .then(function (db) {
      var tx = db.transaction(st, 'readonly');
      var store = tx.objectStore(st);
      return store.getAll();
    })
    .catch(function (error) {
      console.error('Error reading data:', error);
    });
}

function clearAllData(st) {
  return dbPromise
    .then(function (db) {
      var tx = db.transaction(st, 'readwrite');
      var store = tx.objectStore(st);
      store.clear();
      return tx.complete;
    })
    .catch(function (error) {
      console.error('Error clearing data:', error);
    });
}


// function writeData(st, data) {
//   return dbPromise
//     .then(function (db) {
//       var tx = db.transaction(st, 'readwrite');
//       var store = tx.objectStore(st);
//       store.put(data);
//       return tx.complete;
//     });
// }

// function readAllData(st) {
//   return dbPromise
//     .then(function (db) {
//       var tx = db.transaction(st, 'readonly');
//       var store = tx.objectStore(st);
//       return store.getAll();
//     });
// }

// function clearAllData(st) {
//   return dbPromise
//     .then(function (db) {
//       var tx = db.transaction(st, 'readwrite');
//       var store = tx.objectStore(st);
//       store.clear();
//       return tx.complete;
//     });
// }

function deleteItemFromData(st, id) {
  dbPromise
    .then(function (db) {
      var tx = db.transaction(st, 'readwrite');
      var store = tx.objectStore(st);
      store.delete(id);
      return tx.complete;
    })
    .then(function () {
      console.log('Item deleted!');
    });
}