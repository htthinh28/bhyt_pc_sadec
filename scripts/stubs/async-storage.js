const store = new Map();

const toValue = (value) => (value === undefined || value === null ? '' : String(value));

const AsyncStorage = {
  async getItem(key) {
    return store.has(key) ? store.get(key) : null;
  },
  async setItem(key, value) {
    store.set(key, toValue(value));
    return null;
  },
  async removeItem(key) {
    store.delete(key);
    return null;
  },
  async multiGet(keys = []) {
    return keys.map((key) => [key, store.has(key) ? store.get(key) : null]);
  },
  async multiSet(entries = []) {
    entries.forEach(([key, value]) => {
      store.set(key, toValue(value));
    });
    return null;
  },
  async multiRemove(keys = []) {
    keys.forEach((key) => store.delete(key));
    return null;
  },
  async getAllKeys() {
    return Array.from(store.keys());
  },
  async clear() {
    store.clear();
    return null;
  },
  async mergeItem(key, value) {
    const current = store.has(key) ? store.get(key) : null;
    try {
      const merged = {
        ...(current ? JSON.parse(current) : {}),
        ...(value ? JSON.parse(String(value)) : {}),
      };
      store.set(key, JSON.stringify(merged));
    } catch {
      store.set(key, toValue(value));
    }
    return null;
  },
};

export const useAsyncStorage = (key) => ({
  getItem: () => AsyncStorage.getItem(key),
  setItem: (value) => AsyncStorage.setItem(key, value),
  removeItem: () => AsyncStorage.removeItem(key),
  mergeItem: (value) => AsyncStorage.mergeItem(key, value),
});

export default AsyncStorage;
