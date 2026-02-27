function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function sanitizeFileName(name) {
  return name.replace(/[^a-z0-9\-_\.]/gi, '_').toLowerCase();
}

module.exports = { generateUniqueId, sleep, sanitizeFileName };