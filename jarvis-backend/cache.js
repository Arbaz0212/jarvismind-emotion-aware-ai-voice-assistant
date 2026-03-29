const cache = new Map();

const TTL = 1000 * 60 * 10; // 10 minutes

export function getCache(key) {
  const data = cache.get(key);
  if (!data) return null;

  if (Date.now() > data.expiry) {
    cache.delete(key);
    return null;
  }
  return data.value;
}

export function setCache(key, value) {
  cache.set(key, {
    value,
    expiry: Date.now() + TTL
  });
}
const cache = new Map();

export function getCached(query) {
  return cache.get(query);
}

export function setCache(query, response) {
  cache.set(query, response);
}
