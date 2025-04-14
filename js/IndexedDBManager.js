export class IndexedDBManager {
    static openDatabase(dbName, storeName, version = 1) {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(dbName, version);

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(storeName)) {
                    db.createObjectStore(storeName);
                }
            };
        });
    }

    static async load(dbName, storeName, onSuccessCallback = null) {
        try {
            const db = await IndexedDBManager.openDatabase(dbName, storeName);
            const transaction = db.transaction(storeName, 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.get(storeName);

            return new Promise((resolve, reject) => {
                request.onsuccess = () => {
                    if (onSuccessCallback && typeof onSuccessCallback === 'function') {
                        onSuccessCallback(request.result); // Call the provided callback with the result
                    }
                    resolve(request.result); // Resolving the promise with the result
                };

                request.onerror = () => {
                    resolve(null); // Resolve with null in case of error
                };
            });
        } catch (err) {
            console.error("Error loading data from IndexedDB", err);
            return null;
        }
    }

    static async save(dbName, storeName, data, onSuccessCallback = null) {
        try {
            const db = await IndexedDBManager.openDatabase(dbName);
            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.put(data, storeName);

            request.onsuccess = () => {
                console.log("Data saved to IndexedDB");
                if (onSuccessCallback && typeof onSuccessCallback === 'function') {
                    onSuccessCallback(); // Call the provided callback after successful save
                }
            };

            request.onerror = (err) => {
                console.error("Error saving data to IndexedDB", err);
            };
        } catch (err) {
            console.error("Error saving data to IndexedDB", err);
        }
    }

    // Clear function to delete all data in the specified object store
    static async clear(dbName, storeName, onSuccessCallback = null) {
        try {
            const db = await IndexedDBManager.openDatabase(dbName);
            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.clear(); // Clears all entries in the object store

            return new Promise((resolve, reject) => {
                request.onsuccess = () => {
                    console.log("All data cleared from IndexedDB");
                    if (onSuccessCallback && typeof onSuccessCallback === 'function') {
                        onSuccessCallback(); // Call the provided callback after clearing data
                    }
                    resolve();
                };

                request.onerror = (err) => {
                    console.error("Error clearing data in IndexedDB", err);
                    reject(err);
                };
            });
        } catch (err) {
            console.error("Error clearing data in IndexedDB", err);
        }
    }
}
